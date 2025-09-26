import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from './supabase';
import { AdminUser, AdminLoginRequest, AdminLoginResponse } from '@/types/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';
const JWT_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '7d';

// Rate limiting store (in production, use Redis)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export class AuthService {
  // Hash password with bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT tokens
  static generateTokens(adminId: number, username: string) {
    const payload = { adminId, username };
    
    const accessToken = jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'donare-admin',
      audience: 'donare-platform'
    });
    
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { 
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'donare-admin',
      audience: 'donare-platform'
    });
    
    return { accessToken, refreshToken };
  }

  // Verify JWT token
  static verifyToken(token: string, isRefreshToken = false): any {
    try {
      const secret = isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET;
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Check rate limiting
  static checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier);
    
    if (!attempts) {
      return true; // No previous attempts
    }
    
    // Reset if lockout period has passed
    if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
      loginAttempts.delete(identifier);
      return true;
    }
    
    return attempts.count < MAX_LOGIN_ATTEMPTS;
  }

  // Record login attempt
  static recordLoginAttempt(identifier: string, success: boolean) {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: now };
    
    if (success) {
      loginAttempts.delete(identifier);
    } else {
      attempts.count += 1;
      attempts.lastAttempt = now;
      loginAttempts.set(identifier, attempts);
    }
  }

  // Login admin user
  static async login(
    credentials: AdminLoginRequest, 
    ipAddress: string, 
    userAgent?: string
  ): Promise<AdminLoginResponse> {
    try {
      const { username, password } = credentials;
      
      // Check rate limiting
      if (!this.checkRateLimit(ipAddress)) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again in 15 minutes.'
        };
      }

      // Find admin user
      const { data: admin, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (error || !admin) {
        this.recordLoginAttempt(ipAddress, false);
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, admin.password_hash);
      
      if (!isValidPassword) {
        this.recordLoginAttempt(ipAddress, false);
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Update last login
      await supabaseAdmin
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', admin.id);

      // Log successful login
      await this.logAdminAction(
        admin.id,
        'LOGIN',
        'ADMIN',
        admin.id.toString(),
        ipAddress,
        userAgent
      );

      // Generate tokens
      const { accessToken, refreshToken } = this.generateTokens(admin.id, admin.username);
      
      this.recordLoginAttempt(ipAddress, true);

      return {
        success: true,
        token: accessToken,
        refresh_token: refreshToken,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An error occurred during login'
      };
    }
  }

  // Refresh token
  static async refreshToken(refreshToken: string): Promise<{ accessToken?: string; error?: string }> {
    try {
      const decoded = this.verifyToken(refreshToken, true);
      const { accessToken } = this.generateTokens(decoded.adminId, decoded.username);
      
      return { accessToken };
    } catch (error) {
      return { error: 'Invalid refresh token' };
    }
  }

  // Get admin from token
  static async getAdminFromToken(token: string): Promise<AdminUser | null> {
    try {
      const decoded = this.verifyToken(token);
      
      const { data: admin, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('id', decoded.adminId)
        .eq('is_active', true)
        .single();

      if (error || !admin) {
        return null;
      }

      return admin;
    } catch (error) {
      return null;
    }
  }

  // Log admin action
  static async logAdminAction(
    adminId: number,
    action: string,
    resourceType: string,
    resourceId?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    try {
      await supabaseAdmin
        .from('admin_audit_logs')
        .insert({
          admin_id: adminId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          ip_address: ipAddress || '0.0.0.0',
          user_agent: userAgent
        });
    } catch (error) {
      console.error('Failed to log admin action:', error);
    }
  }

  // Create admin user (for setup)
  static async createAdmin(
    username: string, 
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string; admin?: AdminUser }> {
    try {
      const passwordHash = await this.hashPassword(password);
      
      const { data: admin, error } = await supabaseAdmin
        .from('admin_users')
        .insert({
          username,
          email,
          password_hash: passwordHash
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        admin
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create admin user'
      };
    }
  }

  // Change password
  static async changePassword(
    adminId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current admin
      const { data: admin, error } = await supabaseAdmin
        .from('admin_users')
        .select('password_hash')
        .eq('id', adminId)
        .single();

      if (error || !admin) {
        return { success: false, error: 'Admin not found' };
      }

      // Verify current password
      const isValidPassword = await this.verifyPassword(currentPassword, admin.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Hash new password
      const newPasswordHash = await this.hashPassword(newPassword);

      // Update password
      const { error: updateError } = await supabaseAdmin
        .from('admin_users')
        .update({ password_hash: newPasswordHash })
        .eq('id', adminId);

      if (updateError) {
        return { success: false, error: 'Failed to update password' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred while changing password' };
    }
  }
}
