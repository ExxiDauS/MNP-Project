'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUser } from '@/contexts/UserContext';

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
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
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Handle redirection with a delay to ensure state is updated
      setTimeout(() => {
        if (userData.role === 'manager') {
          window.location.href = '/manager-landing';
        } else if (userData.role === 'artist') {
          window.location.href = '/';
        } else {
          window.location.href = '/';
        }
      }, 500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="username">ชื่อผู้ใช้</Label>
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
        <Label htmlFor="password">รหัสผ่าน</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="กรอกรหัสผ่าน"
          className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${
            fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
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
    </form>
  );
}