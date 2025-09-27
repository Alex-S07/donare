import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabaseAdmin } from './supabase';
import { DonationFormData, PaymentOrderResponse, PaymentVerificationRequest, ReceiptData } from '@/types/database';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export class PaymentService {
  // Create Razorpay order
  static async createOrder(donationData: DonationFormData): Promise<{
    success: boolean;
    data?: PaymentOrderResponse;
    error?: string;
    donationId?: number;
  }> {
    try {
      const { name, email, phone, amount } = donationData;

      // Validate amount
      if (amount < 1 || amount > 1000000) {
        return {
          success: false,
          error: 'Amount must be between ₹1 and ₹10,00,000'
        };
      }

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
        notes: {
          donor_name: name,
          donor_email: email,
          donor_phone: phone
        }
      });

      // Store initial donation record in database
      const { data: donation, error: dbError } = await supabaseAdmin
        .from('money_donations')
        .insert({
          name,
          email,
          phone_number: phone,
          amount,
          razorpay_order_id: order.id,
          payment_status: false
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        return {
          success: false,
          error: 'Failed to create donation record'
        };
      }

      return {
        success: true,
        data: {
          orderId: order.id,
          amount: amount,
          currency: 'INR'
        },
        donationId: donation.id
      };

    } catch (error) {
      console.error('Razorpay order creation error:', error);
      return {
        success: false,
        error: 'Failed to create payment order'
      };
    }
  }

  // Verify Razorpay payment signature
  static verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }

  // Verify and complete payment
  static async verifyPayment(verificationData: PaymentVerificationRequest): Promise<{
    success: boolean;
    data?: ReceiptData;
    error?: string;
  }> {
    try {
      const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        donor_details
      } = verificationData;

      // Verify signature
      const isValidSignature = this.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!isValidSignature) {
        return {
          success: false,
          error: 'Invalid payment signature'
        };
      }

      // Get payment details from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      if (payment.status !== 'captured') {
        return {
          success: false,
          error: 'Payment not captured'
        };
      }

      // Update donation record in database
      const { data: donation, error: updateError } = await supabaseAdmin
        .from('money_donations')
        .update({
          payment_status: true,
          razorpay_payment_id,
          razorpay_signature,
          updated_at: new Date().toISOString()
        })
        .eq('razorpay_order_id', razorpay_order_id)
        .select()
        .single();

      if (updateError || !donation) {
        console.error('Database update error:', updateError);
        return {
          success: false,
          error: 'Failed to update donation record'
        };
      }

      // Prepare receipt data
      const receiptData: ReceiptData = {
        id: donation.id,
        name: donation.name,
        email: donation.email,
        amount: donation.amount,
        transaction_id: razorpay_payment_id,
        date: donation.created_at,
        order_id: razorpay_order_id
      };

      return {
        success: true,
        data: receiptData
      };

    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: 'Payment verification failed'
      };
    }
  }

  // Get donation by order ID
  static async getDonationByOrderId(orderId: string) {
    try {
      const { data: donation, error } = await supabaseAdmin
        .from('money_donations')
        .select('*')
        .eq('razorpay_order_id', orderId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: donation };
    } catch (error) {
      return { success: false, error: 'Failed to fetch donation' };
    }
  }

  // Get donation by ID
  static async getDonationById(id: number) {
    try {
      const { data: donation, error } = await supabaseAdmin
        .from('money_donations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: donation };
    } catch (error) {
      return { success: false, error: 'Failed to fetch donation' };
    }
  }

  // Get all donations with pagination
  static async getAllDonations(
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: 'all' | 'completed' | 'pending'
  ) {
    try {
      let query = supabaseAdmin
        .from('money_donations')
        .select('*', { count: 'exact' });

      // Apply filters
      if (status === 'completed') {
        query = query.eq('payment_status', true);
      } else if (status === 'pending') {
        query = query.eq('payment_status', false);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data: donations, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          donations,
          total: count || 0,
          page,
          limit,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch donations' };
    }
  }

  // Get donation statistics
  static async getDonationStats() {
    try {
      const { data: stats, error } = await supabaseAdmin
        .from('admin_dashboard_stats')
        .select('*')
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to fetch statistics' };
    }
  }

  // Refund payment (for admin use)
  static async refundPayment(paymentId: string, amount?: number): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount ? Math.round(amount * 100) : undefined // Convert to paise if specified
      });

      return {
        success: true,
        data: refund
      };
    } catch (error) {
      console.error('Refund error:', error);
      return {
        success: false,
        error: 'Failed to process refund'
      };
    }
  }
}
