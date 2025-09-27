'use client';

import React, { useState } from 'react';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import DonationForm from '@/components/forms/donation-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shirt, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ClothesDonatePage() {
  const { isAuthenticated, userType } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (data: any) => {
    setIsSubmitted(true);
    toast.success('Thank you for your generous clothing donation! We will contact you soon to arrange pickup.');
  };

  const handleBackToBrowse = () => {
    setIsSubmitted(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent my-12">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Shirt className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">Donate Clothes</h1>
            </motion.div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your gently used clothing with those who need them. Every piece of clothing can make a difference in someone's life.
            </p>
          </div>

          {/* Authentication Required Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Authentication Required</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-gray-600">
                  To donate clothes, you need to be logged in as a donor. This helps us maintain the quality and safety of our donation platform.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Why do we need authentication?</h3>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Ensures quality and safety of donated items</li>
                    <li>• Helps us coordinate pickup and delivery</li>
                    <li>• Allows us to track donation impact</li>
                    <li>• Maintains community trust and transparency</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/login">
                      <Heart className="h-5 w-5 mr-2" />
                      Sign Up to Donate
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/clothes/request">
                      <Shirt className="h-5 w-5 mr-2" />
                      Browse Clothing Requests
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Donate Clothes?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Help Families in Need</h3>
                <p className="text-sm text-gray-600">
                  Your donated clothes provide essential clothing for families who cannot afford new garments.
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Reduce Waste</h3>
                <p className="text-sm text-gray-600">
                  Give your clothes a second life and help reduce textile waste in our environment.
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Build Community</h3>
                <p className="text-sm text-gray-600">
                  Join a community of caring individuals working together to support those in need.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (userType !== 'sender') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent my-12">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Shirt className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">Donate Clothes</h1>
            </motion.div>
          </div>

          {/* Wrong User Type Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Switch to Donor Mode</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-gray-600">
                  You're currently logged in as a recipient. To donate clothes, you need to switch to donor mode or create a donor account.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/login">
                      <Heart className="h-5 w-5 mr-2" />
                      Switch to Donor
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/clothes/request">
                      <Shirt className="h-5 w-5 mr-2" />
                      Browse Requests Instead
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Shirt className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">Donate Clothes</h1>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your gently used clothing with those who need them. Every piece of clothing can make a difference in someone's life.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-800 mb-6">
                  Your clothing donation has been submitted successfully. We will contact you within 24 hours to arrange pickup.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleBackToBrowse} variant="outline" size="lg">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Donate More Items
                  </Button>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/clothes/request">
                      <Shirt className="h-5 w-5 mr-2" />
                      Browse Requests
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Donation Form */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DonationForm 
              type="donate" 
              category="clothes" 
              onSubmit={handleFormSubmit}
            />
          </motion.div>
        )}

        {/* Guidelines Section */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Clothing Donation Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  What We Accept
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Clean, gently used clothing</li>
                  <li>• All sizes (children, adult, plus sizes)</li>
                  <li>• Seasonal clothing (winter, summer)</li>
                  <li>• Professional and casual wear</li>
                  <li>• Shoes in good condition</li>
                  <li>• Accessories (belts, bags, jewelry)</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Preparation Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Wash and dry all items</li>
                  <li>• Check for stains or damage</li>
                  <li>• Remove personal items from pockets</li>
                  <li>• Fold items neatly</li>
                  <li>• Separate by size if possible</li>
                  <li>• Include size labels when available</li>
                </ul>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
