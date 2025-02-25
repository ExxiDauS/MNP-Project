import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  // If not authenticated, redirect to landing1 (home)
  if (!session) {
    redirect('/');
  }
  
  // If authenticated but not ROLE_2, redirect to landing1
  if (session.user.role !== 'manager') {
    redirect('/');
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Landing Page 2</h1>
      
      <div className="w-full max-w-2xl">
        <p className="mb-4">Welcome, {session.user.name}!</p>
        <p className="mb-8">You are logged in with Role 2 access.</p>
        
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