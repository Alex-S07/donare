'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload, AlertCircle, Loader2 } from 'lucide-react';
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
const ngoFormSchema = z.object({
  organization_name: z.string().min(2, 'Organization name is required'),
  registration_certificate_number: z.string().min(1, 'Registration certificate number is required'),
  license_number: z.string().min(1, 'License number is required'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  fcra_number: z.string().optional(),
  contact_number: z.string().regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  
  // Bank details
  bank_account_number: z.string().min(1, 'Account number is required'),
  ifsc_code: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  bank_name: z.string().min(1, 'Bank name is required'),
  
  // Address
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Invalid pincode'),
  
  // Optional fields
  institution_code: z.string().optional(),
  license_approval_id: z.string().optional(),
  
  // Board of trustees
  board_of_trustees: z.array(z.object({
    name: z.string().min(1, 'Name is required'),
    government_id: z.string().min(1, 'Government ID is required'),
    designation: z.string().min(1, 'Designation is required')
  })).min(1, 'At least one board member is required'),
  
  // Authorized signatory
  authorized_signatory_name: z.string().min(1, 'Authorized signatory name is required'),
  authorized_signatory_id: z.string().min(1, 'Authorized signatory ID is required'),
  authorized_signatory_designation: z.string().min(1, 'Designation is required')
});

type NGOFormData = z.infer<typeof ngoFormSchema>;

interface NGORegistrationFormProps {
  onSubmit: (result: { success: boolean; message: string; receiverId?: string }) => void;
}

export default function NGORegistrationForm({ onSubmit }: NGORegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const form = useForm<NGOFormData>({
    resolver: zodResolver(ngoFormSchema),
    defaultValues: {
      board_of_trustees: [{ name: '', government_id: '', designation: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'board_of_trustees'
  });

  // Handle file upload
  const handleFileUpload = (documentType: string, file: File) => {
    if (file.size > 100 * 1024) { // 100KB limit
      toast.error('File size must be less than 100KB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, WebP, and PDF files are allowed');
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
    toast.success(`${documentType} uploaded successfully`);
  };

  // Handle form submission
  const handleSubmit = async (data: NGOFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Check required documents
      const requiredDocs = [
        'registration_certificate',
        'license_document',
        'tax_document',
        'trust_deed',
        'board_member_ids'
      ];

      const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
      if (missingDocs.length > 0) {
        setError(`Please upload all required documents: ${missingDocs.join(', ')}`);
        setLoading(false);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      
      // Add form fields
      const ngoData = {
        organization_name: data.organization_name,
        registration_certificate_number: data.registration_certificate_number,
        license_number: data.license_number,
        tax_id: data.tax_id,
        fcra_number: data.fcra_number || null,
        bank_account_details: {
          account_number: data.bank_account_number,
          ifsc_code: data.ifsc_code,
          bank_name: data.bank_name
        },
        contact_number: data.contact_number,
        email: data.email || null,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode
        },
        institution_code: data.institution_code || null,
        license_approval_id: data.license_approval_id || null,
        board_of_trustees: data.board_of_trustees,
        authorized_signatory: {
          name: data.authorized_signatory_name,
          government_id: data.authorized_signatory_id,
          designation: data.authorized_signatory_designation
        }
      };

      formData.append('receiver_type', 'ngo');
      formData.append('phone_number', data.contact_number);
      formData.append('email', data.email || '');
      formData.append('form_data', JSON.stringify(ngoData));

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
        message: 'We will contact you soon!',
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
      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization_name">Organization Name *</Label>
              <Input
                id="organization_name"
                {...form.register('organization_name')}
                placeholder="Enter organization name"
              />
              {form.formState.errors.organization_name && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.organization_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registration_certificate_number">Registration Certificate Number *</Label>
              <Input
                id="registration_certificate_number"
                {...form.register('registration_certificate_number')}
                placeholder="Enter certificate number"
              />
              {form.formState.errors.registration_certificate_number && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.registration_certificate_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="license_number">License Number *</Label>
              <Input
                id="license_number"
                {...form.register('license_number')}
                placeholder="Enter license number"
              />
              {form.formState.errors.license_number && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.license_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax_id">Tax ID/PAN *</Label>
              <Input
                id="tax_id"
                {...form.register('tax_id')}
                placeholder="Enter tax ID or PAN"
              />
              {form.formState.errors.tax_id && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.tax_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fcra_number">FCRA Registration Number</Label>
              <Input
                id="fcra_number"
                {...form.register('fcra_number')}
                placeholder="Enter FCRA number (if applicable)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_number">Contact Number *</Label>
              <Input
                id="contact_number"
                {...form.register('contact_number')}
                placeholder="Enter contact number"
              />
              {form.formState.errors.contact_number && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.contact_number.message}
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
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank_account_number">Account Number *</Label>
              <Input
                id="bank_account_number"
                {...form.register('bank_account_number')}
                placeholder="Enter account number"
              />
              {form.formState.errors.bank_account_number && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.bank_account_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc_code">IFSC Code *</Label>
              <Input
                id="ifsc_code"
                {...form.register('ifsc_code')}
                placeholder="Enter IFSC code"
                style={{ textTransform: 'uppercase' }}
              />
              {form.formState.errors.ifsc_code && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.ifsc_code.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_name">Bank Name *</Label>
              <Input
                id="bank_name"
                {...form.register('bank_name')}
                placeholder="Enter bank name"
              />
              {form.formState.errors.bank_name && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.bank_name.message}
                </p>
              )}
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
            <Label htmlFor="street">Street Address *</Label>
            <Textarea
              id="street"
              {...form.register('street')}
              placeholder="Enter complete street address"
              rows={2}
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

      {/* Board of Trustees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Board of Trustees
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '', government_id: '', designation: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Board Member {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    {...form.register(`board_of_trustees.${index}.name`)}
                    placeholder="Enter full name"
                  />
                  {form.formState.errors.board_of_trustees?.[index]?.name && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.board_of_trustees[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Government ID *</Label>
                  <Input
                    {...form.register(`board_of_trustees.${index}.government_id`)}
                    placeholder="Aadhaar/PAN/Passport"
                  />
                  {form.formState.errors.board_of_trustees?.[index]?.government_id && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.board_of_trustees[index]?.government_id?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Designation *</Label>
                  <Input
                    {...form.register(`board_of_trustees.${index}.designation`)}
                    placeholder="Chairman/Secretary/etc."
                  />
                  {form.formState.errors.board_of_trustees?.[index]?.designation && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.board_of_trustees[index]?.designation?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Authorized Signatory */}
      <Card>
        <CardHeader>
          <CardTitle>Authorized Signatory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorized_signatory_name">Name *</Label>
              <Input
                id="authorized_signatory_name"
                {...form.register('authorized_signatory_name')}
                placeholder="Enter full name"
              />
              {form.formState.errors.authorized_signatory_name && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.authorized_signatory_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorized_signatory_id">Government ID *</Label>
              <Input
                id="authorized_signatory_id"
                {...form.register('authorized_signatory_id')}
                placeholder="Aadhaar/PAN/Passport"
              />
              {form.formState.errors.authorized_signatory_id && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.authorized_signatory_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorized_signatory_designation">Designation *</Label>
              <Input
                id="authorized_signatory_designation"
                {...form.register('authorized_signatory_designation')}
                placeholder="Director/President/etc."
              />
              {form.formState.errors.authorized_signatory_designation && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.authorized_signatory_designation.message}
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
            Upload clear images or PDFs (max 100KB each)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'registration_certificate', label: 'Registration Certificate' },
            { key: 'license_document', label: 'License Document' },
            { key: 'tax_document', label: 'Tax ID/PAN Document' },
            { key: 'trust_deed', label: 'Trust Deed/Society Constitution' },
            { key: 'board_member_ids', label: 'Board Members ID Proofs' }
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label>{label} *</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*,application/pdf"
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
