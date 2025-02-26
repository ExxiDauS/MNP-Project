'use client';

import React from 'react';
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginButton from "@/components/auth/SigninButton";
import SignUpButton from "@/components/auth/SignUpButton"; // Import the new SignUpButton component
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent px-6 py-4">
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

        <div className="flex items-center space-x-4">
          {session ? (
            <Button variant="ghost" size="icon" className="hover:bg-zinc-800 rounded-full size-11">
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{session.user?.name?.slice(0, 2) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <>
              <SignUpButton /> {/* Add SignUpButton next to LoginButton */}
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}