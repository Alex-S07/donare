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
    const status = searchParams.get('status');
    const receiver_type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabaseAdmin
      .from('donation_receivers')
      .select(`
        id,
        receiver_type,
        status,
        phone_number,
        email,
        submitted_at,
        approved_at,
        approved_by_admin_id,
        rejection_reason,
        form_data,
        documents
      `)
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (receiver_type && receiver_type !== 'all') {
      query = query.eq('receiver_type', receiver_type);
    }

    const { data: receivers, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch receivers' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabaseAdmin
      .from('donation_receivers')
      .select('*', { count: 'exact', head: true });

    if (status && status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }

    if (receiver_type && receiver_type !== 'all') {
      countQuery = countQuery.eq('receiver_type', receiver_type);
    }

    const { count } = await countQuery;

    return NextResponse.json({
      success: true,
      data: {
        receivers: receivers || [],
        total: count || 0,
        limit,
        offset
      }
    });

  } catch (error) {
    console.error('Admin receivers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
