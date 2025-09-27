'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Clock,
  Users,
  Package,
  AlertCircle
} from 'lucide-react';
import { SectionHeaderProps, FilterOptions } from '@/types/donations';
import { ITEM_CONDITIONS, TARGET_DEMOGRAPHICS, AVAILABILITY_STATUSES } from '@/types/donations';
import { cn } from '@/lib/utils';

export default function SectionHeader({
  section,
  activeFilters,
  onFilterChange,
  onClearFilters
}: SectionHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(activeFilters.searchQuery || '');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange({ ...activeFilters, searchQuery: value });
  };

  const handleConditionFilter = (condition: string) => {
    const currentConditions = activeFilters.condition || [];
    const newConditions = currentConditions.includes(condition as any)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition as any];
    
    onFilterChange({ 
      ...activeFilters, 
      condition: newConditions.length > 0 ? newConditions : undefined 
    });
  };

  const handleDemographicFilter = (demographic: string) => {
    const currentDemographics = activeFilters.targetDemographic || [];
    const newDemographics = currentDemographics.includes(demographic as any)
      ? currentDemographics.filter(d => d !== demographic)
      : [...currentDemographics, demographic as any];
    
    onFilterChange({ 
      ...activeFilters, 
      targetDemographic: newDemographics.length > 0 ? newDemographics : undefined 
    });
  };

  const handleAvailabilityFilter = (availability: string) => {
    const currentAvailability = activeFilters.availability || [];
    const newAvailability = currentAvailability.includes(availability as any)
      ? currentAvailability.filter(a => a !== availability)
      : [...currentAvailability, availability as any];
    
    onFilterChange({ 
      ...activeFilters, 
      availability: newAvailability.length > 0 ? newAvailability : undefined 
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.condition?.length) count += activeFilters.condition.length;
    if (activeFilters.targetDemographic?.length) count += activeFilters.targetDemographic.length;
    if (activeFilters.availability?.length) count += activeFilters.availability.length;
    if (activeFilters.searchQuery) count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2 px-4">
            <span className="text-3xl sm:text-4xl">{section.icon}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{section.title}</h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 text-center">
            {section.description}
          </p>
        </motion.div>

        {/* Section Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full px-4"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full min-w-0">
              <Package className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-blue-800 whitespace-nowrap">
                {section.totalItems} Total Items
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full min-w-0">
              <Clock className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-green-800 whitespace-nowrap">
                {section.availableItems} Available
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-full min-w-0">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-red-800 whitespace-nowrap">
                {section.highDemandItems} High Demand
              </span>
            </div>
          </div>
        </motion.div>

        {/* Free of Cost Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-full max-w-full">
            <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-primary font-semibold text-sm sm:text-base text-center">
              All donations are completely FREE of cost
            </span>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 flex-shrink-0" />
              <Input
                placeholder={`Search ${section.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilterCount}
                      </Badge>
                    )}
                    {isFilterOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-4 bg-gray-50 rounded-lg overflow-hidden">
                        {/* Condition Filter */}
                        <div className="space-y-3 min-w-0">
                          <Label className="text-sm font-medium text-gray-700">
                            Condition
                          </Label>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {ITEM_CONDITIONS.map((condition) => (
                              <label
                                key={condition}
                                className="flex items-center space-x-2 cursor-pointer min-w-0"
                              >
                                <input
                                  type="checkbox"
                                  checked={activeFilters.condition?.includes(condition) || false}
                                  onChange={() => handleConditionFilter(condition)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700 truncate">{condition}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Target Demographic Filter */}
                        <div className="space-y-3 min-w-0">
                          <Label className="text-sm font-medium text-gray-700">
                            Target Group
                          </Label>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {TARGET_DEMOGRAPHICS.map((demographic) => (
                              <label
                                key={demographic}
                                className="flex items-center space-x-2 cursor-pointer min-w-0"
                              >
                                <input
                                  type="checkbox"
                                  checked={activeFilters.targetDemographic?.includes(demographic) || false}
                                  onChange={() => handleDemographicFilter(demographic)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700 truncate">{demographic}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Availability Filter */}
                        <div className="space-y-3 min-w-0">
                          <Label className="text-sm font-medium text-gray-700">
                            Availability
                          </Label>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {AVAILABILITY_STATUSES.map((availability) => (
                              <label
                                key={availability}
                                className="flex items-center space-x-2 cursor-pointer min-w-0"
                              >
                                <input
                                  type="checkbox"
                                  checked={activeFilters.availability?.includes(availability) || false}
                                  onChange={() => handleAvailabilityFilter(availability)}
                                  className="rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700 truncate">{availability}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CollapsibleContent>
              </Collapsible>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
                {activeFilters.condition?.map((condition) => (
                  <Badge
                    key={condition}
                    variant="secondary"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">{condition}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500 flex-shrink-0"
                      onClick={() => handleConditionFilter(condition)}
                    />
                  </Badge>
                ))}
                {activeFilters.targetDemographic?.map((demographic) => (
                  <Badge
                    key={demographic}
                    variant="secondary"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">{demographic}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500 flex-shrink-0"
                      onClick={() => handleDemographicFilter(demographic)}
                    />
                  </Badge>
                ))}
                {activeFilters.availability?.map((availability) => (
                  <Badge
                    key={availability}
                    variant="secondary"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">{availability}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500 flex-shrink-0"
                      onClick={() => handleAvailabilityFilter(availability)}
                    />
                  </Badge>
                ))}
                {activeFilters.searchQuery && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">Search: "{activeFilters.searchQuery}"</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500 flex-shrink-0"
                      onClick={() => handleSearchChange('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
