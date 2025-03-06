import React from 'react';
import { UserProvider } from '@/contexts/UserContext';

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <UserProvider>
          {children}
        </UserProvider>
  );
}