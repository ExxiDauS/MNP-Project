'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import { useUser } from '@/contexts/UserContext';
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const { user, signOut, isLoading } = useUser();
  const router = useRouter();
  const [navLoading, setNavLoading] = useState(true);
  
  // Add direct localStorage check for redundancy
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("User data from localStorage:", userData);
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
    }
  }, []);
  // Initialize loading state
  useEffect(() => {
    // Set a small delay to ensure user context has loaded
    const timer = setTimeout(() => {
      setNavLoading(isLoading);
    }, 50);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSignIn = () => {

    router.push('/sign-in');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to handle authentication check for navigation
  const handleNavigation = (path: string) => {
    
    // Special case for Home navigation based on role
    if (path === '/main-landing') {
      if (user && user.role && user.role.toLowerCase().trim() === 'manager') {
        window.location.href = '/manager-landing';
      } else {
        window.location.href = '/main-landing';
      }
      return;
    }
    
    // About is accessible without sign-in
    if (path === '/about') {
      router.push(path);
      return;
    }
    
    // For other links, check if user is signed in
    if (user) {
      router.push(path);
    } else {
      router.push('/sign-in');
    }
  };

  // Render the User Profile or Sign In buttons
  const renderUserProfile = () => {
    if (navLoading) {
      // Skeleton Loading State
      return (
        <div className="flex space-x-3">
          <Skeleton className="w-10 h-10 rounded-full bg-zinc-700" />
        </div>
      );
    }

    return user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-zinc-800 rounded-full size-11">
            <Avatar className="size-8">
              {user.profile_image && user.profile_image.data.length > 0 ? (
                <AvatarImage 
                  src={`data:image/jpeg;base64,${Buffer.from(user.profile_image.data).toString('base64')}`} 
                  alt={user.name} 
                />
              ) : (
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-zinc-800 text-zinc-100 border-zinc-700">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-zinc-700" />
          {user.role === 'manager' && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-zinc-700"
              onClick={() => router.push('/manager-landing')}
            >
              แดชบอร์ดผู้จัดการ
            </DropdownMenuItem>
          )}
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-zinc-700"
            onClick={() => router.push('/profile')}
          >
            โปรไฟล์
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-zinc-700"
            onClick={() => router.push('/booking')}
          >
            การจองของฉัน
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem 
            className="cursor-pointer text-red-500 hover:bg-red-950 hover:text-red-400"
            onClick={signOut}
          >
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className="flex space-x-3">
        <Button 
          onClick={handleSignIn}
          variant="outline"
          className="border bg-transparent text-custom-text-primary hover:bg-zinc-100 hover:text-black"
        >
          เข้าสู่ระบบ
        </Button>
        <Button 
          onClick={() => router.push('/sign-up')}
          className="bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black"
        >
          สมัครสมาชิก
        </Button>
      </div>
    );
  };

  // Render Nav Links skeleton
  const renderNavSkeleton = () => (
    <NavigationMenuList className="space-x-2">
      <Skeleton className="w-20 h-8 rounded-md bg-zinc-700" />
      <Skeleton className="w-16 h-8 rounded-md bg-zinc-700" />
      <Skeleton className="w-20 h-8 rounded-md bg-zinc-700" />
      <Skeleton className="w-24 h-8 rounded-md bg-zinc-700" />
      <Skeleton className="w-36 h-10 rounded-md bg-zinc-700" />
    </NavigationMenuList>
  );

  const renderNavItems = () => (
    <NavigationMenuList className="space-x-2">
      <div onClick={() => handleNavigation('/main-landing')}>
        <NavLink>หน้าหลัก</NavLink>
      </div>
      {/* Only show Explore link if user is not a manager */}
      {(!user || (user && user.role && user.role.toLowerCase().trim() !== 'manager')) && (
        <div onClick={() => handleNavigation('/Explore')}>
          <NavLink>สำรวจ</NavLink>
        </div>
      )}
      <div onClick={() => handleNavigation('/booking')}>
        <NavLink>การจอง</NavLink>
      </div>
      <div onClick={() => handleNavigation('/about')}>
        <NavLink>เกี่ยวกับ</NavLink>
      </div>
      <div onClick={() => !user && router.push('/sign-in')}>
        <SearchBar />
      </div>
    </NavigationMenuList>
  );

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <MobileNav />
          <span className="text-zinc-100 text-2xl font-bold">Manop</span>

          <NavigationMenu className="hidden md:flex">
            {navLoading ? renderNavSkeleton() : renderNavItems()}
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">

          {renderUserProfile()}

        </div>
      </div>
    </nav>
  );
}
