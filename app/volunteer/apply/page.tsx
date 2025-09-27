'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  FileText, 
  User, 
  Briefcase, 
  Calendar,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Form validation schemas
const personalInfoSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  age: z.number().min(16, 'You must be at least 16 years old').max(100, 'Please enter a valid age'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).refine((val) => val !== undefined, {
    message: 'Please select your gender'
  }),
  phone_number: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address')
});

const professionalDetailsSchema = z.object({
  current_occupation: z.string().optional(),
  work_experience: z.string().optional(),
  educational_background: z.string().optional()
});

const volunteerPreferencesSchema = z.object({
  commitment_duration: z.enum(['1_month', '6_months', '1_year', 'flexible']).refine((val) => val !== undefined, {
    message: 'Please select your commitment duration'
  }),
  preferred_activities: z.array(z.string()).min(1, 'Please select at least one preferred activity'),
  availability_schedule: z.record(z.string(), z.object({
    available: z.boolean(),
    start_time: z.string().optional(),
    end_time: z.string().optional()
  }))
});

const skillsInterestsSchema = z.object({
  relevant_skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  areas_of_interest: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  previous_volunteer_experience: z.string().optional(),
  certifications: z.array(z.string()).optional()
});

const emergencyContactSchema = z.object({
  emergency_contact_name: z.string().min(2, 'Emergency contact name is required'),
  emergency_contact_relationship: z.string().min(2, 'Relationship is required'),
  emergency_contact_phone: z.string().min(10, 'Please enter a valid phone number')
});

const backgroundInfoSchema = z.object({
  motivation_statement: z.string().min(50, 'Please provide a detailed motivation statement (at least 50 characters)')
});

const fullSchema = personalInfoSchema
  .merge(professionalDetailsSchema)
  .merge(volunteerPreferencesSchema)
  .merge(skillsInterestsSchema)
  .merge(emergencyContactSchema)
  .merge(backgroundInfoSchema);

type FormData = z.infer<typeof fullSchema>;

const steps = [
  { id: 1, title: 'Personal Information', description: 'Basic details about yourself', icon: User },
  { id: 2, title: 'Professional Details', description: 'Your work and education background', icon: Briefcase },
  { id: 3, title: 'Volunteer Preferences', description: 'Your availability and interests', icon: Calendar },
  { id: 4, title: 'Skills & Interests', description: 'Your relevant skills and areas of interest', icon: Award },
  { id: 5, title: 'Emergency Contact', description: 'Emergency contact information', icon: Phone },
  { id: 6, title: 'Background & Motivation', description: 'Why you want to volunteer', icon: Heart }
];

const volunteerActivities = [
  'Donation Sorting & Distribution',
  'Community Outreach',
  'Event Coordination',
  'Digital Content Creation',
  'Administrative Support',
  'Transportation & Delivery',
  'Fundraising',
  'Mentoring',
  'Translation Services',
  'Technical Support'
];

const skillsOptions = [
  'Communication',
  'Leadership',
  'Organization',
  'Teamwork',
  'Problem Solving',
  'Creativity',
  'Technical Skills',
  'Language Skills',
  'Customer Service',
  'Project Management',
  'Teaching/Training',
  'Event Planning',
  'Social Media',
  'Photography/Videography',
  'Driving',
  'Physical Labor'
];

