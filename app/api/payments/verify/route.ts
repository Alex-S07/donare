import { NextRequest } from 'next/server';
import { PaymentService } from '@/lib/razorpay';
import { 
  getClientIP, 
  rateLimit, 
  sanitizeInput, 
  validateRequestBody, 
  createAPIResponse 
} from '@/lib/middleware';
import { PaymentVerificationRequest } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIP(request);
    
    // Rate limiting - 10 verifications per minute per IP
    if (!rateLimit(ipAddress, 10, 60 * 1000)) {
      return createAPIResponse(
        null,
        'Too many requests. Please try again later.',
        429
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    const { isValid, errors } = validateRequestBody(sanitizedBody, [
      'razorpay_payment_id',
      'razorpay_order_id',
      'razorpay_signature',
      'donor_details'
    ]);
    
    if (!isValid) {
      return createAPIResponse(null, errors.join(', '), 400);
    }

    const verificationData = sanitizedBody as PaymentVerificationRequest;

    // Validate Razorpay IDs format
    if (!verificationData.razorpay_payment_id.startsWith('pay_')) {
      return createAPIResponse(null, 'Invalid payment ID format', 400);
    }

    if (!verificationData.razorpay_order_id.startsWith('order_')) {
      return createAPIResponse(null, 'Invalid order ID format', 400);
    }

    // Verify payment
    const result = await PaymentService.verifyPayment(verificationData);

    if (!result.success) {
      return createAPIResponse(null, result.error, 400);
    }

    return createAPIResponse({
      success: true,
      receipt_data: result.data
    });

  } catch (error) {
    console.error('Payment verification API error:', error);
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
