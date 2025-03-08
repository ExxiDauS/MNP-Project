'use client';

import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useUser } from '@/contexts/UserContext';

const MobileNav = () => {
  const { user } = useUser();
  const role = user?.role?.toLowerCase().trim(); // Normalize role name

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5 text-zinc-100" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-black p-0">
        <div className="px-4 pt-4">
          <SheetTitle className="text-zinc-100">เมนู</SheetTitle>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {/* Common links for all users */}
          {/* <a href="/" className="text-zinc-100 hover:text-zinc-300">หน้าหลัก</a> */}

          {/* Regular users' menu */}
          {(!user || role !== 'manager') && (
            <>
              <a href="/" className="text-zinc-100 hover:text-zinc-300">หน้าหลัก</a>
              <a href="/Explore" className="text-zinc-100 hover:text-zinc-300">สำรวจ</a>
              <a href="/artist-booking-list" className="text-zinc-100 hover:text-zinc-300">การจอง</a>
            </>
          )}

          {/* Manager-specific menu */}
          {role === 'manager' && (
            <>
              <a href="/manager-landing" className="text-zinc-100 hover:text-zinc-300">หน้าหลัก</a>
              <a href="/manager-landing/pending" className="text-zinc-100 hover:text-zinc-300">การจอง</a>
              <a href="/manager-landing/Calendar" className="text-zinc-100 hover:text-zinc-300">ปฏิทิน</a>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