const interestAreas = [
  'Children & Youth',
  'Elderly Care',
  'Education',
  'Healthcare',
  'Environment',
  'Animal Welfare',
  'Community Development',
  'Disaster Relief',
  'Technology',
  'Arts & Culture',
  'Sports & Recreation',
  'Mental Health',
  'Poverty Alleviation',
  'Human Rights',
  'International Development'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function VolunteerApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      preferred_activities: [],
      relevant_skills: [],
      areas_of_interest: [],
      certifications: [],
      availability_schedule: daysOfWeek.reduce((acc, day) => {
        acc[day] = { available: false };
        return acc;
      }, {} as any)
    }
  });

  const { handleSubmit, trigger, formState: { errors } } = form;

  const progress = (currentStep / steps.length) * 100;

  const nextStep = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = await trigger(['full_name', 'age', 'gender', 'phone_number', 'email']);
        break;
      case 2:
        isValid = await trigger(['current_occupation', 'work_experience', 'educational_background']);
        break;
      case 3:
        isValid = await trigger(['commitment_duration', 'preferred_activities', 'availability_schedule']);
        break;
      case 4:
        isValid = await trigger(['relevant_skills', 'areas_of_interest', 'previous_volunteer_experience', 'certifications']);
        break;
      case 5:
        isValid = await trigger(['emergency_contact_name', 'emergency_contact_relationship', 'emergency_contact_phone']);
        break;
      case 6:
        isValid = await trigger(['motivation_statement']);
        break;
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would submit the form data to your API
      console.log('Form data:', data);
      console.log('Uploaded files:', uploadedFiles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Application submitted successfully! We will review your application and get back to you soon.');
      
      // Reset form or redirect
      // router.push('/volunteer/application-success');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  {...form.register('full_name')}
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="text-sm text-red-500 mt-1">{errors.full_name.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  {...form.register('age', { valueAsNumber: true })}
                  placeholder="Enter your age"
                />
                {errors.age && (
                  <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select onValueChange={(value) => form.setValue('gender', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Input
                  id="phone_number"
                  {...form.register('phone_number')}
                  placeholder="Enter your phone number"
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone_number.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="current_occupation">Current Occupation</Label>
              <Input
                id="current_occupation"
                {...form.register('current_occupation')}
                placeholder="e.g., Software Engineer, Teacher, Student"
              />
            </div>

            <div>
              <Label htmlFor="work_experience">Work Experience</Label>
              <Textarea
                id="work_experience"
                {...form.register('work_experience')}
                placeholder="Describe your work experience and relevant background"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="educational_background">Educational Background</Label>
              <Textarea
                id="educational_background"
                {...form.register('educational_background')}
                placeholder="Describe your educational background and qualifications"
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="commitment_duration">Commitment Duration *</Label>
              <Select onValueChange={(value) => form.setValue('commitment_duration', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your commitment duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="1_year">1 Year</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              {errors.commitment_duration && (
                <p className="text-sm text-red-500 mt-1">{errors.commitment_duration.message}</p>
              )}
            </div>

            <div>
              <Label>Preferred Volunteer Activities *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {volunteerActivities.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox
                      id={activity}
                      checked={form.watch('preferred_activities')?.includes(activity)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues('preferred_activities') || [];
                        if (checked) {
                          form.setValue('preferred_activities', [...current, activity]);
                        } else {
                          form.setValue('preferred_activities', current.filter(a => a !== activity));
                        }
                      }}
                    />
                    <Label htmlFor={activity} className="text-sm">{activity}</Label>
                  </div>
                ))}
              </div>
              {errors.preferred_activities && (
                <p className="text-sm text-red-500 mt-1">{errors.preferred_activities.message}</p>
              )}
            </div>

            <div>
              <Label>Availability Schedule</Label>
              <div className="space-y-3 mt-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium">{day}</div>
                    <Checkbox
                      checked={form.watch(`availability_schedule.${day}.available`)}
                      onCheckedChange={(checked) => {
                        const currentSchedule = form.getValues('availability_schedule') || {};
                        form.setValue(`availability_schedule.${day}.available`, checked as boolean);
                      }}
                    />
                    {form.watch(`availability_schedule.${day}.available`) && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          placeholder="Start time"
                          className="w-32"
                          onChange={(e) => form.setValue(`availability_schedule.${day}.start_time`, e.target.value)}
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          placeholder="End time"
                          className="w-32"
                          onChange={(e) => form.setValue(`availability_schedule.${day}.end_time`, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Relevant Skills *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {skillsOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={form.watch('relevant_skills')?.includes(skill)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues('relevant_skills') || [];
                        if (checked) {
                          form.setValue('relevant_skills', [...current, skill]);
                        } else {
                          form.setValue('relevant_skills', current.filter(s => s !== skill));
                        }
                      }}
                    />
                    <Label htmlFor={skill} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
              {errors.relevant_skills && (
                <p className="text-sm text-red-500 mt-1">{errors.relevant_skills.message}</p>
              )}
            </div>

            <div>
              <Label>Areas of Interest *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {interestAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={form.watch('areas_of_interest')?.includes(area)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues('areas_of_interest') || [];
                        if (checked) {
                          form.setValue('areas_of_interest', [...current, area]);
                        } else {
                          form.setValue('areas_of_interest', current.filter(a => a !== area));
                        }
                      }}
                    />
                    <Label htmlFor={area} className="text-sm">{area}</Label>
                  </div>
                ))}
              </div>
              {errors.areas_of_interest && (
                <p className="text-sm text-red-500 mt-1">{errors.areas_of_interest.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="previous_volunteer_experience">Previous Volunteer Experience</Label>
              <Textarea
                id="previous_volunteer_experience"
                {...form.register('previous_volunteer_experience')}
                placeholder="Describe any previous volunteer experience you have"
                rows={4}
              />
            </div>

            <div>
              <Label>Certifications</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Add certification (press Enter to add)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        const current = form.getValues('certifications') || [];
                        form.setValue('certifications', [...current, value]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {form.watch('certifications')?.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {cert}
                      <button
                        type="button"
                        onClick={() => {
                          const current = form.getValues('certifications') || [];
                          form.setValue('certifications', current.filter((_, i) => i !== index));
                        }}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="emergency_contact_name">Emergency Contact Name *</Label>
              <Input
                id="emergency_contact_name"
                {...form.register('emergency_contact_name')}
                placeholder="Enter emergency contact's full name"
              />
              {errors.emergency_contact_name && (
                <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="emergency_contact_relationship">Relationship *</Label>
              <Input
                id="emergency_contact_relationship"
                {...form.register('emergency_contact_relationship')}
                placeholder="e.g., Parent, Spouse, Sibling, Friend"
              />
              {errors.emergency_contact_relationship && (
                <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_relationship.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="emergency_contact_phone">Emergency Contact Phone *</Label>
              <Input
                id="emergency_contact_phone"
                {...form.register('emergency_contact_phone')}
                placeholder="Enter emergency contact's phone number"
              />
              {errors.emergency_contact_phone && (
                <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_phone.message}</p>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="motivation_statement">Motivation Statement *</Label>
              <Textarea
                id="motivation_statement"
                {...form.register('motivation_statement')}
                placeholder="Please tell us why you want to volunteer with Donare and what you hope to contribute to our mission. (Minimum 50 characters)"
                rows={6}
              />
              {errors.motivation_statement && (
                <p className="text-sm text-red-500 mt-1">{errors.motivation_statement.message}</p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                {form.watch('motivation_statement')?.length || 0} characters
              </p>
            </div>

            <div>
              <Label>Supporting Documents (Optional)</Label>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume" className="text-sm">Resume/CV</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('resume', file);
                      }}
                    />
                    {uploadedFiles.resume && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {uploadedFiles.resume.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="id_proof" className="text-sm">ID Proof</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="id_proof"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('id_proof', file);
                      }}
                    />
                    {uploadedFiles.id_proof && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {uploadedFiles.id_proof.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="certificates" className="text-sm">Certificates</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="certificates"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => handleFileUpload(`certificate_${Date.now()}`, file));
                      }}
                    />
                    {Object.keys(uploadedFiles).filter(key => key.startsWith('certificate')).length > 0 && (
                      <Badge variant="secondary">
                        {Object.keys(uploadedFiles).filter(key => key.startsWith('certificate')).length} files
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Volunteer Application
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our community and make a difference in people's lives
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Steps Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 text-primary" })}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between mt-8"
          >
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Check className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </motion.div>
        </form>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Need Help?</h3>
              <p className="text-sm text-blue-700">
                If you have any questions about the application process or need assistance, 
                please contact us at{' '}
                <a href="mailto:volunteer@donare.org" className="underline">
                  volunteer@donare.org
                </a>{' '}
                or call us at{' '}
                <a href="tel:+1234567890" className="underline">
                  +1 (234) 567-890
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
