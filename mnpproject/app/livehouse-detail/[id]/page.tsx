'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

import DetailHeader from '@/components/livehouseDetail/DetailHeader'
import ImageGallery from '@/components/livehouseDetail/ImageGallery'
import Description from '@/components/livehouseDetail/Description'
import Contacts from '@/components/contacts/Contacts'
import { bufferToDataUrl } from '@/components/cards/CardsCarousel'

// Define types
interface ContactDetail {
    type: string;
    label: string;
    value: string;
    url: string;
}

interface BufferImage {
    type: string,
    data: number[]
}

interface Livehouse {
    livehouse_id: number;
    user_id: number;
    name: string;
    location: string;
    province: string;
    description: string;
    price_per_hour: string;
    sample_image01: BufferImage | null,
    sample_image02: BufferImage | null,
    sample_image03: BufferImage | null,
    sample_image04: BufferImage | null,
    sample_image05: BufferImage | null,
    contactDetails?: ContactDetail[];
}

interface User {
    email: string;
    facebook_name: string;
    facebook_link: string;
    instagram_name: string;
    instagram_link: string;
    phone: string;
}

interface LivehouseResponse {
    livehouse: Livehouse;
}

interface UserResponse {
    user: User;
}

const Page = () => {
    const params = useParams<{ id: string }>();
    const [livehouse, setLivehouse] = useState<Livehouse | null>(null);
    const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Data fetching function
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch livehouse data
                const data = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${params.id}`);
                if (!data.ok) {
                    throw new Error('Failed to fetch livehouse data');
                }
                
                const res: LivehouseResponse = await data.json();
                const livehouseData = res.livehouse;

                if (!livehouseData) {
                    throw new Error('Livehouse not found');
                }
              
                setLivehouse(livehouseData);
                
                // Process image
                if (livehouseData.sample_image01) {
                    setImageSrc(bufferToDataUrl(livehouseData.sample_image01));
                }

                // Fetch user data
                const user_data = await fetch(`http://localhost:5000/api/users/profile/${livehouseData.user_id}`);
                if (!user_data.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const user_res: UserResponse = await user_data.json();
                const user = user_res.user;

                // Format user contact details
                const details: ContactDetail[] = [];

                if (user.email) {
                    details.push({
                        type: 'email',
                        label: 'Email',
                        value: user.email,
                        url: `-`
                    });
                }

                details.push({
                    type: 'phone',
                    label: 'Phone',
                    value: user.phone,
                    url: `-`
                });

                details.push({
                    type: 'facebook',
                    label: 'Facebook',
                    value: user.facebook_name,
                    url: user.facebook_link
                });

                details.push({
                    type: 'instagram',
                    label: 'Instagram',
                    value: user.instagram_name,
                    url: user.instagram_link
                });

                setContactDetails(details);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Show error state
    if (error || !livehouse) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-6 bg-red-100 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
                    <p className="text-red-600">{error || 'Livehouse not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative flex justify-self-center w-full mt-24  max-w-5xl mx-auto4 px-4 sm:px-6 md:px-8 mb-10">
            {/* Larger aura effect background */}
            <div className="absolute inset-0 p-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-10">

                    <DetailHeader
                        name={livehouse.name}
                        address={livehouse.location}
                        price={livehouse.price_per_hour}
                        id={params.id as string}
                    />
                    <div className="mb-2">
                        <ImageGallery image1={imageSrc} image2={null} image3={null} image4={null} image5={null} />
                    </div>

                    <div className="grid grid-cols-5 gap-2 px-6">
                        <div className="col-span-3">
                            <Description description={livehouse.description} />
                        </div>
                        <div className="col-span-2">
                            <Contacts contacts={contactDetails} />
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default Page;
