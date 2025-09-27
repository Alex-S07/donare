import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { AuthService } from '@/lib/auth';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { 
  VolunteerApprovalRequest, 
  VolunteerApprovalResponse,
  VolunteerStatusUpdateRequest,
  VolunteerStatusUpdateResponse 
} from '@/types/database';

// Get specific volunteer details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const volunteerId = params.id;

    // Get volunteer details
    const { data: volunteer, error } = await supabaseAdmin
      .from('volunteers')
      .select('*')
      .eq('id', volunteerId)
      .single();

    if (error) {
      console.error('Error fetching volunteer:', error);
      return NextResponse.json(
        { success: false, error: 'Volunteer not found' },
        { status: 404 }
      );
    }

    // Get volunteer activities
    const { data: activities } = await supabaseAdmin
      .from('volunteer_activities')
      .select('*')
      .eq('volunteer_id', volunteerId)
      .order('activity_date', { ascending: false });

    // Get volunteer achievements
    const { data: achievements } = await supabaseAdmin
      .from('volunteer_achievements')
      .select('*')
      .eq('volunteer_id', volunteerId)
      .order('awarded_at', { ascending: false });

    return NextResponse.json({
      success: true,
      data: {
        volunteer,
        activities: activities || [],
        achievements: achievements || []
      }
    });

  } catch (error) {
    console.error('Get volunteer error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update volunteer (approve/reject/status update)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const volunteerId = params.id;
    const body = await request.json();

    // Handle approval/rejection
    if (body.action === 'approve' || body.action === 'reject') {
      const approvalData: VolunteerApprovalRequest = body;
      
      if (approvalData.action === 'approve') {
        // Calculate commitment end date based on duration
        const startDate = new Date(approvalData.commitment_start_date || new Date());
        let endDate = new Date(startDate);
        
        switch (approvalData.volunteer.commitment_duration) {
          case '1_month':
            endDate.setMonth(endDate.getMonth() + 1);
            break;
          case '6_months':
            endDate.setMonth(endDate.getMonth() + 6);
            break;
          case '1_year':
            endDate.setFullYear(endDate.getFullYear() + 1);
            break;
          case 'flexible':
            endDate.setFullYear(endDate.getFullYear() + 1); // Default to 1 year for flexible
            break;
        }

        const { error } = await supabaseAdmin
          .from('volunteers')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
            reviewed_by_admin_id: admin.id,
            approval_reason: approvalData.approval_reason,
            commitment_start_date: startDate.toISOString().split('T')[0],
            commitment_end_date: endDate.toISOString().split('T')[0]
          })
          .eq('id', volunteerId);

        if (error) {
          console.error('Error approving volunteer:', error);
          return NextResponse.json(
            { success: false, error: 'Failed to approve volunteer' },
            { status: 500 }
          );
        }

        // Log admin action
        await AuthService.logAdminAction(
          admin.id,
          'APPROVE_VOLUNTEER',
          'VOLUNTEER',
          volunteerId
        );

        const response: VolunteerApprovalResponse = {
          success: true,
          message: 'Volunteer approved successfully'
        };

        return NextResponse.json(response);

      } else if (approvalData.action === 'reject') {
        const { error } = await supabaseAdmin
          .from('volunteers')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by_admin_id: admin.id,
            rejection_reason: approvalData.rejection_reason
          })
          .eq('id', volunteerId);

        if (error) {
          console.error('Error rejecting volunteer:', error);
          return NextResponse.json(
            { success: false, error: 'Failed to reject volunteer' },
            { status: 500 }
          );
        }

        // Log admin action
        await AuthService.logAdminAction(
          admin.id,
          'REJECT_VOLUNTEER',
          'VOLUNTEER',
          volunteerId
        );

        const response: VolunteerApprovalResponse = {
          success: true,
          message: 'Volunteer application rejected'
        };

        return NextResponse.json(response);
      }
    }

    // Handle status update (active/inactive)
    if (body.action === 'update_status') {
      const statusData: VolunteerStatusUpdateRequest = body;
      
      const { error } = await supabaseAdmin
        .from('volunteers')
        .update({
          status: statusData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', volunteerId);

      if (error) {
        console.error('Error updating volunteer status:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to update volunteer status' },
          { status: 500 }
        );
      }

      // Log admin action
      await AuthService.logAdminAction(
        admin.id,
        `UPDATE_VOLUNTEER_STATUS_${statusData.status.toUpperCase()}`,
        'VOLUNTEER',
        volunteerId
      );

      const response: VolunteerStatusUpdateResponse = {
        success: true,
        message: `Volunteer status updated to ${statusData.status}`
      };

      return NextResponse.json(response);
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Update volunteer error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
