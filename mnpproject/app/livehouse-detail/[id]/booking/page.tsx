'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import livehouses from '@/public/data/livehouses.json';
import facilities from '@/public/data/facilities.json';

import BookingHeader from '@/components/forms/booking/BookingHeader';
import BookingForm from '@/components/forms/booking/BookingForm';

const Page = () => {
    const params = useParams();
    const livehouse = livehouses.livehouses.find(
        (house) => house.id.toString() === params.id
    );

    if (!livehouse) {
        notFound();
    }

    return (
        <section className="relative flex justify-center w-full max-w-5xl mx-auto mt-16 px-4 sm:px-6 md:px-8">
            {/* Aura background effect */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-10">
                <BookingHeader 
                    name={livehouse.name} 
                    address={livehouse.address} 
                    artistName="Kawin" 
                    price={livehouse.price} 
                    id={params.id} 
                />
                
                <BookingForm 
                    livehousePrice={livehouse.price} 
                    livehouseName={livehouse.name}  
                    facilitiesData={facilities.facilities} 
                />
            </div>
        </section>
    );
}

export default Page;
