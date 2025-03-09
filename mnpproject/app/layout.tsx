import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import Navbar from "@/components/Nav/MainNavBar";
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master N' Performance",
  description: "Master of N(iggar) Performance, GET B(L)ACK TO WORK",
};

console.log('Layout rendering');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-custom-background-primary`}
      >
        <UserProvider>
          <Navbar />
          {children}
          <Toaster />
        </UserProvider>

      </body>
    </html>
  );
}