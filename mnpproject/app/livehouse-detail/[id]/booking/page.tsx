'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import facilities from '@/public/data/facilities.json';

import BookingHeader from '@/components/forms/booking/BookingHeader';
import BookingForm from '@/components/forms/booking/BookingForm';

import { useUser } from '@/contexts/UserContext';

interface BufferImage {
    type: string,
    data: number[]
}

interface Livehouse {
    livehouse_id: string;
    user_id: string;
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
}


const page = () => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [livehouseData, setLivehouseData] = useState<Livehouse | null>(null);
    const params = useParams<{ id: string }>();

    // Fetch livehouse data from API
    useEffect(() => {
        const fetchLivehouse = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                }
                
                const data: Livehouse = await response.json();
                setLivehouseData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching livehouse data:", error);
                setIsLoading(false);
            }
        };

        fetchLivehouse();
    }, [params.id]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Check if livehouse data was fetched
    if (!livehouseData) {
        notFound();
    }

    return (
        <section className="relative flex justify-center w-full max-w-5xl mx-auto mt-24 px-4 sm:px-6 md:px-8 mb-10">
            {/* Aura background effect */}
            <div className="absolute inset-0 p-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            <div className='relative flex flex-col w-full m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
                <BookingHeader name={livehouseData.name} address={livehouseData.location} artistName={user?.username} price={livehouseData.price_per_hour} id={params.id}/>
                <BookingForm artistId={user?.user_id} livehouseId={params.id} livehousePrice={parseFloat(livehouseData.price_per_hour)} livehouseName={livehouseData.name} facilitiesData={facilities.facilities}/>
            </div>
        </section>
    );
}

export default page;