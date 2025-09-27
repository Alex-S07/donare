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

    // Get sender from token to get sender ID
    const sender = await AuthService.getSenderFromToken(token);
    
    if (!sender) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Logout sender
    const result = await AuthService.logoutSender(sender.id);

    if (result.success) {
      return NextResponse.json({ 
        success: true,
        message: 'Successfully logged out' 
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to logout' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Sender logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}