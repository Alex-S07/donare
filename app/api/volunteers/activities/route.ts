import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { AuthService } from '@/lib/auth';
import { 
  VolunteerActivityRequest, 
  VolunteerActivityResponse 
} from '@/types/database';

// Submit volunteer activity
export async function POST(request: NextRequest) {
  try {
    // Verify volunteer authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = AuthService.verifyToken(token);
    
    if (decoded.userType !== 'volunteer') {
      return NextResponse.json(
        { success: false, error: 'Invalid token type' },
        { status: 401 }
      );
    }

    const body: VolunteerActivityRequest = await request.json();
    const { 
      volunteer_id, 
      activity_type, 
      activity_description, 
      activity_date, 
      hours_worked,
      location,
      donation_category,
      beneficiaries_served,
      impact_description 
    } = body;

    // Validate required fields
    if (!volunteer_id || !activity_type || !activity_description || !activity_date || !hours_worked) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify volunteer exists and is active
    const { data: volunteer, error: volunteerError } = await supabaseAdmin
      .from('volunteers')
      .select('id, status')
      .eq('id', volunteer_id)
      .eq('status', 'active')
      .single();

    if (volunteerError || !volunteer) {
      return NextResponse.json(
        { success: false, error: 'Volunteer not found or not active' },
        { status: 404 }
      );
    }

    // Insert volunteer activity
    const { data: activity, error } = await supabaseAdmin
      .from('volunteer_activities')
      .insert({
        volunteer_id,
        activity_type,
        activity_description,
        activity_date,
        hours_worked,
        location: location || null,
        donation_category: donation_category || null,
        beneficiaries_served: beneficiaries_served || 0,
        impact_description: impact_description || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating volunteer activity:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit volunteer activity' },
        { status: 500 }
      );
    }

    // Update volunteer's total hours and last activity
    const { error: updateError } = await supabaseAdmin
      .from('volunteers')
      .update({
        total_hours_volunteered: volunteer.total_hours_volunteered + hours_worked,
        last_activity_at: new Date().toISOString()
      })
      .eq('id', volunteer_id);

    if (updateError) {
      console.error('Error updating volunteer hours:', updateError);
      // Don't fail the request, just log the error
    }

    const response: VolunteerActivityResponse = {
      success: true,
      activity_id: activity.id,
      message: 'Volunteer activity submitted successfully'
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Volunteer activity submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get volunteer activities
export async function GET(request: NextRequest) {
  try {
    // Verify volunteer authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = AuthService.verifyToken(token);
    
    if (decoded.userType !== 'volunteer') {
      return NextResponse.json(
        { success: false, error: 'Invalid token type' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const volunteerId = searchParams.get('volunteer_id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!volunteerId) {
      return NextResponse.json(
        { success: false, error: 'Volunteer ID is required' },
        { status: 400 }
      );
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: activities, error, count } = await supabaseAdmin
      .from('volunteer_activities')
      .select('*')
      .eq('volunteer_id', volunteerId)
      .order('activity_date', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching volunteer activities:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch volunteer activities' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: activities,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Get volunteer activities error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
