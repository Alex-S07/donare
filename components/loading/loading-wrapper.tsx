'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { GlobalLoading } from '@/components/ui/global-loading';
import { PageLoadingSkeleton } from '@/components/ui/global-loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  showSkeleton?: boolean;
  delay?: number;
}

export function LoadingWrapper({ 
  children, 
  loading = false, 
  loadingMessage = 'Loading...',
  showSkeleton = false,
  delay = 0
}: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(loading);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        showLoading(loadingMessage);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      hideLoading();
    }
  }, [loading, loadingMessage, delay, showLoading, hideLoading]);

  if (isLoading && showSkeleton) {
    return <PageLoadingSkeleton />;
  }

  if (isLoading) {
    return (
      <GlobalLoading 
        isLoading={true} 
        message={loadingMessage}
        variant="default"
      />
    );
  }

  return <>{children}</>;
}

export function withLoading<T extends object>(
  Component: React.ComponentType<T>,
  loadingMessage = 'Loading...',
  showSkeleton = false
) {
  return function WrappedComponent(props: T) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    return (
      <LoadingWrapper 
        loading={isLoading} 
        loadingMessage={loadingMessage}
        showSkeleton={showSkeleton}
      >
        <Component {...props} />
      </LoadingWrapper>
    );
  };
}
