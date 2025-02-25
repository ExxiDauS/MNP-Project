import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import { Search, User } from 'lucide-react';
import MobileNav from "../components/Nav/MobileNav";
import NavLink from "@/components/Nav/NavLink";
import SearchBar from "@/components/Nav/SearchBar";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-custom-background-primary w-screen`}
      >
        <nav className="fixed top-0 z-50 w-screen bg-gradient-to-b from-black via-black/80 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <MobileNav />
              <span className="text-zinc-100 text-2xl font-bold">Manop</span>

              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="space-x-2">
                  <NavLink href="/">หน้าหลัก</NavLink>
                  <NavLink href="/Explore">สำรวจ</NavLink>
                  <NavLink href="#">การจอง</NavLink>
                  <NavLink href="#">เกี่ยวกับ</NavLink>
                  <SearchBar></SearchBar>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-zinc-800 rounded-full size-11"
              >
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>KI</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </nav>
        <main className="flex w-screen overflow-y-hidden">{children}</main>
      </body>
    </html>
  );
}