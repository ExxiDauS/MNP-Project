'use client';

import React from 'react';
import SignUpForm from '@/components/forms/auth/SignUpForm';
import { useAuth } from '@/hooks/useAuth';
import BackButton from '@/components/buttons/BackButton';

export default function SignUpPage() {
    // This will redirect already authenticated users
    const { isLoading } = useAuth();

    // If still loading, show loading spinner
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }


    return (
        <section className='relative flex justify-self-center w-full md:w-2/5 mt-24'>
            {/* Larger aura effect background */}
            <div className='absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-md rounded-3xl'></div>

            <div className='relative flex flex-col w-full p-8 m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
                <BackButton href='/main-landing' />
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-100">สมัครสมาชิก</h1>
                    <p className="mt-2 text-zinc-400">กรอกข้อมูลของคุณเพื่อสร้างบัญชีใหม่</p>
                </div>
                <SignUpForm />
            </div>
        </section>
    );
}