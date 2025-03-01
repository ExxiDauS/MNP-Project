'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUser } from '@/contexts/UserContext';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons

// Add global style to hide browser's default password reveal button
const globalStyles = `
  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }
  
  input[type="password"]::-webkit-contacts-auto-fill-button,
  input[type="password"]::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    height: 0;
    width: 0;
    margin: 0;
  }
`;

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();
  const { setUser } = useUser();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Clear errors when typing
    setError('');
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newFieldErrors: {[key: string]: string} = {};
    let valid = true;

    if (!username.trim()) {
      newFieldErrors.username = 'กรุณากรอกชื่อผู้ใช้';
      valid = false;
    }

    if (!password.trim()) {
      newFieldErrors.password = 'กรุณากรอกรหัสผ่าน';
      valid = false;
    }

    setFieldErrors(newFieldErrors);
    
    if (!valid) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
    
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // Step 1: Sign in to get user ID
      const signInResponse = await fetch('http://localhost:5000/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!signInResponse.ok) {
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      const signInData = await signInResponse.json();
      const userId = signInData.user.id;

      // Step 2: Get user profile data
      const profileResponse = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
      }

      const profileData = await profileResponse.json();
      const userData = profileData.user;
      
      // Save user data both to localStorage and context
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      setUser(userData);
      
      // Handle redirection with a delay to ensure state is updated
      setTimeout(() => {
        if (userData.role === 'manager') {
          window.location.href = '/manager-landing';
        } else if (userData.role === 'artist') {
          window.location.href = '/main-landing';
        }
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <style jsx global>{globalStyles}</style>
      <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive" className='mt-4'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="username" className='text-zinc-100'>ชื่อผู้ใช้</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="กรอกชื่อผู้ใช้"
          className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${
            fieldErrors.username ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {fieldErrors.username && (
          <p className="text-sm text-red-500">{fieldErrors.username}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className='text-zinc-100'>รหัสผ่าน</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่าน"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 pr-10 ${
              fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''
            }`}
            autoComplete="new-password"
            aria-autocomplete="none"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-sm text-red-500">{fieldErrors.password}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        disabled={isLoading}
      >
        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </Button>

      <div className="mt-4 text-center">
        <p className="text-zinc-400">
          หากคุณยังไม่มีบัญชี{' '}
          <button
            type="button"
            onClick={() => router.push('/sign-up')}
            className="text-zinc-100 hover:underline font-medium"
          >
            สมัครสมาชิกที่นี่
          </button>
        </p>
      </div>
    </form>
    </>

  );
}