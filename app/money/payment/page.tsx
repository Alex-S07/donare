'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonationData {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export default function PaymentPage() {
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get donation data from sessionStorage
    const storedData = sessionStorage.getItem('donationData');
    if (!storedData) {
      toast.error('No donation data found. Please start over.');
      router.push('/money/donate');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setDonationData(data);
    } catch (error) {
      toast.error('Invalid donation data. Please start over.');
      router.push('/money/donate');
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      toast.error('Failed to load payment gateway. Please try again.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  const handlePayment = async () => {
    if (!donationData || !razorpayLoaded) {
      toast.error('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RMIW0YqXaXZCNm',
        amount: orderData.data.amount * 100, // Convert to paise
        currency: orderData.data.currency,
        name: 'Donare',
        description: 'Money Donation',
        order_id: orderData.data.orderId,
        prefill: {
          name: donationData.name,
          email: donationData.email,
          contact: donationData.phone,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async (response: any) => {
          await verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info('Payment cancelled. You can try again.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (response: any) => {
    try {
      const verificationResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          donor_details: donationData,
        }),
      });

      const verificationData = await verificationResponse.json();

      if (!verificationData.success) {
        throw new Error(verificationData.error || 'Payment verification failed');
      }

      // Store receipt data and redirect
      sessionStorage.setItem('receiptData', JSON.stringify(verificationData.data.receipt_data));
      sessionStorage.removeItem('donationData');
      
      toast.success('Payment successful! Thank you for your donation.');
      router.push('/money/receipt');

    } catch (error) {
      console.error('Verification error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment verification failed');
      setIsProcessing(false);
    }
  };

  const handleGoBack = () => {
    router.push('/money/donate');
  };

  if (!donationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading donation details...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 text-white rounded-full">
                <CreditCard className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-blue-800">
              Complete Your Donation
            </h1>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Review your donation details and proceed with secure payment
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span>Donation Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Donor Name</label>
                      <p className="text-lg font-semibold">{donationData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-lg">{donationData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-lg">{donationData.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Category</label>
                      <Badge variant="secondary" className="text-sm">Money Donation</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{donationData.amount.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleGoBack}
                      disabled={isProcessing}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Go Back</span>
                    </Button>
                    
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing || !razorpayLoaded}
                      className="flex-1 flex items-center justify-center space-x-2"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Pay ₹{donationData.amount.toLocaleString('en-IN')}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Security Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-700">
                    <Shield className="h-5 w-5" />
                    <span>Secure Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• 256-bit SSL encryption</p>
                  <p>• PCI DSS compliant</p>
                  <p>• Powered by Razorpay</p>
                  <p>• No card details stored</p>
                  <p>• Instant payment confirmation</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Payment Methods</h3>
                      <p className="text-sm text-blue-700">
                        We accept all major credit cards, debit cards, UPI, net banking, and digital wallets.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
