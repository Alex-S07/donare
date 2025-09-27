import { NextRequest } from 'next/server';
import { AuthService } from '@/lib/auth';
import { 
  getClientIP, 
  getUserAgent, 
  rateLimit, 
  sanitizeInput, 
  validateRequestBody, 
  createAPIResponse 
} from '@/lib/middleware';
import { AdminLoginRequest } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);
    
    // Rate limiting
    if (!rateLimit(ipAddress, 10, 15 * 60 * 1000)) { // 10 requests per 15 minutes
      return createAPIResponse(
        null,
        'Too many requests. Please try again later.',
        429
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    const { isValid, errors } = validateRequestBody(sanitizedBody, ['username', 'password']);
    
    if (!isValid) {
      return createAPIResponse(null, errors.join(', '), 400);
    }

    const { username, password, remember_me } = sanitizedBody as AdminLoginRequest;

    // Validate input lengths
    if (username.length < 3 || username.length > 50) {
      return createAPIResponse(null, 'Username must be between 3 and 50 characters', 400);
    }

    if (password.length < 6) {
      return createAPIResponse(null, 'Password must be at least 6 characters', 400);
    }

    // Attempt login
    const loginResult = await AuthService.login(
      { username, password, remember_me },
      ipAddress,
      userAgent
    );

    if (!loginResult.success) {
      return createAPIResponse(null, loginResult.error, 401);
    }

    // Set secure cookies for tokens
    const response = createAPIResponse({
      admin: loginResult.admin,
      token: loginResult.token
    });

    // Set HTTP-only cookies for tokens
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/'
    };

    response.cookies.set('admin_token', loginResult.token!, {
      ...cookieOptions,
      maxAge: 60 * 60 // 1 hour
    });

    if (loginResult.refresh_token) {
      response.cookies.set('admin_refresh_token', loginResult.refresh_token, {
        ...cookieOptions,
        maxAge: remember_me ? 7 * 24 * 60 * 60 : 24 * 60 * 60 // 7 days if remember_me, else 1 day
      });
    }

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return createAPIResponse(null, 'Internal server error', 500);
  }
}

// Handle OPTIONS for CORS
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
