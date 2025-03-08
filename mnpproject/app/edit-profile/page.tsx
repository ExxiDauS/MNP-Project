'use client'

import React from 'react';
import EditProfileForm from '@/components/forms/profile/EditProfileForm';
import BackButton from '@/components/buttons/BackButton';
import { useUser } from '@/contexts/UserContext';

const page = () => {
    const { user } = useUser();

    return (
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Larger aura effect background */}
            <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6">
                <BackButton href={`/profile/${user?.user_id}`} />
                <h2 className="text-xl font-semibold text-white mt-4">แก้ไขโปรไฟล์</h2>
                <p className="text-sm text-custom-text-secondary">อัปเดตข้อมูลส่วนตัวและลิงก์โซเชียลมีเดียของคุณ</p>

                <EditProfileForm />
            </div>
        </section >
    );
};

export default page;