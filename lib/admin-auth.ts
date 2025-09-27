import { NextRequest } from 'next/server';
import { supabaseAdmin } from './supabase';
import { cookies } from 'next/headers';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export async function verifyAdminAuth(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Get session from cookies
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (!sessionCookie) {
      return null;
    }

    // Verify session in database
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('admin_sessions')
      .select(`
        admin_id,
        expires_at,
        admin_users (
          id,
          username,
          email,
          role,
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
      role: adminUser.role,
      is_active: adminUser.is_active
    };

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
