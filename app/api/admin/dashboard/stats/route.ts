import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get dashboard statistics from multiple sources
    const [
      donationStats,
      senderStats,
      receiverStats,
      adminStats
    ] = await Promise.all([
      // Donation statistics
      supabaseAdmin
        .from('money_donations')
        .select('amount, payment_status, created_at')
        .eq('payment_status', true),
      
      // Sender statistics
      supabaseAdmin
        .from('donation_senders')
        .select('id, created_at, last_login, session_expires_at, is_active'),
      
      // Receiver statistics
      supabaseAdmin
        .from('donation_receivers')
        .select('id, status, created_at, submitted_at'),
      
      // Admin statistics
      supabaseAdmin
        .from('admin_audit_logs')
        .select('id, created_at')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    ]);

    // Calculate statistics
    const totalSuccessfulDonations = donationStats.data?.length || 0;
    const totalAmountRaised = donationStats.data?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
    
    const donationsLast30Days = donationStats.data?.filter(d => 
      new Date(d.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length || 0;
    
    const donationsLast7Days = donationStats.data?.filter(d => 
      new Date(d.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length || 0;

    const totalSenders = senderStats.data?.length || 0;
    const activeSenderSessions = senderStats.data?.filter(s => 
      s.session_expires_at && new Date(s.session_expires_at) > new Date()
    ).length || 0;

    const totalReceivers = receiverStats.data?.length || 0;
    const pendingReceiverApplications = receiverStats.data?.filter(r => 
      r.status === 'pending'
    ).length || 0;

    const adminActionsToday = adminStats.data?.length || 0;

    const stats = {
      total_successful_donations: totalSuccessfulDonations,
      total_amount_raised: totalAmountRaised,
      donations_last_30_days: donationsLast30Days,
      donations_last_7_days: donationsLast7Days,
      active_admin_users: 1, // Current admin
      admin_actions_today: adminActionsToday,
      total_senders: totalSenders,
      active_sender_sessions: activeSenderSessions,
      total_receivers: totalReceivers,
      pending_receiver_applications: pendingReceiverApplications
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Admin dashboard stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
