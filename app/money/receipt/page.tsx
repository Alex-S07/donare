'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Download, 
  Printer, 
  Home, 
  Share2,
  Calendar,
  CreditCard,
  User,
  Mail,
  Phone,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';

interface ReceiptData {
  id: number;
  name: string;
  email: string;
  amount: number;
  transaction_id: string;
  date: string;
  order_id: string;
}

export default function ReceiptPage() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get receipt data from sessionStorage
    const storedData = sessionStorage.getItem('receiptData');
    if (!storedData) {
      toast.error('No receipt data found. Please complete a donation first.');
      router.push('/money/donate');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setReceiptData(data);
    } catch (error) {
      toast.error('Invalid receipt data. Please try again.');
      router.push('/money/donate');
    }
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, you would generate a PDF
    toast.info('PDF download feature will be implemented soon.');
  };

  const handleShare = async () => {
    if (navigator.share && receiptData) {
      try {
        await navigator.share({
          title: 'Donare - Donation Receipt',
          text: `I just donated ₹${receiptData.amount.toLocaleString('en-IN')} to Donare!`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Receipt link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Receipt link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading receipt...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="p-4 bg-green-600 text-white rounded-full"
            >
              <CheckCircle className="h-16 w-16" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-green-800">
            Thank You!
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Your donation has been successfully processed. You will receive an email confirmation shortly.
          </p>
        </motion.div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="print:shadow-none">
            <CardHeader className="text-center border-b">
              <div className="flex justify-center mb-4">
                <div className="text-3xl font-bold text-blue-600">Donare</div>
              </div>
              <CardTitle className="text-2xl text-gray-800">Donation Receipt</CardTitle>
              <p className="text-muted-foreground">Official receipt for your generous contribution</p>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Receipt Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Donor Information</h3>
                  
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold">{receiptData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-semibold">{receiptData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
                  
                  <div className="flex items-center space-x-3">
                    <Hash className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Receipt ID</p>
                      <p className="font-semibold">#{receiptData.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-semibold font-mono text-sm">{receiptData.transaction_id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold">{formatDate(receiptData.date)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Amount Section */}
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground mb-2">Donation Amount</p>
                <div className="text-4xl font-bold text-green-600">
                  ₹{receiptData.amount.toLocaleString('en-IN')}
                </div>
                <Badge variant="secondary" className="mt-2">Money Donation</Badge>
              </div>

              <Separator className="my-8" />

              {/* Organization Info */}
              <div className="text-center text-sm text-muted-foreground mb-8">
                <p className="font-semibold mb-2">Donare Foundation</p>
                <p>Connecting Hearts, Changing Lives</p>
                <p>Email: donations@donare.org | Phone: 1-899-DONARE</p>
                <p className="mt-2">This receipt serves as proof of your donation for tax purposes.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center print:hidden">
                <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2">
                  <Printer className="h-4 w-4" />
                  <span>Print Receipt</span>
                </Button>
                
                {/* <Button onClick={handleDownload} variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </Button> */}
                
                <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                
                <Button onClick={() => router.push('/')} className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Return Home</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Your Generosity Makes a Difference
              </h3>
              <p className="text-green-700 mb-4">
                Your donation will directly help families in need. We'll send you updates on how your 
                contribution is making an impact in the community.
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/money/donate')}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Donate Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/clothes')}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Explore Other Ways to Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
