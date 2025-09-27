'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Indian states
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

// Form schema
const individualFormSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  phone_number: z.string().regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  
  // Address
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Invalid pincode'),
  
  // Personal details
  annual_income: z.number().min(0, 'Annual income must be a positive number'),
  family_size: z.number().min(1, 'Family size must be at least 1'),
  occupation: z.string().optional()
});

type IndividualFormData = z.infer<typeof individualFormSchema>;

interface IndividualRegistrationFormProps {
  onSubmit: (result: { success: boolean; message: string; receiverId?: string }) => void;
}

export default function IndividualRegistrationForm({ onSubmit }: IndividualRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const form = useForm<IndividualFormData>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: {
      annual_income: 0,
      family_size: 1
    }
  });

  // Handle file upload
  const handleFileUpload = (documentType: string, file: File) => {
    if (file.size > 100 * 1024) { // 100KB limit
      toast.error('File size must be less than 100KB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
    toast.success(`${documentType.replace('_', ' ')} uploaded successfully`);
  };

  // Handle form submission
  const handleSubmit = async (data: IndividualFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Check required documents
      const requiredDocs = ['aadhaar_card', 'ration_card', 'ews_certificate'];
      const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
      
      if (missingDocs.length > 0) {
        setError(`Please upload all required documents: ${missingDocs.map(doc => doc.replace('_', ' ')).join(', ')}`);
        setLoading(false);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      
      // Add form fields
      const individualData = {
        full_name: data.full_name,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode
        },
        phone_number: data.phone_number,
        email: data.email || null,
        annual_income: data.annual_income,
        family_size: data.family_size,
        occupation: data.occupation || null
      };

      formData.append('receiver_type', 'individual');
      formData.append('phone_number', data.phone_number);
      formData.append('email', data.email || '');
      formData.append('form_data', JSON.stringify(individualData));

      // Add files
      Object.entries(uploadedFiles).forEach(([key, file]) => {
        formData.append(`documents[${key}]`, file);
      });

      // Submit to API
      const response = await fetch('/api/auth/register-receiver', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const result = await response.json();
      onSubmit({
        success: true,
        message: 'We will verify your details and contact you soon!',
        receiverId: result.receiver_id
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      onSubmit({
        success: false,
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                {...form.register('full_name')}
                placeholder="Enter your full name"
              />
              {form.formState.errors.full_name && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number *</Label>
              <Input
                id="phone_number"
                {...form.register('phone_number')}
                placeholder="Enter your phone number"
              />
              {form.formState.errors.phone_number && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="Enter email address (optional)"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                {...form.register('occupation')}
                placeholder="Enter your occupation (optional)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Complete Address *</Label>
            <Textarea
              id="street"
              {...form.register('street')}
              placeholder="Enter your complete address"
              rows={3}
            />
            {form.formState.errors.street && (
              <p className="text-sm text-red-600">
                {form.formState.errors.street.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...form.register('city')}
                placeholder="Enter city"
              />
              {form.formState.errors.city && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select onValueChange={(value) => form.setValue('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.state && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.state.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                {...form.register('pincode')}
                placeholder="Enter pincode"
                maxLength={6}
              />
              {form.formState.errors.pincode && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.pincode.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family & Income Details */}
      <Card>
        <CardHeader>
          <CardTitle>Family & Income Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annual_income">Annual Income (₹) *</Label>
              <Input
                id="annual_income"
                type="number"
                {...form.register('annual_income', { valueAsNumber: true })}
                placeholder="Enter annual income"
                min="0"
              />
              {form.formState.errors.annual_income && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.annual_income.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="family_size">Family Size *</Label>
              <Input
                id="family_size"
                type="number"
                {...form.register('family_size', { valueAsNumber: true })}
                placeholder="Number of family members"
                min="1"
              />
              {form.formState.errors.family_size && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.family_size.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload clear images (max 100KB each)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'aadhaar_card', label: 'Aadhaar Card' },
            { key: 'ration_card', label: 'Ration Card' },
            { key: 'ews_certificate', label: 'EWS Certificate' }
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label>{label} *</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(key, file);
                  }}
                  className="flex-1"
                />
                {uploadedFiles[key] && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Uploaded</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="min-w-32">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
