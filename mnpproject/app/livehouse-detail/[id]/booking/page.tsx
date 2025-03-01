'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import livehouses from '@/public/data/livehouses.json';
import facilities from '@/public/data/facilities.json';

import BookingHeader from '@/components/forms/booking/BookingHeader';
import BookingForm from '@/components/forms/booking/BookingForm';

const page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams<{ id: string }>();

    // Simulate loading data
    useEffect(() => {
        const loadData = async () => {
            try {
                // Simulate network delay - you can remove this in production
                // and replace with your actual data fetching logic
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Find the livehouse by id from the URL
    const livehouse = livehouses.livehouses.find(
        (house) => house.id.toString() === params.id
    );

    if (!livehouse) {
        notFound();
    }

    return (
        <section className="relative flex justify-center w-full max-w-5xl mx-auto mt-24 px-4 sm:px-6 md:px-8 mb-10">
            {/* Aura background effect */}
            <div className="absolute inset-0 p-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            <div className='relative flex flex-col w-full m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
                <BookingHeader name={livehouse.name} address={livehouse.address} artistName={"Kawin"} price={livehouse.price} id={params.id}/>
                <BookingForm livehousePrice={livehouse.price} livehouseName={livehouse.name} facilitiesData={facilities.facilities}/>
            </div>
        </section>
    );
}

export default Page;
