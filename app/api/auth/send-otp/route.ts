import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const sendOTPSchema = z.object({
  email: z.string().email('Invalid email address')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = sendOTPSchema.parse(body);

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // Check rate limiting
    if (!AuthService.checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Send OTP
    const result = await AuthService.sendSenderOTP(email, clientIP, userAgent);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully' 
      });
    } else {
      AuthService.recordLoginAttempt(clientIP, false);
      return NextResponse.json(
        { error: result.error || 'Failed to send OTP' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Send OTP error:', error);
    
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
