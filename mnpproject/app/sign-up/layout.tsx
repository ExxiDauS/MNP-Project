import React from 'react';
import { UserProvider } from '@/contexts/UserContext';


export default function SignUpLayout({
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