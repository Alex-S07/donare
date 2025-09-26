'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Heart, Send, CheckCircle } from 'lucide-react';

const donationSchema = z.object({
  type: z.enum(['donate', 'request']),
  category: z.enum(['money', 'clothes', 'education', 'household', 'medical', 'electronics']),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please provide a complete address'),
  description: z.string().min(20, 'Please provide more details (minimum 20 characters)'),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']).optional(),
  amount: z.string().optional(),
  quantity: z.string().optional(),
  condition: z.enum(['new', 'excellent', 'good', 'fair']).optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  agreeToPrivacy: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface DonationFormProps {
  type: 'donate' | 'request';
  category: 'money' | 'clothes' | 'education' | 'household' | 'medical' | 'electronics';
  onSubmit?: (data: DonationFormData) => void;
}

export default function DonationForm({ type, category, onSubmit }: DonationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      type,
      category,
      fullName: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      urgency: 'medium',
      amount: '',
      quantity: '',
      condition: 'good',
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  const handleSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(data);
      }
      
      setIsSubmitted(true);
      toast.success(
        type === 'donate' 
          ? 'Thank you for your generous donation! We will contact you soon.' 
          : 'Your request has been submitted successfully. We will review it and get back to you.'
      );
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">
              {type === 'donate' ? 'Thank You!' : 'Request Submitted!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {type === 'donate' 
                ? 'Your donation has been registered. We will contact you soon to arrange the next steps.'
                : 'We have received your request and will review it shortly. You will hear from us within 24-48 hours.'
              }
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              variant="outline"
            >
              Submit Another {type === 'donate' ? 'Donation' : 'Request'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>
              {type === 'donate' ? 'Donation Form' : 'Request Form'} - {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {type === 'request' && (
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low - Can wait</SelectItem>
                            <SelectItem value="medium">Medium - Within a month</SelectItem>
                            <SelectItem value="high">High - Within a week</SelectItem>
                            <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your complete address including city, state, and postal code" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category-specific fields */}
              {category === 'money' && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {type === 'donate' ? 'Donation Amount ($)' : 'Amount Needed ($)'}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={type === 'donate' ? 'Enter donation amount' : 'Enter amount needed'} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(category === 'clothes' || category === 'household' || category === 'electronics') && (
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity/Items</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={type === 'donate' ? 'Number of items to donate' : 'Number of items needed'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {type === 'donate' && (
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="new">New/Never Used</SelectItem>
                              <SelectItem value="excellent">Excellent Condition</SelectItem>
                              <SelectItem value="good">Good Condition</SelectItem>
                              <SelectItem value="fair">Fair Condition</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === 'donate' ? 'Description of Items' : 'Description of Need'} *
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={
                          type === 'donate' 
                            ? 'Please describe the items you want to donate in detail...' 
                            : 'Please describe your situation and specific needs...'
                        }
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Privacy */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToPrivacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the privacy policy *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Submit {type === 'donate' ? 'Donation' : 'Request'}</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
