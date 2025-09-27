'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DonationSender, DonationReceiver, Volunteer } from '@/types/database';

// Auth context types
interface AuthContextType {
  // Sender authentication
  sender: DonationSender | null;
  senderLoading: boolean;
  senderToken: string | null;
  loginSender: (token: string) => void;
  logoutSender: () => void;
  
  // Receiver authentication
  receiver: DonationReceiver | null;
  receiverLoading: boolean;
  receiverToken: string | null;
  loginReceiver: (token: string) => void;
  logoutReceiver: () => void;
  
  // Volunteer authentication
  volunteer: Volunteer | null;
  volunteerLoading: boolean;
  volunteerToken: string | null;
  loginVolunteer: (token: string) => void;
  logoutVolunteer: () => void;
  
  // General auth state
  isAuthenticated: boolean;
  userType: 'sender' | 'receiver' | 'volunteer' | null;
  
  // Session management
  sessionExpiring: boolean;
  timeUntilExpiry: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const SENDER_TOKEN_KEY = 'donare_sender_token';
const RECEIVER_TOKEN_KEY = 'donare_receiver_token';
const VOLUNTEER_TOKEN_KEY = 'donare_volunteer_token';

// Session warning time (5 minutes before expiry)
const SESSION_WARNING_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  // Sender state
  const [sender, setSender] = useState<DonationSender | null>(null);
  const [senderLoading, setSenderLoading] = useState(true);
  const [senderToken, setSenderToken] = useState<string | null>(null);
  
  // Receiver state
  const [receiver, setReceiver] = useState<DonationReceiver | null>(null);
  const [receiverLoading, setReceiverLoading] = useState(true);
  const [receiverToken, setReceiverToken] = useState<string | null>(null);
  
  // Volunteer state
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [volunteerLoading, setVolunteerLoading] = useState(true);
  const [volunteerToken, setVolunteerToken] = useState<string | null>(null);
  
  // Session management
  const [sessionExpiring, setSessionExpiring] = useState(false);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for sender token
        const storedSenderToken = localStorage.getItem(SENDER_TOKEN_KEY);
        if (storedSenderToken) {
          setSenderToken(storedSenderToken);
          await validateSenderToken(storedSenderToken);
        } else {
          setSenderLoading(false);
        }

        // Check for receiver token
        const storedReceiverToken = localStorage.getItem(RECEIVER_TOKEN_KEY);
        if (storedReceiverToken) {
          setReceiverToken(storedReceiverToken);
          await validateReceiverToken(storedReceiverToken);
        } else {
          setReceiverLoading(false);
        }

