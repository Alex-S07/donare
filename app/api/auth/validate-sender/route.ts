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

    // Validate sender token
    const sender = await AuthService.getSenderFromToken(token);

    if (!sender) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      sender: {
        id: sender.id,
        email: sender.email,
        provider: sender.provider,
        session_expires_at: sender.session_expires_at
      }
    });

  } catch (error) {
    console.error('Validate sender token error:', error);
    return NextResponse.json(
      { error: 'Token validation failed' },
      { status: 401 }
    );
  }
}
