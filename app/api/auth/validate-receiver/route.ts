import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Validate receiver token
    const receiver = await AuthService.getReceiverFromToken(token);

    if (!receiver) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      receiver: {
        id: receiver.id,
        phone_number: receiver.phone_number,
        receiver_type: receiver.receiver_type,
        status: receiver.status,
        session_expires_at: receiver.session_expires_at
      }
    });

  } catch (error) {
    console.error('Validate receiver token error:', error);
    return NextResponse.json(
      { error: 'Token validation failed' },
      { status: 401 }
    );
  }
}
