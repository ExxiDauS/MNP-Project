'use client';

import React from 'react';
import SignUpForm from '@/components/forms/auth/SignUpForm';
import { useAuth } from '@/hooks/useAuth';

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
        <div className="pt-24 min-h-screen flex items-center justify-center bg-zinc-900">
            <div className="w-full max-w-2xl p-8 space-y-8 bg-zinc-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-100">สมัครสมาชิก</h1>
                    <p className="mt-2 text-zinc-400">กรอกข้อมูลของคุณเพื่อสร้างบัญชีใหม่</p>
                </div>
                <SignUpForm />
            </div>
        </div>
    );
}