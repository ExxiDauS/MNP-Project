import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5 text-zinc-100" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-black p-0">
        <div className="flex flex-col space-y-4 p-4">
          <a href="/" className="text-zinc-100 hover:text-zinc-300">
            หน้าหลัก
          </a>
          <a href="/Explore" className="text-zinc-100 hover:text-zinc-300">
            สำรวจ
          </a>
          <a href="#" className="text-zinc-100 hover:text-zinc-300">
            การจอง
          </a>
          <a href="#" className="text-zinc-100 hover:text-zinc-300">
            เกี่ยวกับ
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