        // Check for volunteer token
        const storedVolunteerToken = localStorage.getItem(VOLUNTEER_TOKEN_KEY);
        if (storedVolunteerToken) {
          setVolunteerToken(storedVolunteerToken);
          await validateVolunteerToken(storedVolunteerToken);
        } else {
          setVolunteerLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setSenderLoading(false);
        setReceiverLoading(false);
        setVolunteerLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Validate sender token
  const validateSenderToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/validate-sender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSender(data.sender);
        startSessionMonitoring(data.sender.session_expires_at, 'sender');
      } else {
        // Token invalid, clear it
        localStorage.removeItem(SENDER_TOKEN_KEY);
        setSenderToken(null);
      }
    } catch (error) {
      console.error('Sender token validation error:', error);
      localStorage.removeItem(SENDER_TOKEN_KEY);
      setSenderToken(null);
    } finally {
      setSenderLoading(false);
    }
  };

  // Validate receiver token
  const validateReceiverToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/validate-receiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReceiver(data.receiver);
        startSessionMonitoring(data.receiver.session_expires_at, 'receiver');
      } else {
        // Token invalid, clear it
        localStorage.removeItem(RECEIVER_TOKEN_KEY);
        setReceiverToken(null);
      }
    } catch (error) {
      console.error('Receiver token validation error:', error);
      localStorage.removeItem(RECEIVER_TOKEN_KEY);
      setReceiverToken(null);
    } finally {
      setReceiverLoading(false);
    }
  };

  // Validate volunteer token
  const validateVolunteerToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/validate-volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVolunteer(data.volunteer);
        // Volunteers don't have session expiry like senders/receivers
      } else {
        // Token invalid, clear it
        localStorage.removeItem(VOLUNTEER_TOKEN_KEY);
        setVolunteerToken(null);
      }
    } catch (error) {
      console.error('Volunteer token validation error:', error);
      localStorage.removeItem(VOLUNTEER_TOKEN_KEY);
      setVolunteerToken(null);
    } finally {
      setVolunteerLoading(false);
    }
  };

  // Start session monitoring
  const startSessionMonitoring = (expiresAt: string | null, userType: 'sender' | 'receiver' | 'volunteer') => {
    if (!expiresAt) return;

    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const timeLeft = expiryTime - now;

    if (timeLeft <= 0) {
      // Session already expired
      if (userType === 'sender') {
        logoutSender();
      } else if (userType === 'receiver') {
        logoutReceiver();
      } else if (userType === 'volunteer') {
        logoutVolunteer();
      }
      return;
    }

    // Set up warning timer
    const warningTime = Math.max(0, timeLeft - SESSION_WARNING_TIME);
    
    setTimeout(() => {
      setSessionExpiring(true);
      setTimeUntilExpiry(SESSION_WARNING_TIME);
      
      // Start countdown
      const countdown = setInterval(() => {
        setTimeUntilExpiry(prev => {
          if (prev === null || prev <= 1000) {
            clearInterval(countdown);
            // Auto logout
            if (userType === 'sender') {
              logoutSender();
            } else if (userType === 'receiver') {
              logoutReceiver();
            } else if (userType === 'volunteer') {
              logoutVolunteer();
            }
            return null;
          }
          return prev - 1000;
        });
      }, 1000);
    }, warningTime);
  };

  // Login sender
  const loginSender = (token: string) => {
    localStorage.setItem(SENDER_TOKEN_KEY, token);
    setSenderToken(token);
    validateSenderToken(token);
  };

  // Logout sender
  const logoutSender = async () => {
    try {
      if (senderToken) {
        await fetch('/api/auth/logout-sender', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${senderToken}`
          }
        });
      }
    } catch (error) {
      console.error('Sender logout error:', error);
    } finally {
      localStorage.removeItem(SENDER_TOKEN_KEY);
      setSenderToken(null);
      setSender(null);
      setSessionExpiring(false);
      setTimeUntilExpiry(null);
    }
  };

  // Login receiver
  const loginReceiver = (token: string) => {
    localStorage.setItem(RECEIVER_TOKEN_KEY, token);
    setReceiverToken(token);
    validateReceiverToken(token);
  };

  // Logout receiver
  const logoutReceiver = async () => {
    try {
      if (receiverToken) {
        await fetch('/api/auth/logout-receiver', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${receiverToken}`
          }
        });
      }
    } catch (error) {
      console.error('Receiver logout error:', error);
    } finally {
      localStorage.removeItem(RECEIVER_TOKEN_KEY);
      setReceiverToken(null);
      setReceiver(null);
      setSessionExpiring(false);
      setTimeUntilExpiry(null);
    }
  };

  // Login volunteer
  const loginVolunteer = (token: string) => {
    localStorage.setItem(VOLUNTEER_TOKEN_KEY, token);
    setVolunteerToken(token);
    validateVolunteerToken(token);
  };

  // Logout volunteer
  const logoutVolunteer = async () => {
    try {
      if (volunteerToken) {
        await fetch('/api/auth/logout-volunteer', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${volunteerToken}`
          }
        });
      }
    } catch (error) {
      console.error('Volunteer logout error:', error);
    } finally {
      localStorage.removeItem(VOLUNTEER_TOKEN_KEY);
      setVolunteerToken(null);
      setVolunteer(null);
      setSessionExpiring(false);
      setTimeUntilExpiry(null);
    }
  };

  // Computed values
  const isAuthenticated = !!(sender || receiver || volunteer);
  const userType = sender ? 'sender' : receiver ? 'receiver' : volunteer ? 'volunteer' : null;

  const value: AuthContextType = {
    sender,
    senderLoading,
    senderToken,
    loginSender,
    logoutSender,
    
    receiver,
    receiverLoading,
    receiverToken,
    loginReceiver,
    logoutReceiver,
    
    volunteer,
    volunteerLoading,
    volunteerToken,
    loginVolunteer,
    logoutVolunteer,
    
    isAuthenticated,
    userType,
    
    sessionExpiring,
    timeUntilExpiry
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for sender-specific auth
export function useSenderAuth() {
  const { sender, senderLoading, senderToken, loginSender, logoutSender } = useAuth();
  return { sender, loading: senderLoading, token: senderToken, login: loginSender, logout: logoutSender };
}

// Hook for receiver-specific auth
export function useReceiverAuth() {
  const { receiver, receiverLoading, receiverToken, loginReceiver, logoutReceiver } = useAuth();
  return { receiver, loading: receiverLoading, token: receiverToken, login: loginReceiver, logout: logoutReceiver };
}

// Hook for volunteer-specific auth
export function useVolunteerAuth() {
  const { volunteer, volunteerLoading, volunteerToken, loginVolunteer, logoutVolunteer } = useAuth();
  return { volunteer, loading: volunteerLoading, token: volunteerToken, login: loginVolunteer, logout: logoutVolunteer };
}
