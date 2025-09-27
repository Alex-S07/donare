'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ArrowUp,
  Grid3X3,
  List,
  Loader2,
  Package,
  Heart,
  Users,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import DonationCard from './donation-card';
import SectionHeader from './section-header';
import { dummySections } from '@/data/dummy-donations';
import { 
  DonationCategory, 
  DonationItem, 
  FilterOptions, 
  DonationShowcaseState 
} from '@/types/donations';
import { cn } from '@/lib/utils';

export default function DonationShowcase() {
  const { isAuthenticated, userType } = useAuth();
  const [state, setState] = useState<DonationShowcaseState>({
    activeSection: 'clothes',
    searchState: {
      query: '',
      filters: {},
      sortBy: 'newest',
      viewMode: 'grid'
    },
    loading: false,
    showRequestModal: false,
    showDonateModal: false
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = dummySections.find(section => section.id === state.activeSection);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    if (!currentSection) return [];

    let items = [...currentSection.items];
    const { filters, query, sortBy } = state.searchState;

    // Apply search query
    if (query) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Apply condition filter
    if (filters.condition?.length) {
      items = items.filter(item => filters.condition!.includes(item.condition));
    }

    // Apply demographic filter
    if (filters.targetDemographic?.length) {
      items = items.filter(item =>
        item.targetDemographics.some(demo => filters.targetDemographic!.includes(demo))
      );
    }

    // Apply availability filter
    if (filters.availability?.length) {
      items = items.filter(item => filters.availability!.includes(item.availability));
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        // Simulate newest first (urgent items first, then by ID)
        items.sort((a, b) => {
          if (a.isUrgent && !b.isUrgent) return -1;
          if (!a.isUrgent && b.isUrgent) return 1;
          return b.id.localeCompare(a.id);
        });
        break;
      case 'oldest':
        items.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'high_demand':
        items.sort((a, b) => {
          const demandOrder = { 'High Demand': 0, 'Recently Requested': 1, 'Limited Stock': 2, 'Available': 3 };
          return demandOrder[a.availability] - demandOrder[b.availability];
        });
        break;
      case 'alphabetical':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return items;
  }, [currentSection, state.searchState]);

  const handleSectionChange = (sectionId: DonationCategory) => {
    setState(prev => ({
      ...prev,
      activeSection: sectionId,
      searchState: { ...prev.searchState, query: '', filters: {} }
    }));

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setState(prev => ({
      ...prev,
      searchState: { ...prev.searchState, filters }
    }));
  };

  const handleClearFilters = () => {
    setState(prev => ({
      ...prev,
      searchState: { ...prev.searchState, filters: {}, query: '' }
    }));
  };

  const handleRequestItem = async (itemId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign up as a receiver to request items');
      return;
    }

    if (userType !== 'receiver') {
      toast.error('Only approved receivers can request items');
      return;
    }

    // Simulate API call
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const item = filteredItems.find(item => item.id === itemId);
      toast.success(`Request submitted for "${item?.title}". We'll contact you soon!`);
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDonateSimilar = async (itemId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign up as a donor to contribute items');
      return;
    }

    if (userType !== 'sender') {
      toast.error('Only verified donors can contribute items');
      return;
    }

    // Simulate opening donation form
    const item = filteredItems.find(item => item.id === itemId);
    toast.success(`Opening donation form for items similar to "${item?.title}"`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentSection) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Section Navigation */}
        <div className="mb-8">
          <Tabs value={state.activeSection} onValueChange={handleSectionChange}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {dummySections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span>{section.icon}</span>
                  <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {dummySections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="space-y-8">
                {/* Section Header with Filters */}
                <SectionHeader
                  section={section}
                  activeFilters={state.searchState.filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />

                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Found
                    </h3>
                    {filteredItems.length !== section.totalItems && (
                      <Badge variant="outline" className="text-sm">
                        Filtered from {section.totalItems} total
                      </Badge>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={state.searchState.viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setState(prev => ({
                        ...prev,
                        searchState: { ...prev.searchState, viewMode: 'grid' }
                      }))}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={state.searchState.viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setState(prev => ({
                        ...prev,
                        searchState: { ...prev.searchState, viewMode: 'list' }
                      }))}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Items Grid */}
                {filteredItems.length > 0 ? (
                  <motion.div
                    layout
                    className={cn(
                      "grid gap-6",
                      state.searchState.viewMode === 'grid'
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1 max-w-4xl mx-auto"
                    )}
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DonationCard
                            item={item}
                            onRequestItem={handleRequestItem}
                            onDonateSimilar={handleDonateSimilar}
                            isAuthenticated={isAuthenticated}
                            userType={userType}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <Card className="p-12 text-center">
                    <CardContent>
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No items found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters or search terms to find more items.
                      </p>
                      <Button onClick={handleClearFilters} variant="outline">
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Impact Statistics */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Making a Difference Together
              </h3>
              <p className="text-gray-600">
                Join our community of generous donors and grateful receivers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Items Donated</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1,200+</div>
                <div className="text-sm text-gray-600">Families Helped</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
