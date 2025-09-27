import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query with enhanced profile data
    let query = supabaseAdmin
      .from('donation_senders')
      .select(`
        id,
        email,
        provider,
        provider_id,
        created_at,
        last_login,
        session_expires_at,
        is_active,
        full_name,
        phone_number,
        first_name,
        last_name,
        profile_picture_url,
        date_of_birth,
        address,
        city,
        state,
        country,
        pincode,
        last_activity_at,
        total_donations_count,
        total_donated_amount
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (provider && provider !== 'all') {
      query = query.eq('provider', provider);
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        query = query.eq('is_active', true);
      } else if (status === 'inactive') {
        query = query.eq('is_active', false);
      }
    }

    const { data: senders, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch senders' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabaseAdmin
      .from('donation_senders')
      .select('*', { count: 'exact', head: true });

    if (provider && provider !== 'all') {
      countQuery = countQuery.eq('provider', provider);
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        countQuery = countQuery.eq('is_active', true);
      } else if (status === 'inactive') {
        countQuery = countQuery.eq('is_active', false);
      }
    }

    const { count } = await countQuery;

    return NextResponse.json({
      success: true,
      data: {
        senders: senders || [],
        total: count || 0,
        limit,
        offset
      }
    });

  } catch (error) {
    console.error('Admin senders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
