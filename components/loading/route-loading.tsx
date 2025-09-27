'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalLoading } from '@/components/ui/global-loading';
import { useLoading } from '@/hooks/use-loading';

export function RouteLoading() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const pathname = usePathname();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true);
      setLoadingMessage('Loading page...');
      showLoading('Loading page...');
    };

    const handleComplete = () => {
      setIsNavigating(false);
      hideLoading();
    };

    // Show loading for route changes
    handleStart();
    
    // Hide loading after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      handleComplete();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, showLoading, hideLoading]);

  return (
    <GlobalLoading 
      isLoading={isNavigating} 
      message={loadingMessage}
      variant="default"
    />
  );
}

export function PageTransitionLoading() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <GlobalLoading 
      isLoading={isTransitioning} 
      message="Loading..."
      variant="minimal"
    />
  );
}
