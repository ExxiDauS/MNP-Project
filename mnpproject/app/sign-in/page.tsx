'use client'

import React from 'react';
import SignInForm from '@/components/forms/auth/SignInForm';
import BackButton from '@/components/buttons/BackButton';

export default function SignInPage() {
  return (
    <section className='relative flex justify-self-center w-full px-4 mt-64 md:mt-32 md:w-1/3 lg:w-1/4'>
      {/* Larger aura effect background */}
      <div className='absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-md rounded-3xl'></div>

      <div className='relative flex flex-col w-full p-8 m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
        <BackButton href='/main-landing'/>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-100">เข้าสู่ระบบ</h1>
          <p className="mt-2 text-zinc-400">ลงชื่อเข้าใช้เพื่อจัดการบัญชีของคุณ</p>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}