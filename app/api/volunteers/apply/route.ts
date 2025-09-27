import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { 
  VolunteerApplicationRequest, 
  VolunteerApplicationResponse,
  VolunteerApplicationData 
} from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body: VolunteerApplicationRequest = await request.json();
    const { application_data } = body;

    // Validate required fields
    if (!application_data.full_name || !application_data.email || !application_data.phone_number) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if volunteer already exists with this email
    const { data: existingVolunteer } = await supabaseAdmin
      .from('volunteers')
      .select('id')
      .eq('email', application_data.email)
      .single();

    if (existingVolunteer) {
      return NextResponse.json(
        { success: false, error: 'A volunteer application with this email already exists' },
        { status: 409 }
      );
    }

    // Prepare volunteer data for insertion
    const volunteerData = {
      full_name: application_data.full_name,
      age: application_data.age,
      gender: application_data.gender,
      phone_number: application_data.phone_number,
      email: application_data.email,
      current_occupation: application_data.current_occupation || null,
      work_experience: application_data.work_experience || null,
      educational_background: application_data.educational_background || null,
      commitment_duration: application_data.commitment_duration,
      preferred_activities: application_data.preferred_activities,
      availability_schedule: application_data.availability_schedule,
      relevant_skills: application_data.relevant_skills,
      areas_of_interest: application_data.areas_of_interest,
      previous_volunteer_experience: application_data.previous_volunteer_experience || null,
      emergency_contact_name: application_data.emergency_contact_name,
      emergency_contact_relationship: application_data.emergency_contact_relationship,
      emergency_contact_phone: application_data.emergency_contact_phone,
      motivation_statement: application_data.motivation_statement,
      certifications: application_data.certifications || [],
      documents: application_data.documents || null,
      status: 'pending' as const,
      submitted_at: new Date().toISOString()
    };

    // Insert volunteer application
    const { data: volunteer, error } = await supabaseAdmin
      .from('volunteers')
      .insert(volunteerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating volunteer application:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit volunteer application' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin about new application
    // TODO: Send confirmation email to volunteer

    const response: VolunteerApplicationResponse = {
      success: true,
      volunteer_id: volunteer.id,
      message: 'Volunteer application submitted successfully. We will review your application and get back to you soon.'
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Volunteer application error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
