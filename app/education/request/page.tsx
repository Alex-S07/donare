'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import DonationCard from '@/components/donations/donation-card';
import SectionHeader from '@/components/donations/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  Search,
  Filter,
  Heart,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { educationSection } from '@/data/dummy-donations';
import { FilterOptions, DonationItem } from '@/types/donations';
import { toast } from 'sonner';

export default function EducationRequestPage() {
  const { isAuthenticated, userType } = useAuth();
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);

  // Filter items based on active filters
  const filteredItems = useMemo(() => {
    let items = educationSection.items;

    // Search filter
    if (activeFilters.searchQuery) {
      const query = activeFilters.searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Condition filter
    if (activeFilters.condition && activeFilters.condition.length > 0) {
      items = items.filter(item => 
        activeFilters.condition!.includes(item.condition)
      );
    }

    // Target demographic filter
    if (activeFilters.targetDemographic && activeFilters.targetDemographic.length > 0) {
      items = items.filter(item => 
        item.targetDemographics.some(demo => 
          activeFilters.targetDemographic!.includes(demo)
        )
      );
    }

    // Availability filter
    if (activeFilters.availability && activeFilters.availability.length > 0) {
      items = items.filter(item => 
        activeFilters.availability!.includes(item.availability)
      );
    }

    return items;
  }, [activeFilters]);

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleRequestItem = async (itemId: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to request items');
      return;
    }

    if (userType !== 'receiver') {
      toast.error('Please switch to recipient mode to request items');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Your request has been submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonateSimilar = async (itemId: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to donate items');
      return;
    }

    if (userType !== 'sender') {
      toast.error('Please switch to donor mode to donate items');
      return;
    }

    // Redirect to donate page
    window.location.href = '/education/donate';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent my-12">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <BookOpen className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">Request Educational Materials</h1>
            </motion.div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse available educational donations and request learning resources that you or your students need. All items are completely free.
            </p>
          </div>

          {/* Authentication Required Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="pt-6 text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Authentication Required</h3>
                <p className="text-gray-600">
                  To request educational materials, you need to be logged in as a recipient. This helps us ensure fair distribution and maintain the quality of our educational resources.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Why do we need authentication?</h4>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Ensures fair distribution of educational resources</li>
                    <li>• Helps us coordinate delivery</li>
                    <li>• Maintains community trust</li>
                    <li>• Allows us to track learning impact</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/login">
                      <Heart className="h-5 w-5 mr-2" />
                      Sign Up to Request
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/education/donate">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Donate Educational Materials Instead
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Available Educational Materials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {educationSection.items.slice(0, 6).map((item) => (
                <DonationCard
                  key={item.id}
                  item={item}
                  onRequestItem={handleRequestItem}
                  onDonateSimilar={handleDonateSimilar}
                  isAuthenticated={false}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Sign up to see all available educational materials and request what you need
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/auth/login">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (userType !== 'receiver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent my-12">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <BookOpen className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">Request Educational Materials</h1>
            </motion.div>
          </div>

          {/* Wrong User Type Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardContent className="pt-6 text-center space-y-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Switch to Recipient Mode</h3>
                <p className="text-gray-600">
                  You're currently logged in as a donor. To request educational materials, you need to switch to recipient mode or create a recipient account.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/login">
                      <Heart className="h-5 w-5 mr-2" />
                      Switch to Recipient
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/education/donate">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Donate Instead
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/3 to-transparent my-12">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <BookOpen className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">Request Educational Materials</h1>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse available educational donations and request learning resources that you or your students need. All items are completely free.
          </p>
        </div>

        {/* Section Header with Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionHeader
            section={educationSection}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          {filteredItems.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find more educational materials.
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {filteredItems.length} of {educationSection.items.length} educational items
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Clock className="h-3 w-3 mr-1" />
                    {educationSection.availableItems} Available
                  </Badge>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {educationSection.highDemandItems} High Demand
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <DonationCard
                    key={item.id}
                    item={item}
                    onRequestItem={handleRequestItem}
                    onDonateSimilar={handleDonateSimilar}
                    isAuthenticated={isAuthenticated}
                    userType={userType}
                    showActions={true}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't see what you need?
              </h3>
              <p className="text-gray-600 mb-6">
                If you can't find the educational materials you need, consider donating similar items to help other students in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/education/donate">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Donate Educational Materials
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/donations">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Browse All Categories
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
