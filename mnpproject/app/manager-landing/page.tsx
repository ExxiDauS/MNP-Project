
'use client';


import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';


export default function Page() {
  const { user } = useUser();

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-secondary">
      <h1 className="text-4xl font-bold mb-4">Welcome to Landing Page 2</h1>
      
      <div className="w-full max-w-2xl">

        <p className="mb-4">Welcome, {user?.name || 'Guest'}!</p>
        <p className="mb-8">You are logged in with {user?.role || 'Guest'} access.</p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/projects" className="p-6 border rounded-lg hover:bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <p>Manage your active projects</p>
          </Link>
          <Link href="/settings" className="p-6 border rounded-lg hover:bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p>Configure your account settings</p>
          </Link>
        </div>
      </div>
    </main>
  );
}