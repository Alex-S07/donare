'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2, Phone, Lock, CheckCircle } from 'lucide-react';
import { useReceiverAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

// Form schema
const loginSchema = z.object({
  phone_number: z.string().regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface ReceiverLoginFormProps {
  onClose: () => void;
}

export default function ReceiverLoginForm({ onClose }: ReceiverLoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { login } = useReceiverAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: '',
      password: ''
    }
  });

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login-receiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const result = await response.json();
      
      if (result.success) {
        login(result.token);
        setSuccess(true);
        
        // Close modal after success
        setTimeout(() => {
          onClose();
          toast.success('Successfully logged in!');
        }, 1500);
      } else {
        throw new Error(result.error || 'Login failed');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Welcome Back!</h3>
        <p className="text-muted-foreground">
          You're now logged in and can access your account.
        </p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Phone className="h-5 w-5" />
          Recipient Login
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your phone number and password to access your account
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone_number"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10"
                {...form.register('phone_number')}
              />
            </div>
            {form.formState.errors.phone_number && (
              <p className="text-sm text-red-600">
                {form.formState.errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                {...form.register('password')}
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center pt-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Don't have login credentials?</strong>
              </p>
              <p>
                Your login credentials will be provided via email/SMS after your application is approved by our admin team.
              </p>
              <p>
                If you've been approved but haven't received your credentials, please contact our support team.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
