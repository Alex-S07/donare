import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const completeProfileSchema = z.object({
  phone_number: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  date_of_birth: z.string()
    .min(1, 'Date of birth is required'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be at most 200 characters'),
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters'),
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be at most 50 characters'),
  country: z.string()
    .min(2, 'Country must be at least 2 characters')
    .max(50, 'Country must be at most 50 characters'),
  pincode: z.string()
    .min(5, 'Pincode must be at least 5 characters')
    .max(10, 'Pincode must be at most 10 characters')
    .regex(/^[0-9]+$/, 'Pincode must contain only numbers'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = completeProfileSchema.parse(body);

    // Get client IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Find the sender by email
    const { data: sender, error } = await supabaseAdmin
      .from('donation_senders')
      .select('*')
      .eq('email', validatedData.email)
      .eq('provider', 'google')
      .single();

    if (error || !sender) {
      return NextResponse.json(
        { error: 'Sender not found' },
        { status: 404 }
      );
    }

    // Update sender with additional profile information
    const { data: updatedSender, error: updateError } = await supabaseAdmin
      .from('donation_senders')
      .update({
        full_name: validatedData.name,
        phone_number: validatedData.phone_number,
        date_of_birth: validatedData.date_of_birth,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        country: validatedData.country,
        pincode: validatedData.pincode,
        last_activity_at: new Date().toISOString()
      })
      .eq('id', sender.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    // Generate new token for the updated sender
    const { accessToken } = AuthService.generateSenderTokens(updatedSender.id, updatedSender.email);

    return NextResponse.json({
      success: true,
      token: accessToken,
      sender: {
        id: updatedSender.id,
        email: updatedSender.email,
        provider: updatedSender.provider,
        full_name: updatedSender.full_name,
        phone_number: updatedSender.phone_number
      }
    });

  } catch (error) {
    console.error('Complete Google profile error:', error);
    
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
