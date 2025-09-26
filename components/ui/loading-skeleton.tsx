import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'image';
  lines?: number;
}

export function LoadingSkeleton({ 
  className, 
  variant = 'text',
  lines = 1 
}: LoadingSkeletonProps) {
  const baseClasses = "animate-shimmer bg-neutral-200 rounded";
  
  const variants = {
    text: "h-4 w-full",
    card: "h-48 w-full",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24",
    image: "h-64 w-full"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants.text,
              index === lines - 1 && "w-3/4" // Last line is shorter
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 border rounded-lg space-y-4", className)}>
      <LoadingSkeleton variant="avatar" />
      <LoadingSkeleton variant="text" lines={2} />
      <LoadingSkeleton variant="button" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-screen bg-neutral-100 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-6">
        <LoadingSkeleton className="h-16 w-96 mx-auto" />
        <LoadingSkeleton className="h-6 w-full" />
        <LoadingSkeleton className="h-6 w-3/4 mx-auto" />
        <div className="flex gap-4 justify-center">
          <LoadingSkeleton variant="button" className="w-32" />
          <LoadingSkeleton variant="button" className="w-32" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <LoadingSkeleton className="h-12 w-96 mx-auto mb-4" />
          <LoadingSkeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
