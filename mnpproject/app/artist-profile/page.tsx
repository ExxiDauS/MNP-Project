"use client"

import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ContactDetail } from '@/components/contacts/Contacts';
import Contacts from '@/components/contacts/Contacts';
import BackButton from '@/components/buttons/BackButton';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';


const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const ProfilePage = () => {
    const { user } = useUser();
    const router = useRouter();

    const contacts: ContactDetail[] = [
        {
            type: 'email',
            label: 'Email',
            value: user?.email ?? '-',
            url: '-'
        },
        {
            type: 'phone',
            label: 'Phone',
            value: user?.phone ?? '-',
            url: '-'
        },
        {
            type: 'facebook',
            label: 'Facebook',
            value: user?.facebook_name ?? '-',
            url: user?.facebook_link ?? '-'
        },
        {
            type: 'instagram',
            label: 'Instagram',
            value: user?.instagram_name ?? '-',
            url: user?.instagram_link ?? '-'
        }
    ];

    return (
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-800/20 to-purple-900/30 blur-xl rounded-3xl"></div>

            <div className="relative w-full bg-custom-background-elevated border border-purple-500/50 rounded-3xl p-6 overflow-hidden">
                {/* Purple glow effect at the top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
                
                {/* Back button */}
                <div className="mb-6">
                    <BackButton href='/' />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left column - Profile info */}
                    <div className="flex flex-col items-center lg:items-start">
                        <Avatar className="h-40 w-40 rounded-full border-4 border-purple-500/30 shadow-lg shadow-purple-500/20">
                            {user?.profile_image && user.profile_image.data.length > 0 ? (
                                <AvatarImage
                                    src={`data:image/jpeg;base64,${Buffer.from(user.profile_image.data).toString('base64')}`}
                                    alt={user.name}
                                    className="rounded-full"
                                />
                            ) : (
                                <AvatarFallback className="bg-gradient-to-br from-purple-800 to-purple-600 text-3xl">
                                    {getInitials(user?.name ?? '')}
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <div className="mt-6 text-center lg:text-left w-full">
                            <h1 className="text-3xl font-bold text-white">
                                {user?.username}
                            </h1>
                            
                            <p className="text-lg text-gray-300 mt-2">
                                {user?.name}
                            </p>
                            
                            <div className="flex items-center mt-4 justify-center lg:justify-start">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-200 border border-purple-500/30">
                                    {(user?.role ?? '').charAt(0).toUpperCase() + (user?.role ?? '').slice(1)}
                                    {user?.verify_status === 1 &&
                                        <BadgeCheck className="w-4 h-4 ml-1 text-purple-300" />
                                    }
                                </div>
                            </div>
                            
                            <Button 
                                onClick={() => router.push("/artist-profile/edit-profile")} 
                                className="mt-6 w-full bg-custom-purple hover:bg-custom-purple-light text-white rounded-full py-6 transition-all shadow-md"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* Right column - Contacts */}
                    <div className="bg-custom-background-surface rounded-2xl overflow-hidden border border-purple-500/20">
                        
                        <div className="p-4">
                            {/* Using your existing Contacts component */}
                            <Contacts contacts={contacts} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;