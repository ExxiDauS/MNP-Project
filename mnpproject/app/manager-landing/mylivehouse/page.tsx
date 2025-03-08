'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

import DetailHeaderForManager from '@/components/livehouseDetail/DetailHeaderForManager'
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

interface UserResponse {
    user: User;
}

const Page = () => {
    const { user } = useUser();
    const [livehouse, setLivehouse] = useState<Livehouse | null>(null);
    const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
    const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        // Data fetching function
        const fetchData = async () => {
            try {
                
                setIsLoading(true);
                
                // Fetch livehouse data
                const data = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${user?.user_id}`);
                if (!data.ok) {
                    throw new Error('Failed to fetch livehouse data');
                }
                
                const livehouseData = await data.json();

                if (!livehouseData) {
                    throw new Error('Livehouse not found');
                }
              
                setLivehouse(livehouseData);
                
                // Process images
                const imageArray = [
                    livehouseData.sample_image01 ? bufferToDataUrl(livehouseData.sample_image01) : null,
                    livehouseData.sample_image02 ? bufferToDataUrl(livehouseData.sample_image02) : null,
                    livehouseData.sample_image03 ? bufferToDataUrl(livehouseData.sample_image03) : null,
                    livehouseData.sample_image04 ? bufferToDataUrl(livehouseData.sample_image04) : null,
                    livehouseData.sample_image05 ? bufferToDataUrl(livehouseData.sample_image05) : null
                ];
                setImages(imageArray);

                // Fetch user data
                const user_data = await fetch(`http://localhost:5000/api/users/profile/${livehouseData.user_id}`);
                if (!user_data.ok) {
                    throw new Error('ไม่สามารถดึงข้อมูล Livehouse ได้ โปรดรีโหลดหน้าเว็บใหม่อีกครั้ง');
                }
                
                const user_res: UserResponse = await user_data.json();
                console.log("User data:", user_res);
                const manager = user_res.user;
                console.log("Manager data:", manager);

                // Format user contact details
                const details: ContactDetail[] = [];

                if (manager.email) {
                    details.push({
                        type: 'email',
                        label: 'Email',
                        value: manager.email,
                        url: `-`
                    });
                }

                if (manager.phone) {
                    details.push({
                        type: 'phone',
                        label: 'Phone',
                        value: manager.phone,
                        url: `-`
                    });
                }

                if (manager.facebook_name) {
                    details.push({
                        type: 'facebook',
                        label: 'Facebook',
                        value: manager.facebook_name,
                        url: manager.facebook_link
                    });
                }

                if (manager.instagram_name) {
                    details.push({
                        type: 'instagram',
                        label: 'Instagram',
                        value: manager.instagram_name,
                        url: manager.instagram_link
                    });
                }

                setContactDetails(details);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isClient]);

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
                    <h2 className="text-2xl font-bold text-red-800 mb-2">เกิดข้อผิดพลาด</h2>
                    <p className="text-red-600">{error || 'Livehouse not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Larger aura effect background */}
            <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-4">
                <DetailHeaderForManager
                    name={livehouse.name}
                    address={livehouse.location}
                    price={livehouse.price_per_hour}
                />
                
                <div className="mb-4 md:mb-6 mt-2 md:mt-4">
                    <ImageGallery 
                        image1={images[0]} 
                        image2={images[1]} 
                        image3={images[2]} 
                        image4={images[3]} 
                        image5={images[4]} 
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 px-2 md:px-6">
                    <div className="w-full md:w-7/12 flex flex-col h-full">
                        <Description description={livehouse.description} />
                    </div>
                    <div className="w-full md:w-5/12">
                        <Contacts contacts={contactDetails} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;