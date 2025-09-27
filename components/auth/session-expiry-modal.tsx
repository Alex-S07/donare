'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Clock, LogOut } from 'lucide-react';

export default function SessionExpiryModal() {
  const { sessionExpiring, timeUntilExpiry, userType, logoutSender, logoutReceiver } = useAuth();

  if (!sessionExpiring || !timeUntilExpiry) {
    return null;
  }

  const minutes = Math.floor(timeUntilExpiry / 60000);
  const seconds = Math.floor((timeUntilExpiry % 60000) / 1000);

  const handleLogout = () => {
    if (userType === 'sender') {
      logoutSender();
    } else if (userType === 'receiver') {
      logoutReceiver();
    }
  };

  const handleExtendSession = async () => {
    // For senders, we can't extend the session due to 15-minute limit
    // For receivers, we could implement session extension
    if (userType === 'sender') {
      handleLogout();
    } else {
      // TODO: Implement session extension for receivers
      handleLogout();
    }
  };

  return (
    <AlertDialog open={sessionExpiring}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Session Expiring Soon
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Your session will expire in{' '}
              <span className="font-mono font-semibold text-orange-600">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {userType === 'sender' 
                ? 'For security reasons, donation sender sessions are limited to 15 minutes. Please login again to continue.'
                : 'Your session is about to expire. You will need to login again to continue.'
              }
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout Now
          </Button>
          <AlertDialogAction
            onClick={handleExtendSession}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            {userType === 'sender' ? 'Login Again' : 'Extend Session'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
