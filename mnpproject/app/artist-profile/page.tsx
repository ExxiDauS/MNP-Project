"use client"

import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ContactDetail } from '@/components/contacts/Contacts';
import Contacts from '@/components/contacts/Contacts';
import Description from '@/components/livehouseDetail/Description';
import BackButton from '@/components/buttons/BackButton';
import { useUser } from '@/contexts/UserContext';


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
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Larger aura effect background */}
            <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-4">
                <BackButton href='/' />
                {/* Avatar and User Info */}
                <div className="flex items-start gap-8 px-2 md:px-6 mt-4">
                    <Avatar className="h-24 w-24 bg-gray-400">
                        {user?.profile_image && user.profile_image.data.length > 0 ? (
                            <AvatarImage
                                src={`data:image/jpeg;base64,${Buffer.from(user.profile_image.data).toString('base64')}`}
                                alt={user.name}
                            />
                        ) : (
                            <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
                        )}
                    </Avatar>

                    <div className="space-y-2">
                        <div>
                            <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
                            <p className="text-lg text-custom-text-secondary">{user?.name}</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-sm font-medium border border-spacing-2 bg-transparent text-custom-text-primary">
                                {(user?.role ?? '').charAt(0).toUpperCase() + (user?.role ?? '').slice(1)}
                                {user?.verify_status === 1 &&
                                    <BadgeCheck className="w-4 h-4 ml-1" />
                                }
                            </div>
                            <Button size="sm" className="bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black">
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 px-2 md:px-6 mt-8">
                    {/* Bio Section */}
                    <div className="w-full md:w-7/12 flex flex-col h-full">
                        <Description description='Hello this is mockup bio data' />
                    </div>
                    {/* Contacts Section */}
                    <div className="w-full md:w-5/12">

                        <Contacts contacts={contacts} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;