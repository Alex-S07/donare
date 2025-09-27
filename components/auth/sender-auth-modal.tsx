'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield
} from 'lucide-react';
import { useSenderAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import GoogleOAuthButton from './google-oauth-button';

// Form schemas
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers')
});

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

interface SenderAuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

type AuthStep = 'method-selection' | 'email-input' | 'otp-verification' | 'success';

export default function SenderAuthModal({ open, onClose, mode }: SenderAuthModalProps) {
  const [step, setStep] = useState<AuthStep>('method-selection');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const { login } = useSenderAuth();

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });

  // OTP form
  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' }
  });

  // Reset form state when modal closes
  React.useEffect(() => {
    if (!open) {
      setStep('method-selection');
      setError(null);
      setEmail('');
      emailForm.reset();
      otpForm.reset();
    }
  }, [open, emailForm, otpForm]);

  // Handle Google OAuth success
  const handleGoogleSuccess = (data: any) => {
    if (data.token) {
      login(data.token);
      setStep('success');
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        toast.success('Successfully logged in with Google!');
      }, 1500);
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = (error: string) => {
    setError(error);
  };

  // Handle email submission
  const handleEmailSubmit = async (data: EmailFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send OTP');
      }

      setEmail(data.email);
      setStep('otp-verification');
      toast.success('OTP sent to your email address');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPSubmit = async (data: OTPFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          otp: data.otp 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid OTP');
      }

      const { token } = await response.json();
      login(token);
      setStep('success');
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        toast.success('Successfully logged in!');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'signup' ? 'Create Donor Account' : 'Login as Donor';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== 'method-selection' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (step === 'otp-verification') setStep('email-input');
                  else if (step === 'email-input') setStep('method-selection');
                }}
                className="p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {title}
          </DialogTitle>
          <DialogDescription>
            {step === 'method-selection' && 'Choose your preferred authentication method'}
            {step === 'email-input' && 'Enter your email address to receive an OTP'}
            {step === 'otp-verification' && `Enter the 6-digit code sent to ${email}`}
            {step === 'success' && 'Authentication successful!'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Method Selection */}
          {step === 'method-selection' && (
            <motion.div
              key="method-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Google OAuth Button */}
              <GoogleOAuthButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                disabled={loading}
                className="w-full h-12"
              >
                Continue with Google
              </GoogleOAuthButton>

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div> */}

              {/* Email Option */}
              {/* <Button
                onClick={() => setStep('email-input')}
                variant="outline"
                className="w-full h-12"
              >
                <Mail className="h-4 w-4 mr-2" />
                Continue with Email
              </Button> */}

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">Secure Authentication</p>
                  <p>Your session will automatically expire after 15 minutes for security.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Input */}
          {step === 'email-input' && (
            <motion.div
              key="email-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...emailForm.register('email')}
                    className="h-12"
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-red-600">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* OTP Verification */}
          {step === 'otp-verification' && (
            <motion.div
              key="otp-verification"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    {...otpForm.register('otp')}
                    className="h-12 text-center text-lg tracking-widest"
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm text-red-600">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleEmailSubmit({ email })}
                  disabled={loading}
                  className="w-full"
                >
                  Resend OTP
                </Button>
              </form>
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Welcome to Donare!</h3>
              <p className="text-muted-foreground">
                You're now logged in and ready to start donating.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
