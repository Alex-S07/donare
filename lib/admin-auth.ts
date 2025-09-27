import { NextRequest } from 'next/server';
import { supabaseAdmin } from './supabase';
import { cookies } from 'next/headers';
import { AuthService } from './auth';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role?: string;
  is_active: boolean;
}

export async function verifyAdminAuth(request: NextRequest): Promise<AdminUser | null> {
  try {
    // First try JWT token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const admin = await AuthService.getAdminFromToken(token);
      if (admin) {
        return {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          is_active: admin.is_active
        };
      }
    }

    // Try cookie-based authentication
    const cookieStore = cookies();
    const adminToken = cookieStore.get('admin_token')?.value;
    
    if (adminToken) {
      const admin = await AuthService.getAdminFromToken(adminToken);
      if (admin) {
        return {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          is_active: admin.is_active
        };
      }
    }

    // Try session-based authentication (legacy)
    const sessionCookie = cookieStore.get('admin_session');
    if (sessionCookie) {
      const { data: session, error: sessionError } = await supabaseAdmin
        .from('admin_sessions')
        .select(`
          admin_id,
          expires_at,
          admin_users (
            id,
            username,
            email,
            is_active
          )
        `)
        .eq('session_token', sessionCookie.value)
        .eq('is_active', true)
        .single();

      if (sessionError || !session) {
        return null;
      }

      // Check if session is expired
      if (new Date(session.expires_at) < new Date()) {
        // Clean up expired session
        await supabaseAdmin
          .from('admin_sessions')
          .update({ is_active: false })
          .eq('session_token', sessionCookie.value);
        
        return null;
      }

      // Check if admin user is active
      const adminUser = session.admin_users as any;
      if (!adminUser || !adminUser.is_active) {
        return null;
      }

      return {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        is_active: adminUser.is_active
      };
    }

    return null;

  } catch (error) {
    console.error('Admin auth verification error:', error);
    return null;
  }
}

export async function requireAdminAuth(request: NextRequest): Promise<AdminUser> {
  const adminUser = await verifyAdminAuth(request);
  
  if (!adminUser) {
    throw new Error('Unauthorized');
  }
  
  return adminUser;
}
