'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobalLoadingProps {
  isLoading: boolean;
  message?: string;
  variant?: 'default' | 'minimal' | 'fullscreen';
  className?: string;
}

export function GlobalLoading({ 
  isLoading, 
  message = 'Loading...', 
  variant = 'default',
  className 
}: GlobalLoadingProps) {
  if (!isLoading) return null;

  const variants = {
    default: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center",
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
            />
            <Heart className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-foreground"
          >
            {message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    ),
    minimal: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 flex items-center space-x-3",
          className
        )}
      >
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <span className="text-sm font-medium text-foreground">{message}</span>
      </motion.div>
    ),
    fullscreen: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex items-center justify-center",
          className
        )}
      >
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
            />
            <Heart className="w-10 h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Donare</h2>
            <p className="text-lg text-muted-foreground">{message}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-2"
          >
            {[0, 1, 2, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.15 
                }}
                className="w-3 h-3 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    )
  };

  return (
    <AnimatePresence>
      {variants[variant]}
    </AnimatePresence>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section Skeleton */}
          <div className="text-center space-y-4">
            <div className="w-96 h-12 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="w-full max-w-2xl h-6 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="w-3/4 max-w-xl h-6 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="flex justify-center space-x-4">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="w-full h-48 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
