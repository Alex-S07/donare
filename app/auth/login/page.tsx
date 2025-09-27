'use client';

import { useRouter } from 'next/navigation';
import GoogleOAuthButton from '@/components/auth/google-oauth-button';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginExample() {
  const router = useRouter();
  const { loginSender } = useAuth();

  const handleGoogleSuccess = (userData: any) => {
    console.log('Google login success:', userData);
    
    if (userData.token) {
      // Store the token in auth context
      loginSender(userData.token);
      
      // Show success message
      toast.success('Successfully signed in!');
      
      // Redirect to donations page
      router.push('/donations');
    } else {
      toast.error('Authentication failed - no token received');
    }
  };

  const handleGoogleError = (error: string) => {
    console.error('Google login error:', error);
    toast.error(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google OAuth Button */}
          <GoogleOAuthButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
}