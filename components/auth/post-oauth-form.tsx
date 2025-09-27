'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Phone, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const postOAuthSchema = z.object({
  phone_number: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  date_of_birth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 120;
    }, 'You must be at least 18 years old'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be at most 200 characters'),
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters'),
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be at most 50 characters'),
  country: z.string()
    .min(2, 'Country must be at least 2 characters')
    .max(50, 'Country must be at most 50 characters'),
  pincode: z.string()
    .min(5, 'Pincode must be at least 5 characters')
    .max(10, 'Pincode must be at most 10 characters')
    .regex(/^[0-9]+$/, 'Pincode must contain only numbers')
});

type PostOAuthFormData = z.infer<typeof postOAuthSchema>;

interface PostOAuthFormProps {
  userInfo: {
    name: string;
    email: string;
    picture?: string;
  };
  onComplete: (data: PostOAuthFormData) => void;
  onSkip: () => void;
}

export default function PostOAuthForm({ userInfo, onComplete, onSkip }: PostOAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PostOAuthFormData>({
    resolver: zodResolver(postOAuthSchema),
    defaultValues: {
      phone_number: '',
      date_of_birth: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    }
  });

  const handleSubmit = async (data: PostOAuthFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate the data
      const validatedData = postOAuthSchema.parse(data);
      onComplete(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {userInfo.picture ? (
                <img
                  src={userInfo.picture}
                  alt={userInfo.name}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Complete Your Profile
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Welcome {userInfo.name}! Please provide some additional information to complete your donor profile.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone_number" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number *</span>
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="+91 9876543210"
                    {...form.register('phone_number')}
                    className="mt-1"
                  />
                  {form.formState.errors.phone_number && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.phone_number.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="date_of_birth" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date of Birth *</span>
                  </Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    {...form.register('date_of_birth')}
                    className="mt-1"
                  />
                  {form.formState.errors.date_of_birth && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.date_of_birth.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Address *</span>
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street, Apartment 4B"
                    {...form.register('address')}
                    className="mt-1"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Mumbai"
                      {...form.register('city')}
                      className="mt-1"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Maharashtra"
                      {...form.register('state')}
                      className="mt-1"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="India"
                      {...form.register('country')}
                      className="mt-1"
                    />
                    {form.formState.errors.country && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.country.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      type="text"
                      placeholder="400001"
                      {...form.register('pincode')}
                      className="mt-1"
                    />
                    {form.formState.errors.pincode && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.pincode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSkip}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Completing...' : 'Complete Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
