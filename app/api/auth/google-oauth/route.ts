import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const googleAuthSchema = z.object({
  email: z.string().email('Invalid email address'),
  provider_id: z.string().min(1, 'Provider ID is required'),
  access_token: z.string().min(1, 'Access token is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, provider_id, access_token } = googleAuthSchema.parse(body);

    // Get client IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Verify Google token (in production, verify with Google's API)
    // For now, we'll trust the frontend verification
    
    // Authenticate sender with Google
    const result = await AuthService.authenticateSenderWithGoogle(
      email, 
      provider_id, 
      clientIP
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        token: result.token,
        sender: result.sender
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Google authentication failed' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Google OAuth error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate Google OAuth URL
export async function GET() {
  try {
    // Check if required environment variables are present
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
      throw new Error('Missing Google OAuth configuration');
    }

    // Generate Google OAuth URL with additional scopes
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent('email profile openid')}&` +
      `access_type=offline&` +
      `prompt=consent&` +
      `state=${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      authUrl: googleOAuthUrl
    });

  } catch (error) {
    console.error('Google OAuth URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate OAuth URL' },
      { status: 500 }
    );
  }
}
