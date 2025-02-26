'use client';

import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SigninButton() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  if (session) {
    return (
      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Sign Out
      </Button>
    );
  }
  
  return (
    <Button
      onClick={() => signIn(undefined, { callbackUrl: pathname })}
      className="bg-custom-purple text-white hover:bg-custom-purple-light hover:text-black transition-colors"
    >
      เข้าสู่ระบบ
    </Button>
  );
}