import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const loginReceiverSchema = z.object({
  phone_number: z.string().regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = loginReceiverSchema.parse(body);

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // Authenticate receiver
    const result = await AuthService.authenticateReceiver(credentials, clientIP);

    if (result.success) {
      return NextResponse.json({
        success: true,
        token: result.token,
        receiver: result.receiver
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Login failed' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Receiver login error:', error);
    
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
