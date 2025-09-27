'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackHandler() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      // Send error to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: error
      }, window.location.origin);
      return;
    }
    
    if (code) {
      // Exchange code for tokens and authenticate
      exchangeCodeForTokens(code);
    }
  }, [searchParams]);
  
  const exchangeCodeForTokens = async (code: string) => {
    try {
      const response = await fetch('/api/auth/google-oauth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Send success data to parent window
        window.opener?.postMessage({
          type: 'GOOGLE_OAUTH_SUCCESS',
          user: data.sender,
          token: data.token
        }, window.location.origin);
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: error instanceof Error ? error.message : 'Authentication failed'
      }, window.location.origin);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Processing authentication...</p>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}