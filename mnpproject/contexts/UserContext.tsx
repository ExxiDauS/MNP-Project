'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import SignOutDialog from '@/components/forms/auth/SignOutDialog'; // Import the SignOutDialog component

export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
  profile_image: {
    type: string;
    data: number[];
  };
  verify_proof: any;
  verify_status: number;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  signOut: (customMessage?: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [signOutMessage, setSignOutMessage] = useState<string>("คุณต้องการออกจากระบบใช่หรือไม่?");
  
  // Load user from localStorage on initial load and on client-side navigations
  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Load on initial mount
    loadUserData();
    
    // Also load on focus to handle browser back/forward navigation
    window.addEventListener('focus', loadUserData);
    
    // And on storage events to handle changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        loadUserData();
      }
    });
    
    return () => {
      window.removeEventListener('focus', loadUserData);
    };
  }, []);
  
  const signOut = (customMessage?: string) => {
    // Set custom message if provided, otherwise use default
    setSignOutMessage(customMessage || "คุณต้องการออกจากระบบใช่หรือไม่?");
    setShowSignOutDialog(true);
  };
  
  const confirmSignOut = () => {
    setShowSignOutDialog(false);
  
    // Wait for dialog to close before clearing user
    setTimeout(() => {
      localStorage.removeItem('user');
      setUser(null);
      
      // Use a small delay before navigation  
      setTimeout(() => {
        window.location.href = '/main-landing';
      }, 50);
    }, 100);
  };

  const handleCloseDialog = () => {
    setShowSignOutDialog(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, signOut }}>
      {children}
      <SignOutDialog 
        isOpen={showSignOutDialog} 
        onClose={handleCloseDialog} 
        onConfirm={confirmSignOut}
        message={signOutMessage}
      />
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}