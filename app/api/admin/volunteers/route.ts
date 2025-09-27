import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { AuthService } from '@/lib/auth';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { Volunteer, VolunteerStatistics } from '@/types/database';

// Get all volunteers with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    let query = supabaseAdmin
      .from('volunteers')
      .select('*')
      .order('submitted_at', { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone_number.ilike.%${search}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: volunteers, error, count } = await query;

    if (error) {
      console.error('Error fetching volunteers:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch volunteers' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: volunteers,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Get volunteers error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get volunteer statistics
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'statistics') {
      // Get volunteer statistics
      const [
        { count: totalVolunteers },
        { count: activeVolunteers },
        { count: pendingApplications },
        { data: hoursData },
        { data: statusData },
        { data: commitmentData },
        { data: activitiesData }
      ] = await Promise.all([
        supabaseAdmin.from('volunteers').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('volunteers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabaseAdmin.from('volunteers').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabaseAdmin.from('volunteer_activities').select('hours_worked'),
        supabaseAdmin.from('volunteers').select('status'),
        supabaseAdmin.from('volunteers').select('commitment_duration'),
        supabaseAdmin.from('volunteer_activities').select('activity_type, hours_worked')
      ]);

      const totalHours = hoursData?.reduce((sum, activity) => sum + activity.hours_worked, 0) || 0;
      const averageRating = 4.5; // TODO: Calculate from actual data

      // Process status distribution
      const volunteersByStatus = {
        pending: 0,
        approved: 0,
        active: 0,
        inactive: 0,
        rejected: 0
      };

      statusData?.forEach(volunteer => {
        volunteersByStatus[volunteer.status as keyof typeof volunteersByStatus]++;
      });

      // Process commitment distribution
      const volunteersByCommitment = {
        '1_month': 0,
        '6_months': 0,
        '1_year': 0,
        flexible: 0
      };

      commitmentData?.forEach(volunteer => {
        volunteersByCommitment[volunteer.commitment_duration as keyof typeof volunteersByCommitment]++;
      });

      // Process top activities
      const activityMap = new Map<string, { count: number; totalHours: number }>();
      activitiesData?.forEach(activity => {
        const existing = activityMap.get(activity.activity_type) || { count: 0, totalHours: 0 };
        activityMap.set(activity.activity_type, {
          count: existing.count + 1,
          totalHours: existing.totalHours + activity.hours_worked
        });
      });

      const topActivities = Array.from(activityMap.entries())
        .map(([activity_type, data]) => ({
          activity_type,
          count: data.count,
          total_hours: data.totalHours
        }))
        .sort((a, b) => b.total_hours - a.total_hours)
        .slice(0, 5);

      const statistics: VolunteerStatistics = {
        total_volunteers: totalVolunteers || 0,
        active_volunteers: activeVolunteers || 0,
        pending_applications: pendingApplications || 0,
        total_hours_volunteered: totalHours,
        average_rating: averageRating,
        volunteers_by_status: volunteersByStatus,
        volunteers_by_commitment: volunteersByCommitment,
        top_activities: topActivities
      };

      return NextResponse.json({
        success: true,
        data: statistics
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Get volunteer statistics error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
