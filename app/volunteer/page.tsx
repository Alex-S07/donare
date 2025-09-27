'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  Clock, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Calendar,
  MapPin,
  Target,
  Lightbulb,
  Shield,
  Globe
} from 'lucide-react';
import Link from 'next/link';

const volunteerOpportunities = [
  {
    id: 1,
    title: 'Donation Sorting & Distribution',
    description: 'Help sort and organize donated items for efficient distribution to those in need.',
    category: 'Logistics',
    timeCommitment: '4-6 hours/week',
    location: 'Various locations',
    skills: ['Organization', 'Teamwork', 'Physical activity'],
    impact: 'Directly helps families receive essential items'
  },
  {
    id: 2,
    title: 'Community Outreach',
    description: 'Connect with local communities to identify needs and spread awareness about our services.',
    category: 'Community',
    timeCommitment: '3-5 hours/week',
    location: 'Field work',
    skills: ['Communication', 'Empathy', 'Cultural sensitivity'],
    impact: 'Expands our reach to more people in need'
  },
  {
    id: 3,
    title: 'Event Coordination',
    description: 'Help organize fundraising events, donation drives, and community awareness campaigns.',
    category: 'Events',
    timeCommitment: '6-8 hours/week',
    location: 'Event venues',
    skills: ['Project management', 'Creativity', 'Leadership'],
    impact: 'Raises funds and awareness for our cause'
  },
  {
    id: 4,
    title: 'Digital Content Creation',
    description: 'Create engaging content for social media, website, and marketing materials.',
    category: 'Digital',
    timeCommitment: '2-4 hours/week',
    location: 'Remote',
    skills: ['Design', 'Writing', 'Social media'],
    impact: 'Increases online presence and donor engagement'
  },
  {
    id: 5,
    title: 'Administrative Support',
    description: 'Assist with data entry, volunteer coordination, and administrative tasks.',
    category: 'Administrative',
    timeCommitment: '3-5 hours/week',
    location: 'Office/Remote',
    skills: ['Organization', 'Attention to detail', 'Computer skills'],
    impact: 'Keeps operations running smoothly'
  },
  {
    id: 6,
    title: 'Transportation & Delivery',
    description: 'Help transport donations to recipients and coordinate delivery schedules.',
    category: 'Logistics',
    timeCommitment: '4-6 hours/week',
    location: 'Various locations',
    skills: ['Driving', 'Time management', 'Customer service'],
    impact: 'Ensures donations reach those who need them'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Volunteer for 2 years',
    content: 'Volunteering with Donare has been incredibly rewarding. I\'ve seen firsthand how our efforts directly impact families in need.',
    rating: 5,
    hours: 150
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Community Outreach Volunteer',
    content: 'The team is amazing and the work is meaningful. Every hour I spend volunteering makes a real difference in someone\'s life.',
    rating: 5,
    hours: 200
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Coordinator',
    content: 'I love organizing events that bring the community together for a great cause. The impact we create together is incredible.',
    rating: 5,
    hours: 120
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Make a Real Impact',
    description: 'See the direct results of your efforts in helping families and communities in need.'
  },
  {
    icon: Users,
    title: 'Join a Community',
    description: 'Connect with like-minded individuals who share your passion for helping others.'
  },
  {
    icon: Award,
    title: 'Gain Experience',
    description: 'Develop valuable skills and experience that can benefit your personal and professional growth.'
  },
  {
    icon: Star,
    title: 'Recognition Program',
    description: 'Earn achievements, badges, and recognition for your contributions and dedication.'
  }
];

const commitmentLevels = [
  {
    duration: '1 Month',
    description: 'Perfect for trying out volunteering or short-term commitments',
    hours: '16-24 hours total',
    benefits: ['Basic training', 'Community access', 'Impact tracking']
  },
  {
    duration: '6 Months',
    description: 'Ideal for regular volunteers who want to make a sustained impact',
    hours: '96-144 hours total',
    benefits: ['Advanced training', 'Leadership opportunities', 'Recognition program']
  },
  {
    duration: '1 Year',
    description: 'For dedicated volunteers committed to long-term community service',
    hours: '192-288 hours total',
    benefits: ['All benefits', 'Mentorship program', 'Special events access']
  },
  {
    duration: 'Flexible',
    description: 'Customize your commitment based on your availability and interests',
    hours: 'As available',
    benefits: ['Flexible scheduling', 'Project-based work', 'Skill development']
  }
];

export default function VolunteerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Logistics', 'Community', 'Events', 'Digital', 'Administrative'];
  
  const filteredOpportunities = selectedCategory === 'All' 
    ? volunteerOpportunities 
    : volunteerOpportunities.filter(opp => opp.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
            >
              <Heart className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Become a{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Volunteer
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our community of dedicated volunteers and make a meaningful difference in the lives of those who need it most. 
              Together, we can create positive change and build stronger communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/volunteer/apply">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  Apply to Volunteer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '500+', label: 'Active Volunteers', icon: Users },
              { number: '10,000+', label: 'Hours Donated', icon: Clock },
              { number: '5,000+', label: 'Families Helped', icon: Heart },
              { number: '50+', label: 'Communities Served', icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the perfect volunteer role that matches your skills, interests, and availability.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{opportunity.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="text-base">
                      {opportunity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {opportunity.timeCommitment}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="w-4 h-4 mr-2" />
                        {opportunity.impact}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Levels */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Choose Your Commitment Level
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer flexible commitment options to fit your schedule and availability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitmentLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{level.duration}</CardTitle>
                    <CardDescription className="text-base">
                      {level.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-lg font-semibold text-foreground">
                        {level.hours}
                      </div>
                      <div className="space-y-2">
                        {level.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Why Volunteer with Donare?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our community and experience the many benefits of volunteering with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              What Our Volunteers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our amazing volunteers about their experiences and the impact they've made.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.hours} hours
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of volunteers and start making a positive impact today. 
              Your time and skills can change lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/volunteer/apply">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-black hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
