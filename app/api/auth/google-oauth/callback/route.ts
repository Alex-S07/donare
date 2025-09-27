import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const callbackSchema = z.object({
  code: z.string().min(1, 'Authorization code is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = callbackSchema.parse(body);

    // Exchange code for tokens with Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Failed to exchange code for tokens');
    }

    // Get user info from Google with additional profile data
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + tokenData.access_token);

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error('Failed to get user information from Google');
    }

    // Extract additional profile information
    const profileData = {
      email: userData.email,
      id: userData.id,
      name: userData.name,
      given_name: userData.given_name,
      family_name: userData.family_name,
      picture: userData.picture,
      verified_email: userData.verified_email,
      locale: userData.locale
    };

    // Get client IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Authenticate sender with Google and profile data
    const result = await AuthService.authenticateSenderWithGoogle(
      profileData.email,
      profileData.id,
      clientIP,
      profileData
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
    console.error('Google OAuth callback error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}