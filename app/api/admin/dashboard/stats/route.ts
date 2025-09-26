import { NextRequest } from 'next/server';
import { PaymentService } from '@/lib/razorpay';
import { AuthService } from '@/lib/auth';
import { 
  getClientIP, 
  getUserAgent,
  createAPIResponse 
} from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Get admin token from cookie or header
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return createAPIResponse(null, 'Authentication required', 401);
    }

    // Verify admin authentication
    const admin = await AuthService.getAdminFromToken(token);
    
    if (!admin) {
      return createAPIResponse(null, 'Invalid or expired token', 401);
    }

    // Get dashboard statistics
    const result = await PaymentService.getDonationStats();

    if (!result.success) {
      return createAPIResponse(null, result.error, 500);
    }

    // Log admin action
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);
    
    await AuthService.logAdminAction(
      admin.id,
      'VIEW_DASHBOARD',
      'DASHBOARD',
      undefined,
      ipAddress,
      userAgent
    );

    return createAPIResponse(result.data);

  } catch (error) {
    console.error('Admin dashboard stats API error:', error);
    return createAPIResponse(null, 'Internal server error', 500);
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
