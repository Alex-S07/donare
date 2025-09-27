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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') as 'all' | 'completed' | 'pending' || 'all';

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return createAPIResponse(null, 'Invalid pagination parameters', 400);
    }

    // Get donations
    const result = await PaymentService.getAllDonations(page, limit, search, status);

    if (!result.success) {
      return createAPIResponse(null, result.error, 500);
    }

    // Log admin action
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);
    
    await AuthService.logAdminAction(
      admin.id,
      'VIEW_DONATIONS',
      'DONATION',
      undefined,
      ipAddress,
      userAgent
    );

    return createAPIResponse(result.data);

  } catch (error) {
    console.error('Admin donations API error:', error);
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
