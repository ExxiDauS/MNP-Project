import React from 'react';
import { UserProvider } from '@/contexts/UserContext';

export default function ManagerLayout({
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