import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from './supabase';
import {
  AdminUser,
  AdminLoginRequest,
  AdminLoginResponse,
  DonationSender,
  DonationReceiver,
  SenderAuthRequest,
  SenderAuthResponse,
  ReceiverLoginRequest,
  ReceiverLoginResponse
} from '@/types/database';

// Type assertions to handle Supabase type issues
const adminUsersTable = supabaseAdmin.from('admin_users') as any;
const donationSendersTable = supabaseAdmin.from('donation_senders') as any;
const donationReceiversTable = supabaseAdmin.from('donation_receivers') as any;
const senderOtpsTable = supabaseAdmin.from('sender_otps') as any;
const adminAuditLogsTable = supabaseAdmin.from('admin_audit_logs') as any;

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';
const JWT_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '7d';

// Sender session timeout (15 minutes)
const SENDER_SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
// Receiver session timeout (24 hours)
const RECEIVER_SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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
      const { data: admin, error } = await adminUsersTable
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
      await adminUsersTable
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
      
      const { data: admin, error } = await adminUsersTable
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
      await adminAuditLogsTable
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
      
      const { data: admin, error } = await adminUsersTable
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
      const { data: admin, error } = await adminUsersTable
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
      const { error: updateError } = await adminUsersTable
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

  // ===== DONATION SENDER AUTHENTICATION =====

  // Generate sender JWT tokens
  static generateSenderTokens(senderId: string, email: string) {
    const payload = { senderId, email, userType: 'sender' };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '15m', // 15 minutes for senders
      issuer: 'donare-sender',
      audience: 'donare-platform'
    });

    return { accessToken };
  }

  // Authenticate sender with Google OAuth
  static async authenticateSenderWithGoogle(
    email: string,
    providerId: string,
    ipAddress: string,
    profileData?: any
  ): Promise<SenderAuthResponse> {
    try {
      // Check if sender already exists
      let { data: sender, error } = await donationSendersTable
        .select('*')
        .eq('email', email)
        .eq('provider', 'google')
        .single();

      if (error && error.code !== 'PGRST116') {
        return { success: false, error: 'Database error occurred' };
      }

      // Create new sender if doesn't exist
      if (!sender) {
        const senderData: any = {
          email,
          provider: 'google',
          provider_id: providerId,
          email_verified: true,
          is_active: true
        };

        // Add profile data if available
        if (profileData) {
          senderData.full_name = profileData.name;
          senderData.first_name = profileData.given_name;
          senderData.last_name = profileData.family_name;
          senderData.profile_picture_url = profileData.picture;
          senderData.email_verified = profileData.verified_email || true;
        }

        const { data: newSender, error: insertError } = await donationSendersTable
          .insert(senderData)
          .select()
          .single();

        if (insertError) {
          return { success: false, error: 'Failed to create sender account' };
        }

        sender = newSender;
      }

      if (!sender.is_active) {
        return { success: false, error: 'Account is deactivated' };
      }

      // Update last login and session expiry
      const sessionExpiresAt = new Date(Date.now() + SENDER_SESSION_TIMEOUT).toISOString();

      await donationSendersTable
        .update({
          last_login: new Date().toISOString(),
          session_expires_at: sessionExpiresAt
        })
        .eq('id', sender.id);

      // Generate tokens
      const { accessToken } = this.generateSenderTokens(sender.id, sender.email);

      return {
        success: true,
        token: accessToken,
        sender: {
          id: sender.id,
          email: sender.email,
          provider: sender.provider
        }
      };

    } catch (error) {
      console.error('Google auth error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  // Send OTP for email authentication
  static async sendSenderOTP(email: string, ipAddress?: string, userAgent?: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Store OTP in database
      const { error: insertError } = await senderOtpsTable
        .insert({
          email,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          ip_address: ipAddress || null,
          user_agent: userAgent || null
        });

      if (insertError) {
        console.error('Failed to store OTP:', insertError);
        return { success: false, error: 'Failed to generate OTP' };
      }

      // Send OTP via email
      const { EmailService } = await import('./email');
      const emailResult = await EmailService.sendOTPEmail(email, otp);

      if (!emailResult.success) {
        return { success: false, error: emailResult.error || 'Failed to send OTP email' };
      }

      return { success: true };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { success: false, error: 'Failed to send OTP' };
    }
  }

  // Verify OTP and authenticate sender
  static async authenticateSenderWithOTP(
    email: string,
    otp: string,
    ipAddress: string
  ): Promise<SenderAuthResponse> {
    try {
      // Validate OTP format
      if (!/^\d{6}$/.test(otp)) {
        return { success: false, error: 'Invalid OTP format' };
      }

      // Verify OTP from database
      const { data: otpRecord, error: otpError } = await senderOtpsTable
        .select('*')
        .eq('email', email)
        .eq('otp_code', otp)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (otpError || !otpRecord) {
        return { success: false, error: 'Invalid or expired OTP' };
      }

      // Mark OTP as used
      await senderOtpsTable
        .update({ used: true })
        .eq('id', otpRecord.id);

      // Check if sender already exists
      let { data: sender, error } = await donationSendersTable
        .select('*')
        .eq('email', email)
        .eq('provider', 'email')
        .single();

      if (error && error.code !== 'PGRST116') {
        return { success: false, error: 'Database error occurred' };
      }

      // Create new sender if doesn't exist
      if (!sender) {
        const { data: newSender, error: insertError } = await donationSendersTable
          .insert({
            email,
            provider: 'email',
            email_verified: true,
            is_active: true
          })
          .select()
          .single();

        if (insertError) {
          return { success: false, error: 'Failed to create sender account' };
        }

        sender = newSender;
      }

      if (!sender.is_active) {
        return { success: false, error: 'Account is deactivated' };
      }

      // Update last login and session expiry
      const sessionExpiresAt = new Date(Date.now() + SENDER_SESSION_TIMEOUT).toISOString();

      await donationSendersTable
        .update({
          last_login: new Date().toISOString(),
          session_expires_at: sessionExpiresAt,
          email_verified: true
        })
        .eq('id', sender.id);

      // Generate tokens
      const { accessToken } = this.generateSenderTokens(sender.id, sender.email);

      return {
        success: true,
        token: accessToken,
        sender: {
          id: sender.id,
          email: sender.email,
          provider: sender.provider
        }
      };

    } catch (error) {
      console.error('OTP auth error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  // Get sender from token
  static async getSenderFromToken(token: string): Promise<DonationSender | null> {
    try {
      const decoded = this.verifyToken(token);

      if (decoded.userType !== 'sender') {
        return null;
      }

      const { data: sender, error } = await donationSendersTable
        .select('*')
        .eq('id', decoded.senderId)
        .eq('is_active', true)
        .single();

      if (error || !sender) {
        return null;
      }

      // Check if session is still valid
      if (sender.session_expires_at && new Date(sender.session_expires_at) < new Date()) {
        // Session expired, clear it
        await donationSendersTable
          .update({ session_expires_at: null })
          .eq('id', sender.id);

        return null;
      }

      return sender;
    } catch (error) {
      return null;
    }
  }

  // Logout sender
  static async logoutSender(senderId: string): Promise<{ success: boolean }> {
    try {
      await donationSendersTable
        .update({ session_expires_at: null })
        .eq('id', senderId);

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  // ===== DONATION RECEIVER AUTHENTICATION =====

  // Generate receiver JWT tokens
  static generateReceiverTokens(receiverId: string, phoneNumber: string) {
    const payload = { receiverId, phoneNumber, userType: 'receiver' };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '24h', // 24 hours for receivers
      issuer: 'donare-receiver',
      audience: 'donare-platform'
    });

    return { accessToken };
  }

  // Authenticate receiver with phone and password
  static async authenticateReceiver(
    credentials: ReceiverLoginRequest,
    ipAddress: string
  ): Promise<ReceiverLoginResponse> {
    try {
      const { phone_number, password } = credentials;

      // Check rate limiting
      if (!this.checkRateLimit(ipAddress)) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again in 15 minutes.'
        };
      }

      // Find approved receiver
      const { data: receiver, error } = await donationReceiversTable
        .select('*')
        .eq('phone_number', phone_number)
        .eq('status', 'approved')
        .single();

      if (error || !receiver) {
        this.recordLoginAttempt(ipAddress, false);
        return {
          success: false,
          error: 'Invalid phone number or password'
        };
      }

      if (!receiver.password_hash) {
        this.recordLoginAttempt(ipAddress, false);
        return {
          success: false,
          error: 'Account not yet activated. Please contact admin.'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, receiver.password_hash);

      if (!isValidPassword) {
        this.recordLoginAttempt(ipAddress, false);
        return {
          success: false,
          error: 'Invalid phone number or password'
        };
      }

      // Update last login and session expiry
      const sessionExpiresAt = new Date(Date.now() + RECEIVER_SESSION_TIMEOUT).toISOString();

      await donationReceiversTable
        .update({
          last_login: new Date().toISOString(),
          session_expires_at: sessionExpiresAt
        })
        .eq('id', receiver.id);

      // Generate tokens
      const { accessToken } = this.generateReceiverTokens(receiver.id, receiver.phone_number);

      this.recordLoginAttempt(ipAddress, true);

      return {
        success: true,
        token: accessToken,
        receiver: {
          id: receiver.id,
          phone_number: receiver.phone_number,
          receiver_type: receiver.receiver_type,
          status: receiver.status
        }
      };

    } catch (error) {
      console.error('Receiver login error:', error);
      return {
        success: false,
        error: 'An error occurred during login'
      };
    }
  }

  // Get receiver from token
  static async getReceiverFromToken(token: string): Promise<DonationReceiver | null> {
    try {
      const decoded = this.verifyToken(token);

      if (decoded.userType !== 'receiver') {
        return null;
      }

      const { data: receiver, error } = await donationReceiversTable
        .select('*')
        .eq('id', decoded.receiverId)
        .eq('status', 'approved')
        .single();

      if (error || !receiver) {
        return null;
      }

      // Check if session is still valid
      if (receiver.session_expires_at && new Date(receiver.session_expires_at) < new Date()) {
        // Session expired, clear it
        await donationReceiversTable
          .update({ session_expires_at: null })
          .eq('id', receiver.id);

        return null;
      }

      return receiver;
    } catch (error) {
      return null;
    }
  }

  // Logout receiver
  static async logoutReceiver(receiverId: string): Promise<{ success: boolean }> {
    try {
      await donationReceiversTable
        .update({ session_expires_at: null })
        .eq('id', receiverId);

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  // ===== ADMIN RECEIVER MANAGEMENT =====

  // Approve receiver application
  static async approveReceiver(
    receiverId: string,
    adminId: number,
    generatedPassword?: string
  ): Promise<{ success: boolean; error?: string; credentials?: { phone_number: string; password: string } }> {
    try {
      // Get receiver details
      const { data: receiver, error } = await donationReceiversTable
        .select('*')
        .eq('id', receiverId)
        .eq('status', 'pending')
        .single();

      if (error || !receiver) {
        return { success: false, error: 'Receiver application not found' };
      }

      // Generate password if not provided
      const password = generatedPassword || this.generateRandomPassword();
      const passwordHash = await this.hashPassword(password);

      // Update receiver status
      const { error: updateError } = await donationReceiversTable
        .update({
          status: 'approved',
          password_hash: passwordHash,
          approved_at: new Date().toISOString(),
          approved_by_admin_id: adminId
        })
        .eq('id', receiverId);

      if (updateError) {
        return { success: false, error: 'Failed to approve receiver' };
      }

      // Log admin action
      await this.logAdminAction(
        adminId,
        'APPROVE_RECEIVER',
        'RECEIVER',
        receiverId
      );

      return {
        success: true,
        credentials: {
          phone_number: receiver.phone_number,
          password: password
        }
      };

    } catch (error) {
      console.error('Approve receiver error:', error);
      return { success: false, error: 'Failed to approve receiver' };
    }
  }

  // Reject receiver application
  static async rejectReceiver(
    receiverId: string,
    adminId: number,
    rejectionReason: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await donationReceiversTable
        .update({
          status: 'rejected',
          rejection_reason: rejectionReason
        })
        .eq('id', receiverId)
        .eq('status', 'pending');

      if (error) {
        return { success: false, error: 'Failed to reject receiver' };
      }

      // Log admin action
      await this.logAdminAction(
        adminId,
        'REJECT_RECEIVER',
        'RECEIVER',
        receiverId
      );

      return { success: true };

    } catch (error) {
      console.error('Reject receiver error:', error);
      return { success: false, error: 'Failed to reject receiver' };
    }
  }

  // Generate random password for receivers
  static generateRandomPassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
