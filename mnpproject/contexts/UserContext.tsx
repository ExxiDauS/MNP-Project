'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  
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
  
  const signOut = () => {
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

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, signOut }}>
      {children}
      {showSignOutDialog && (
        <AlertDialog open={showSignOutDialog} onOpenChange={() => setShowSignOutDialog(false)}>
          <AlertDialogContent className="bg-zinc-800 text-zinc-100 border-zinc-700">
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการออกจากระบบ</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                คุณต้องการออกจากระบบใช่หรือไม่?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-700 text-zinc-100 hover:bg-zinc-600 hover:text-zinc-100">
                ยกเลิก
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmSignOut}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                ออกจากระบบ
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
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