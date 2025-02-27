'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export function useAuth(requireAuth = false) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip during initial loading
    if (isLoading) return;

    // If we require authentication and user is not logged in
    if (requireAuth && !user) {
      router.push('/sign-in');
      return;
    }

    // Handle role-based redirects
    if (user) {
      // If user is a manager but not on a manager page
      if (user.role === 'manager' && pathname === '/sign-in') {
        router.push('/manager-landing');
        return;
      }

      // If user is an artist (or other role) and on the sign-in page
      if (user.role !== 'manager' && pathname === '/sign-in') {
        router.push('/');
        return;
      }
    }
  }, [user, isLoading, router, pathname, requireAuth]);

  return { user, isLoading };
}

// Hook specifically for manager routes
export function useManagerAuth() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (user.role !== 'manager') {
      router.push('/');
      return;
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}