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

    // Get receiver from token
    const receiver = await AuthService.getReceiverFromToken(token);

    if (receiver) {
      // Logout receiver (clear session)
      await AuthService.logoutReceiver(receiver.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Receiver logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
