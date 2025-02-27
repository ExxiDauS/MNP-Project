'use client'

import React from 'react';
import SignInForm from '@/components/forms/auth/SignInForm';
import BackButton from '@/components/buttons/BackButton';

export default function SignInPage() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-800 rounded-xl shadow-lg">
        <BackButton href='/'/>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-100">เข้าสู่ระบบ</h1>
          <p className="mt-2 text-zinc-400">ลงชื่อเข้าใช้เพื่อจัดการบัญชีของคุณ</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}