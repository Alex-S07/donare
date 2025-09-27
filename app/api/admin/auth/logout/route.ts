import { NextRequest } from 'next/server';
import { createAPIResponse } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = createAPIResponse({ message: 'Logged out successfully' });

    // Clear authentication cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0 // Expire immediately
    };

    response.cookies.set('admin_token', '', cookieOptions);
    response.cookies.set('admin_refresh_token', '', cookieOptions);

    return response;

  } catch (error) {
    console.error('Logout API error:', error);
    return createAPIResponse(null, 'Internal server error', 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
