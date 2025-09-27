'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Heart, Clock, Mail } from 'lucide-react';

export default function VolunteerApplicationSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <Card className="text-center">
          <CardHeader className="pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Application Submitted Successfully!
            </CardTitle>
            
            <CardDescription className="text-lg text-muted-foreground">
              Thank you for your interest in volunteering with Donare. We appreciate your commitment to making a difference in people's lives.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                What happens next?
              </h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Our team will review your application within 2-3 business days</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>You'll receive an email confirmation with your application details</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>If approved, we'll contact you to discuss your volunteer role and schedule</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>You'll receive orientation materials and next steps</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Questions?
              </h3>
              <p className="text-gray-600 mb-2">
                If you have any questions about your application or the volunteer process, please don't hesitate to contact us:
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Email:</strong> volunteer@donare.org</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => router.push('/volunteer')}
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Learn More About Volunteering
              </Button>
            </div>

            {/* Auto-redirect notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-muted-foreground"
            >
              You'll be automatically redirected to the homepage in a few seconds...
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
