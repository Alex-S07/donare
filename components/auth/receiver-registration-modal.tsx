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
import { ArrowLeft, Building2, Users, CheckCircle } from 'lucide-react';
import NGORegistrationForm from './ngo-registration-form';
import IndividualRegistrationForm from './individual-registration-form';
import ReceiverLoginForm from './receiver-login-form';

interface ReceiverRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

type RegistrationStep = 'type-selection' | 'ngo-form' | 'individual-form' | 'login-form' | 'success';

export default function ReceiverRegistrationModal({ 
  open, 
  onClose, 
  mode 
}: ReceiverRegistrationModalProps) {
  const [step, setStep] = useState<RegistrationStep>(
    mode === 'login' ? 'login-form' : 'type-selection'
  );
  const [selectedType, setSelectedType] = useState<'ngo' | 'individual' | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    receiverId?: string;
  } | null>(null);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setStep(mode === 'login' ? 'login-form' : 'type-selection');
      setSelectedType(null);
      setSubmissionResult(null);
    }
  }, [open, mode]);

  const handleTypeSelection = (type: 'ngo' | 'individual') => {
    setSelectedType(type);
    setStep(type === 'ngo' ? 'ngo-form' : 'individual-form');
  };

  const handleFormSubmission = (result: { success: boolean; message: string; receiverId?: string }) => {
    setSubmissionResult(result);
    if (result.success) {
      setStep('success');
    }
  };

  const handleBackToTypeSelection = () => {
    setStep('type-selection');
    setSelectedType(null);
  };

  const handleBackToLogin = () => {
    setStep('login-form');
  };

  const getTitle = () => {
    switch (step) {
      case 'type-selection':
        return 'Apply as Recipient';
      case 'ngo-form':
        return 'NGO/Orphanage Registration';
      case 'individual-form':
        return 'Individual/Family Registration';
      case 'login-form':
        return 'Login as Recipient';
      case 'success':
        return 'Application Submitted';
      default:
        return 'Recipient Registration';
    }
  };

  const getDescription = () => {
    switch (step) {
      case 'type-selection':
        return 'Select the type of organization or individual applying for donations';
      case 'ngo-form':
        return 'Please provide detailed information about your NGO or orphanage';
      case 'individual-form':
        return 'Please provide your personal and family information';
      case 'login-form':
        return 'Enter your phone number and password to access your account';
      case 'success':
        return 'Your application has been submitted for review';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {(step === 'ngo-form' || step === 'individual-form') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTypeSelection}
                className="p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {step === 'login-form' && mode === 'signup' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTypeSelection}
                className="p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Type Selection */}
          {step === 'type-selection' && (
            <motion.div
              key="type-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            >
              {/* NGO/Orphanage Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50"
                  onClick={() => handleTypeSelection('ngo')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-blue-100 w-fit">
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">NGO / Orphanage</CardTitle>
                    <CardDescription>
                      Registered organizations serving communities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Comprehensive verification process</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Document upload required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Admin approval needed</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Apply as NGO/Orphanage
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Individual/Family Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50"
                  onClick={() => handleTypeSelection('individual')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-green-100 w-fit">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Individual / Family</CardTitle>
                    <CardDescription>
                      Individuals or families in need of assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>Identity verification required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>Income certificate needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>Admin approval required</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                      Apply as Individual/Family
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Login Option */}
              <div className="md:col-span-2 mt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Already have an approved account?
                  </p>
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('login-form')}
                    className="text-primary hover:text-primary/80"
                  >
                    Login to your account
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* NGO Registration Form */}
          {step === 'ngo-form' && (
            <motion.div
              key="ngo-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <NGORegistrationForm onSubmit={handleFormSubmission} />
            </motion.div>
          )}

          {/* Individual Registration Form */}
          {step === 'individual-form' && (
            <motion.div
              key="individual-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <IndividualRegistrationForm onSubmit={handleFormSubmission} />
            </motion.div>
          )}

          {/* Login Form */}
          {step === 'login-form' && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ReceiverLoginForm onClose={onClose} />
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && submissionResult && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                {submissionResult.message}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>What happens next?</strong>
                </p>
                <p>
                  Our admin team will review your application and verify the submitted documents.
                  You will receive login credentials via email/SMS once approved.
                </p>
              </div>
              <Button onClick={onClose} className="mt-6">
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
