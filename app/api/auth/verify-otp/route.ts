import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const verifyOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = verifyOTPSchema.parse(body);

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // Verify OTP and authenticate
    const result = await AuthService.authenticateSenderWithOTP(email, otp, clientIP);

    if (result.success) {
      return NextResponse.json({
        success: true,
        token: result.token,
        sender: result.sender
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'OTP verification failed' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Verify OTP error:', error);
    
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
