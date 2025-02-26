'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function SignUpButton() {
  const router = useRouter();
  const { data: session } = useSession();

  // If user is already logged in, don't show sign up button
  if (session) {
    return null;
  }

  return (
    <Button 
      onClick={() => router.push('/signup')}
      variant="outline" 
      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
    >
      สมัครสมาชิก
    </Button>
  );
}