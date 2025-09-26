import { NextRequest } from 'next/server';
import { PaymentService } from '@/lib/razorpay';
import { 
  getClientIP, 
  rateLimit, 
  sanitizeInput, 
  validateRequestBody, 
  createAPIResponse,
  isValidEmail,
  isValidPhone,
  isValidAmount
} from '@/lib/middleware';
import { DonationFormData } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIP(request);
    
    // Rate limiting - 5 orders per minute per IP
    if (!rateLimit(ipAddress, 5, 60 * 1000)) {
      return createAPIResponse(
        null,
        'Too many requests. Please try again later.',
        429
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    const { isValid, errors } = validateRequestBody(sanitizedBody, ['name', 'email', 'phone', 'amount']);
    
    if (!isValid) {
      return createAPIResponse(null, errors.join(', '), 400);
    }

    const { name, email, phone, amount } = sanitizedBody as DonationFormData;

    // Validate input formats
    if (name.length < 2 || name.length > 255) {
      return createAPIResponse(null, 'Name must be between 2 and 255 characters', 400);
    }

    if (!isValidEmail(email)) {
      return createAPIResponse(null, 'Please enter a valid email address', 400);
    }

    if (!isValidPhone(phone)) {
      return createAPIResponse(null, 'Please enter a valid phone number', 400);
    }

    if (!isValidAmount(amount)) {
      return createAPIResponse(null, 'Amount must be between ₹1 and ₹10,00,000', 400);
    }

    // Create payment order
    const result = await PaymentService.createOrder({
      name,
      email,
      phone,
      amount
    });

    if (!result.success) {
      return createAPIResponse(null, result.error, 400);
    }

    return createAPIResponse({
      orderId: result.data!.orderId,
      amount: result.data!.amount,
      currency: result.data!.currency,
      donationId: result.donationId
    });

  } catch (error) {
    console.error('Create order API error:', error);
    return createAPIResponse(null, 'Internal server error', 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
