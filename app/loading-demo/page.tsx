'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobalLoading } from '@/components/ui/global-loading';
import { LoadingWrapper } from '@/components/loading/loading-wrapper';
import { useLoading } from '@/hooks/use-loading';
import { PageLoadingSkeleton } from '@/components/ui/global-loading';
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';

export default function LoadingDemoPage() {
  const [showGlobalLoading, setShowGlobalLoading] = useState(false);
  const [showSkeletonLoading, setShowSkeletonLoading] = useState(false);
  const [showPageSkeleton, setShowPageSkeleton] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const handleGlobalLoading = () => {
    setShowGlobalLoading(true);
    setTimeout(() => setShowGlobalLoading(false), 3000);
  };

  const handleSkeletonLoading = () => {
    setShowSkeletonLoading(true);
    setTimeout(() => setShowSkeletonLoading(false), 3000);
  };

  const handlePageSkeleton = () => {
    setShowPageSkeleton(true);
    setTimeout(() => setShowPageSkeleton(false), 3000);
  };

  const handleContextLoading = () => {
    showLoading('Processing your request...');
    setTimeout(() => hideLoading(), 3000);
  };

  if (showPageSkeleton) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Loading States Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            Test different loading states across the website
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Global Loading Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Global Loading</CardTitle>
              <CardDescription>
                Full-screen loading overlay with animations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGlobalLoading} className="w-full">
                Show Global Loading (3s)
              </Button>
              <p className="text-sm text-muted-foreground">
                Demonstrates the main loading overlay used for page transitions
              </p>
            </CardContent>
          </Card>

          {/* Skeleton Loading Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Skeleton Loading</CardTitle>
              <CardDescription>
                Content skeleton while data loads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSkeletonLoading} className="w-full">
                Show Skeleton Loading (3s)
              </Button>
              <p className="text-sm text-muted-foreground">
                Shows skeleton placeholders for content areas
              </p>
            </CardContent>
          </Card>

          {/* Page Skeleton Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Page Skeleton</CardTitle>
              <CardDescription>
                Full page skeleton layout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handlePageSkeleton} className="w-full">
                Show Page Skeleton (3s)
              </Button>
              <p className="text-sm text-muted-foreground">
                Complete page skeleton for initial loads
              </p>
            </CardContent>
          </Card>

          {/* Context Loading Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Context Loading</CardTitle>
              <CardDescription>
                Loading state managed by context
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleContextLoading} className="w-full">
                Show Context Loading (3s)
              </Button>
              <p className="text-sm text-muted-foreground">
                Loading state managed through React context
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skeleton Content Demo */}
        {showSkeletonLoading && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Skeleton Content Demo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Loading Wrapper Demo */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Loading Wrapper Demo</CardTitle>
              <CardDescription>
                Component wrapped with loading functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoadingWrapper 
                loading={showSkeletonLoading} 
                loadingMessage="Loading content..."
                showSkeleton={true}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">This content is wrapped with loading</h3>
                  <p className="text-muted-foreground">
                    When loading is true, this content will be replaced with a skeleton.
                    When loading is false, this content will be visible.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium">Feature 1</h4>
                      <p className="text-sm text-muted-foreground">Description of feature</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium">Feature 2</h4>
                      <p className="text-sm text-muted-foreground">Description of feature</p>
                    </div>
                  </div>
                </div>
              </LoadingWrapper>
            </CardContent>
          </Card>
        </div>

        {/* Global Loading Overlay */}
        <GlobalLoading 
          isLoading={showGlobalLoading} 
          message="Loading page..."
          variant="default"
        />
      </div>
    </div>
  );
}
