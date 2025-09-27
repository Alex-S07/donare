'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  HandHeart,
  Clock,
  Users,
  AlertCircle,
  Quote,
  MapPin,
  Calendar,
  Star,
  Loader2
} from 'lucide-react';
import { DonationCardProps, ItemCondition, TargetDemographic, AvailabilityStatus } from '@/types/donations';
import { cn } from '@/lib/utils';

export default function DonationCard({
  item,
  onRequestItem,
  onDonateSimilar,
  isAuthenticated,
  userType,
  showActions = true
}: DonationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState({ request: false, donate: false });

  const handleRequestItem = async () => {
    if (!isAuthenticated) {
      // Show login modal or redirect
      return;
    }
    
    setIsLoading(prev => ({ ...prev, request: true }));
    try {
      await onRequestItem(item.id);
    } finally {
      setIsLoading(prev => ({ ...prev, request: false }));
    }
  };

  const handleDonateSimilar = async () => {
    if (!isAuthenticated) {
      // Show login modal or redirect
      return;
    }
    
    setIsLoading(prev => ({ ...prev, donate: true }));
    try {
      await onDonateSimilar(item.id);
    } finally {
      setIsLoading(prev => ({ ...prev, donate: false }));
    }
  };

  const getConditionColor = (condition: ItemCondition) => {
    switch (condition) {
      case 'Never Used':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Gently Used':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Moderately Used':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Widely Used':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityColor = (availability: AvailabilityStatus) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High Demand':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Recently Requested':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDemographicIcon = (demographic: TargetDemographic) => {
    switch (demographic) {
      case 'Children':
        return '👶';
      case 'Women':
        return '👩';
      case 'Men':
        return '👨';
      case 'Elderly':
        return '👴';
      case 'Families':
        return '👨‍👩‍👧‍👦';
      case 'Students':
        return '🎓';
      case 'Working Adults':
        return '💼';
      default:
        return '👥';
    }
  };

  const canRequestItem = isAuthenticated && userType === 'receiver';
  const canDonateSimilar = isAuthenticated && userType === 'sender';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-lg border-2",
        isHovered ? "border-primary/20 shadow-md" : "border-gray-200",
        item.isUrgent && "ring-2 ring-red-200 border-red-300"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2">
                {item.title}
                {item.isUrgent && (
                  <AlertCircle className="inline-block ml-2 h-4 w-4 text-red-500" />
                )}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge 
              variant="outline" 
              className={cn("text-xs", getConditionColor(item.condition))}
            >
              {item.condition}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("text-xs", getAvailabilityColor(item.availability))}
            >
              <Clock className="h-3 w-3 mr-1" />
              {item.availability}
            </Badge>
            {item.isUrgent && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="py-3">
          {/* Target Demographics */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">For:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.targetDemographics.map((demographic) => (
                <Badge 
                  key={demographic} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  <span className="mr-1">{getDemographicIcon(demographic)}</span>
                  {demographic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          {item.impactStatement && (
            <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {item.impactStatement}
                </span>
              </div>
            </div>
          )}

          {/* Testimonial */}
          {item.testimonial && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-start gap-2">
                <Quote className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 italic mb-1">
                    "{item.testimonial.text}"
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    - {item.testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        {showActions && (
          <>
            <Separator />
            <CardFooter className="pt-4">
              <div className="flex gap-2 w-full">
                {/* Request Item Button */}
                <Button
                  onClick={handleRequestItem}
                  disabled={!canRequestItem || isLoading.request}
                  className={cn(
                    "flex-1 transition-all duration-200",
                    canRequestItem
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  )}
                  size="sm"
                >
                  {isLoading.request ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <HandHeart className="h-4 w-4 mr-2" />
                  )}
                  {!isAuthenticated
                    ? "Sign up to Request"
                    : userType === 'sender'
                      ? "Switch to Receiver"
                      : "Request This Item"
                  }
                </Button>

                {/* Donate Similar Button */}
                <Button
                  onClick={handleDonateSimilar}
                  disabled={!canDonateSimilar || isLoading.donate}
                  variant="outline"
                  className={cn(
                    "flex-1 transition-all duration-200",
                    canDonateSimilar
                      ? "border-primary text-primary hover:bg-primary/5"
                      : "border-gray-200 text-gray-500 cursor-not-allowed"
                  )}
                  size="sm"
                >
                  {isLoading.donate ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Heart className="h-4 w-4 mr-2" />
                  )}
                  {!isAuthenticated
                    ? "Sign up to Donate"
                    : userType === 'receiver'
                      ? "Switch to Sender"
                      : "Donate Similar"
                  }
                </Button>
              </div>

              {/* Authentication Message */}
              {!isAuthenticated && (
                <p className="text-xs text-gray-500 text-center mt-2 w-full">
                  {/* All donations are <strong>free of cost</strong>. Sign up to get started! */}
                </p>
              )}
            </CardFooter>
          </>
        )}
      </Card>
    </motion.div>
  );
}
