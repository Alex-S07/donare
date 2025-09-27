'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Heart, 
  Clock, 
  Award, 
  Target, 
  Calendar,
  Plus,
  TrendingUp,
  Star,
  Activity,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  Trophy,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { VolunteerDashboardData, VolunteerActivity } from '@/types/database';

export default function VolunteerDashboardPage() {
  const [dashboardData, setDashboardData] = useState<VolunteerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  
  // Activity form state
  const [activityForm, setActivityForm] = useState({
    activity_type: '',
    activity_description: '',
    activity_date: new Date().toISOString().split('T')[0],
    hours_worked: '',
    location: '',
    donation_category: '',
    beneficiaries_served: '',
    impact_description: ''
  });

  // Testimonial form state
  const [testimonialForm, setTestimonialForm] = useState({
    testimonial_text: '',
    rating: 5
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Implement actual API call to fetch volunteer dashboard data
      // For now, using mock data
      const mockData: VolunteerDashboardData = {
        volunteer: {
          id: '1',
          full_name: 'John Doe',
          age: 28,
          gender: 'male',
          phone_number: '+1234567890',
          email: 'john@example.com',
          current_occupation: 'Software Engineer',
          work_experience: '5 years in tech',
          educational_background: 'Computer Science Degree',
          commitment_duration: '6_months',
          preferred_activities: ['Donation Sorting', 'Community Outreach'],
          availability_schedule: {},
          relevant_skills: ['Communication', 'Leadership'],
          areas_of_interest: ['Education', 'Community Development'],
          previous_volunteer_experience: 'Volunteered at local food bank',
          emergency_contact_name: 'Jane Doe',
          emergency_contact_relationship: 'Spouse',
          emergency_contact_phone: '+1234567891',
          motivation_statement: 'I want to help make a difference in my community',
          certifications: ['First Aid'],
          documents: null,
          status: 'active',
          commitment_start_date: '2024-01-01',
          commitment_end_date: '2024-07-01',
          renewal_count: 0,
          submitted_at: '2023-12-15T10:00:00Z',
          reviewed_at: '2023-12-20T10:00:00Z',
          reviewed_by_admin_id: 1,
          approval_reason: 'Great application',
          rejection_reason: null,
          total_hours_volunteered: 45,
          last_activity_at: '2024-01-15T10:00:00Z',
          performance_rating: 4.8,
          created_at: '2023-12-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        recent_activities: [
          {
            id: '1',
            volunteer_id: '1',
            activity_type: 'Donation Sorting',
            activity_description: 'Sorted and organized clothing donations',
            activity_date: '2024-01-15',
            hours_worked: 4,
            location: 'Community Center',
            donation_category: 'Clothes',
            beneficiaries_served: 25,
            impact_description: 'Helped organize donations for 25 families',
            reviewed_by_admin_id: 1,
            review_notes: 'Great work!',
            performance_rating: 5,
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            volunteer_id: '1',
            activity_type: 'Community Outreach',
            activity_description: 'Visited local schools to promote volunteer opportunities',
            activity_date: '2024-01-10',
            hours_worked: 6,
            location: 'Local Schools',
            donation_category: null,
            beneficiaries_served: 100,
            impact_description: 'Reached 100 students about volunteer opportunities',
            reviewed_by_admin_id: 1,
            review_notes: 'Excellent outreach work',
            performance_rating: 4.5,
            created_at: '2024-01-10T10:00:00Z',
            updated_at: '2024-01-10T10:00:00Z'
          }
        ],
        achievements: [
          {
            id: '1',
            volunteer_id: '1',
            achievement_type: 'hours_milestone',
            achievement_title: '50 Hours Volunteer',
            achievement_description: 'Completed 50 hours of volunteer work',
            criteria_met: { hours: 50 },
            awarded_at: '2024-01-15T10:00:00Z',
            awarded_by_admin_id: 1,
            badge_url: '/badges/50-hours.png',
            created_at: '2024-01-15T10:00:00Z'
          }
        ],
        total_hours: 45,
        commitment_progress: {
          start_date: '2024-01-01',
          end_date: '2024-07-01',
          days_remaining: 120,
          percentage_complete: 33
        },
        upcoming_opportunities: [
          {
            id: '1',
            title: 'Food Drive Event',
            date: '2024-02-01',
            location: 'City Park',
            hours: 4,
            description: 'Help organize and run a community food drive'
          }
        ],
        testimonials: []
      };

      setDashboardData(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleActivitySubmit = async () => {
    try {
      // TODO: Implement actual API call to submit activity
      console.log('Submitting activity:', activityForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Activity submitted successfully!');
      setIsActivityModalOpen(false);
      
      // Reset form
      setActivityForm({
        activity_type: '',
        activity_description: '',
        activity_date: new Date().toISOString().split('T')[0],
        hours_worked: '',
        location: '',
        donation_category: '',
        beneficiaries_served: '',
        impact_description: ''
      });
      
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error('Error submitting activity:', error);
      toast.error('Failed to submit activity');
    }
  };

  const handleTestimonialSubmit = async () => {
    try {
      // TODO: Implement actual API call to submit testimonial
      console.log('Submitting testimonial:', testimonialForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Testimonial submitted successfully!');
      setIsTestimonialModalOpen(false);
      
      // Reset form
      setTestimonialForm({
        testimonial_text: '',
        rating: 5
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit testimonial');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCommitmentDuration = (duration: string) => {
    const durationMap = {
      '1_month': '1 Month',
      '6_months': '6 Months',
      '1_year': '1 Year',
      'flexible': 'Flexible'
    };
    return durationMap[duration as keyof typeof durationMap] || duration;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Unable to Load Dashboard</h2>
          <p className="text-muted-foreground">Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  const { volunteer, recent_activities, achievements, total_hours, commitment_progress, upcoming_opportunities } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                Welcome back, {volunteer.full_name}!
              </h1>
              <p className="text-xl text-muted-foreground">
                Here's your volunteer dashboard and progress
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Log Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Log Volunteer Activity</DialogTitle>
                    <DialogDescription>
                      Record your volunteer work and impact
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="activity_type">Activity Type</Label>
                        <Select value={activityForm.activity_type} onValueChange={(value) => setActivityForm(prev => ({ ...prev, activity_type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="donation_sorting">Donation Sorting</SelectItem>
                            <SelectItem value="community_outreach">Community Outreach</SelectItem>
                            <SelectItem value="event_coordination">Event Coordination</SelectItem>
                            <SelectItem value="administrative">Administrative Support</SelectItem>
                            <SelectItem value="transportation">Transportation & Delivery</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="activity_date">Date</Label>
                        <Input
                          id="activity_date"
                          type="date"
                          value={activityForm.activity_date}
                          onChange={(e) => setActivityForm(prev => ({ ...prev, activity_date: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="activity_description">Description</Label>
                      <Textarea
                        id="activity_description"
                        value={activityForm.activity_description}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, activity_description: e.target.value }))}
                        placeholder="Describe what you did during this volunteer activity"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hours_worked">Hours Worked</Label>
                        <Input
                          id="hours_worked"
                          type="number"
                          step="0.5"
                          value={activityForm.hours_worked}
                          onChange={(e) => setActivityForm(prev => ({ ...prev, hours_worked: e.target.value }))}
                          placeholder="e.g., 4.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={activityForm.location}
                          onChange={(e) => setActivityForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Where did you volunteer?"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donation_category">Donation Category (if applicable)</Label>
                        <Select value={activityForm.donation_category} onValueChange={(value) => setActivityForm(prev => ({ ...prev, donation_category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothes">Clothes</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="household">Household</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="money">Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="beneficiaries_served">Beneficiaries Served</Label>
                        <Input
                          id="beneficiaries_served"
                          type="number"
                          value={activityForm.beneficiaries_served}
                          onChange={(e) => setActivityForm(prev => ({ ...prev, beneficiaries_served: e.target.value }))}
                          placeholder="Number of people helped"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="impact_description">Impact Description</Label>
                      <Textarea
                        id="impact_description"
                        value={activityForm.impact_description}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, impact_description: e.target.value }))}
                        placeholder="Describe the impact of your volunteer work"
                        rows={2}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsActivityModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleActivitySubmit}>
                      Submit Activity
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isTestimonialModalOpen} onOpenChange={setIsTestimonialModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Share Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Experience</DialogTitle>
                    <DialogDescription>
                      Help others learn about volunteering with Donare
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Select value={testimonialForm.rating.toString()} onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars - Excellent</SelectItem>
                          <SelectItem value="4">4 Stars - Very Good</SelectItem>
                          <SelectItem value="3">3 Stars - Good</SelectItem>
                          <SelectItem value="2">2 Stars - Fair</SelectItem>
                          <SelectItem value="1">1 Star - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="testimonial_text">Your Experience</Label>
                      <Textarea
                        id="testimonial_text"
                        value={testimonialForm.testimonial_text}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, testimonial_text: e.target.value }))}
                        placeholder="Share your volunteer experience with Donare..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsTestimonialModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleTestimonialSubmit}>
                      Submit Testimonial
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold text-foreground">{total_hours}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activities</p>
                  <p className="text-2xl font-bold text-foreground">{recent_activities.length}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold text-foreground">{achievements.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{volunteer.performance_rating || 'N/A'}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Commitment Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Commitment Progress
                  </CardTitle>
                  <CardDescription>
                    {formatCommitmentDuration(volunteer.commitment_duration)} commitment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{commitment_progress.percentage_complete}%</span>
                    </div>
                    <Progress value={commitment_progress.percentage_complete} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-medium">{formatDate(commitment_progress.start_date)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">{formatDate(commitment_progress.end_date)}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {commitment_progress.days_remaining} days remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>
                    Your latest volunteer activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recent_activities.map((activity, index) => (
                      <div key={activity.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{activity.activity_type}</h4>
                            <p className="text-sm text-muted-foreground">{activity.activity_description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{activity.hours_worked}h</p>
                            <p className="text-xs text-muted-foreground">{formatDate(activity.activity_date)}</p>
                          </div>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </div>
                        )}
                        {activity.impact_description && (
                          <p className="text-sm text-muted-foreground">{activity.impact_description}</p>
                        )}
                        {activity.performance_rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{activity.performance_rating}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Your volunteer accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{achievement.achievement_title}</h4>
                          <p className="text-xs text-muted-foreground">{formatDate(achievement.awarded_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Opportunities
                  </CardTitle>
                  <CardDescription>
                    Volunteer opportunities you might be interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcoming_opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-1">{opportunity.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3" />
                          {formatDate(opportunity.date)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Clock className="h-3 w-3" />
                          {opportunity.hours} hours
                        </div>
                        <p className="text-xs text-muted-foreground">{opportunity.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Volunteer Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Commitment</p>
                      <p className="text-sm">{formatCommitmentDuration(volunteer.commitment_duration)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Preferred Activities</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {volunteer.preferred_activities?.map((activity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
