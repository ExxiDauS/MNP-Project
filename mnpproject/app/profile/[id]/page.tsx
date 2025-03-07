"use client"

import React, { useEffect, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ContactDetail } from '@/components/contacts/Contacts';
import Contacts from '@/components/contacts/Contacts';
import BackButton from '@/components/buttons/BackButton';
import { useRouter, useParams } from 'next/navigation';

interface UserData {
    user_id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    name: string;
    phone: string;
    facebook_link: string;
    facebook_name: string;
    instagram_link: string;
    instagram_name: string;
    profile_image: {
        type: string;
        data: number[];
    };
    verify_proof: any;
    verify_status: number;
}

interface ApiResponse {
    user: UserData;
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const ProfilePage = () => {
    const params = useParams<{ id: string }>();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/profile/${params.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json() as ApiResponse;
                setUser(data.user);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [params.id]);

    // Prepare contact details only when user data is available
    const contacts: ContactDetail[] = user ? [
        {
            type: 'email',
            label: 'Email',
            value: user.email ?? '-',
            url: '-'
        },
        {
            type: 'phone',
            label: 'Phone',
            value: user.phone ?? '-',
            url: '-'
        },
        {
            type: 'facebook',
            label: 'Facebook',
            value: user.facebook_name ?? '-',
            url: user.facebook_link ?? '-'
        },
        {
            type: 'instagram',
            label: 'Instagram',
            value: user.instagram_name ?? '-',
            url: user.instagram_link ?? '-'
        }
    ] : [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center p-6 bg-red-100 rounded-lg">
                    <h2 className="text-xl font-semibold text-red-700">Error Loading Profile</h2>
                    <p className="mt-2 text-red-600">{error}</p>
                    <Button
                        onClick={() => router.push('/')}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                    >
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-800/20 to-purple-900/30 blur-xl rounded-3xl"></div>

            <div className="relative w-full bg-custom-background-elevated border border-purple-500/50 rounded-3xl p-6 overflow-hidden">
                {/* Purple glow effect at the top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

                {/* Back button */}
                <div className="mb-6">
                    <BackButton href='/manager-landing/pending' />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left column - Profile info */}
                    <div className="flex flex-col items-center lg:items-start">
                        <Avatar className="h-40 w-40 rounded-full border-4 border-purple-500/30 shadow-lg shadow-purple-500/20">
                            {user?.profile_image && user.profile_image.data && user.profile_image.data.length > 0 ? (
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
                                onClick={() => router.push(`/profile/edit-profile/${params.id}`)}
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