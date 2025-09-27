'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, HandHeart, ArrowRight, Users, User } from 'lucide-react';

interface UserTypeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectUserType: (userType: 'sender' | 'receiver') => void;
  mode: 'signup' | 'login';
}

export default function UserTypeSelectionModal({
  open,
  onClose,
  onSelectUserType,
  mode
}: UserTypeSelectionModalProps) {
  const [selectedType, setSelectedType] = useState<'sender' | 'receiver' | null>(null);

  const handleSelection = (userType: 'sender' | 'receiver') => {
    setSelectedType(userType);
    // Add a small delay for visual feedback
    setTimeout(() => {
      onSelectUserType(userType);
      setSelectedType(null);
    }, 200);
  };

  const title = mode === 'signup' ? 'Join Donare' : 'Welcome Back';
  const description = mode === 'signup' 
    ? 'Choose how you\'d like to participate in our community'
    : 'Please select your account type to continue';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-primary fill-current" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Donation Sender Option */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                selectedType === 'sender' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelection('sender')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-blue-100 w-fit">
                  <HandHeart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">I Want to Donate</CardTitle>
                <CardDescription className="text-sm">
                  Share items and resources with those in need
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Donate clothes, electronics, household items, and more</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Quick registration with Google or email verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Connect directly with verified recipients</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection('sender');
                  }}
                  disabled={selectedType === 'sender'}
                >
                  {selectedType === 'sender' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Redirecting...
                    </motion.div>
                  ) : (
                    <>
                      {mode === 'signup' ? 'Sign Up' : 'Login'} as Donor
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donation Receiver Option */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                selectedType === 'receiver' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelection('receiver')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-100 w-fit">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">I Need Assistance</CardTitle>
                <CardDescription className="text-sm">
                  Request donations for your organization or family
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span>For NGOs, orphanages, and families in need</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span>Comprehensive verification process for security</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span>Admin approval required before activation</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full mt-6 group border-green-200 hover:bg-green-50 hover:border-green-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection('receiver');
                  }}
                  disabled={selectedType === 'receiver'}
                >
                  {selectedType === 'receiver' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                      Redirecting...
                    </motion.div>
                  ) : (
                    <>
                      {mode === 'signup' ? 'Apply' : 'Login'} as Recipient
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button 
                  className="text-primary hover:underline font-medium"
                  onClick={onClose}
                >
                  Login instead
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  className="text-primary hover:underline font-medium"
                  onClick={onClose}
                >
                  Sign up instead
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
