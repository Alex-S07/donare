import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser/frontend use
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// Admin client with service role for backend operations
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error?.code === 'PGRST116') {
    return { error: 'Record not found', status: 404 };
  }
  
  if (error?.code === '23505') {
    return { error: 'Record already exists', status: 409 };
  }
  
  if (error?.code === '23503') {
    return { error: 'Referenced record not found', status: 400 };
  }
  
  return { error: error?.message || 'Database error occurred', status: 500 };
};

// Type-safe query builder helpers
export const createTypedSupabaseClient = () => {
  return supabase;
};

export const createTypedSupabaseAdminClient = () => {
  return supabaseAdmin;
};
