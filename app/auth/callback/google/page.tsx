'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PostOAuthForm from '@/components/auth/post-oauth-form';

function CallbackHandler() {
  const searchParams = useSearchParams();
  const [showPostOAuthForm, setShowPostOAuthForm] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  
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
        // Check if additional profile information is needed
        if (data.requiresProfileCompletion) {
          setUserInfo(data.profileData);
          setShowPostOAuthForm(true);
        } else {
          // Send success data to parent window
          window.opener?.postMessage({
            type: 'GOOGLE_OAUTH_SUCCESS',
            user: data.sender,
            token: data.token
          }, window.location.origin);
        }
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

  const handleProfileComplete = async (profileData: any) => {
    try {
      // Send additional profile data to complete registration
      const response = await fetch('/api/auth/complete-google-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
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
        throw new Error(data.error || 'Profile completion failed');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: error instanceof Error ? error.message : 'Profile completion failed'
      }, window.location.origin);
    }
  };

  const handleSkipProfile = () => {
    // Send success data to parent window without additional profile data
    window.opener?.postMessage({
      type: 'GOOGLE_OAUTH_SUCCESS',
      user: userInfo,
      token: null // Will be handled by the parent
    }, window.location.origin);
  };
  
  if (showPostOAuthForm && userInfo) {
    return (
      <PostOAuthForm
        userInfo={userInfo}
        onComplete={handleProfileComplete}
        onSkip={handleSkipProfile}
      />
    );
  }
  
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