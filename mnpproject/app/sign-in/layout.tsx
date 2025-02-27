import React from 'react';
import { UserProvider } from '@/contexts/UserContext';


export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-custom-background-primary`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}