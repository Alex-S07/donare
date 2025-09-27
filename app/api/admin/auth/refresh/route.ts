import { NextRequest } from 'next/server';
import { AuthService } from '@/lib/auth';
import { createAPIResponse } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie or body
    const refreshToken = request.cookies.get('admin_refresh_token')?.value;
    
    if (!refreshToken) {
      return createAPIResponse(null, 'Refresh token not found', 401);
    }

    // Refresh the access token
    const result = await AuthService.refreshToken(refreshToken);

    if (result.error) {
      return createAPIResponse(null, result.error, 401);
    }

    // Set new access token in cookie
    const response = createAPIResponse({
      token: result.accessToken
    });

    response.cookies.set('admin_token', result.accessToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 // 1 hour
    });

    return response;

  } catch (error) {
    console.error('Token refresh API error:', error);
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
