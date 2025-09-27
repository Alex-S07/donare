import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { FileUploadService } from '@/lib/file-upload';
import { z } from 'zod';

const registerReceiverSchema = z.object({
  receiver_type: z.enum(['ngo', 'individual']),
  phone_number: z.string().regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  form_data: z.string().min(1, 'Form data is required')
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const receiver_type = formData.get('receiver_type') as string;
    const phone_number = formData.get('phone_number') as string;
    const email = formData.get('email') as string;
    const form_data_str = formData.get('form_data') as string;

    // Validate basic fields
    const validatedData = registerReceiverSchema.parse({
      receiver_type,
      phone_number,
      email: email || undefined,
      form_data: form_data_str
    });

    // Parse form data JSON
    let parsedFormData;
    try {
      parsedFormData = JSON.parse(form_data_str);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid form data format' },
        { status: 400 }
      );
    }

    // Check if phone number already exists
    const { data: existingReceiver } = await supabaseAdmin
      .from('donation_receivers')
      .select('id')
      .eq('phone_number', phone_number)
      .single();

    if (existingReceiver) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      );
    }

    // Create receiver record first
    const { data: receiver, error: insertError } = await supabaseAdmin
      .from('donation_receivers')
      .insert({
        receiver_type: validatedData.receiver_type,
        phone_number: validatedData.phone_number,
        email: validatedData.email || null,
        form_data: parsedFormData,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError || !receiver) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create receiver record' },
        { status: 500 }
      );
    }

    // Handle file uploads
    const uploadedDocuments: Record<string, any> = {};
    const uploadErrors: string[] = [];

    // Process document uploads
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('documents[') && value instanceof File) {
        const documentType = key.match(/documents\[(.+)\]/)?.[1];
        if (documentType) {
          const uploadResult = await FileUploadService.uploadFile(
            value,
            receiver.id,
            documentType
          );

          if (uploadResult.success) {
            uploadedDocuments[documentType] = {
              file_name: value.name,
              file_size: value.size,
              file_type: value.type,
              storage_path: uploadResult.filePath,
              uploaded_at: new Date().toISOString()
            };
          } else {
            uploadErrors.push(`${documentType}: ${uploadResult.error}`);
          }
        }
      }
    }

    // Update receiver with document metadata
    if (Object.keys(uploadedDocuments).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('donation_receivers')
        .update({ documents: uploadedDocuments })
        .eq('id', receiver.id);

      if (updateError) {
        console.error('Document metadata update error:', updateError);
        // Don't fail the request, just log the error
      }
    }

    // Return success response
    const response = {
      success: true,
      receiver_id: receiver.id,
      message: receiver_type === 'ngo' 
        ? 'We will contact you soon!' 
        : 'We will verify your details and contact you soon!',
      uploaded_documents: Object.keys(uploadedDocuments),
      upload_errors: uploadErrors.length > 0 ? uploadErrors : undefined
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Register receiver error:', error);
    
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
