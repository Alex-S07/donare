import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const approveReceiverSchema = z.object({
  receiver_id: z.string().uuid('Invalid receiver ID'),
  action: z.enum(['approve', 'reject']),
  rejection_reason: z.string().optional(),
  generated_password: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { receiver_id, action, rejection_reason, generated_password } = approveReceiverSchema.parse(body);

    // Get receiver details
    const { data: receiver, error: fetchError } = await supabaseAdmin
      .from('donation_receivers')
      .select('*')
      .eq('id', receiver_id)
      .single();

    if (fetchError || !receiver) {
      return NextResponse.json(
        { error: 'Receiver not found' },
        { status: 404 }
      );
    }

    if (receiver.status !== 'pending') {
      return NextResponse.json(
        { error: 'Receiver has already been processed' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // Approve receiver
      if (!generated_password) {
        return NextResponse.json(
          { error: 'Password is required for approval' },
          { status: 400 }
        );
      }

      // Use AuthService to approve receiver
      const approvalResult = await AuthService.approveReceiver(
        receiver_id,
        adminUser.id,
        generated_password
      );

      if (!approvalResult.success) {
        return NextResponse.json(
          { error: approvalResult.error || 'Failed to approve receiver' },
          { status: 500 }
        );
      }

      // Log admin action
      await supabaseAdmin
        .from('admin_actions')
        .insert({
          admin_id: adminUser.id,
          action_type: 'approve_receiver',
          target_id: receiver_id,
          details: {
            receiver_type: receiver.receiver_type,
            phone_number: receiver.phone_number
          }
        });

      return NextResponse.json({
        success: true,
        message: 'Receiver approved successfully',
        credentials: {
          phone_number: receiver.phone_number,
          password: generated_password
        }
      });

    } else if (action === 'reject') {
      // Reject receiver
      if (!rejection_reason) {
        return NextResponse.json(
          { error: 'Rejection reason is required' },
          { status: 400 }
        );
      }

      const { error: updateError } = await supabaseAdmin
        .from('donation_receivers')
        .update({
          status: 'rejected',
          rejection_reason,
          approved_by_admin_id: adminUser.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', receiver_id);

      if (updateError) {
        console.error('Database update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to reject receiver' },
          { status: 500 }
        );
      }

      // Log admin action
      await supabaseAdmin
        .from('admin_actions')
        .insert({
          admin_id: adminUser.id,
          action_type: 'reject_receiver',
          target_id: receiver_id,
          details: {
            receiver_type: receiver.receiver_type,
            phone_number: receiver.phone_number,
            rejection_reason
          }
        });

      return NextResponse.json({
        success: true,
        message: 'Receiver rejected successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Approve receiver error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
