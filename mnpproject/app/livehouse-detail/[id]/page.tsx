'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import DetailHeader from '@/components/livehouseDetail/DetailHeader';
import ImageGallery from '@/components/livehouseDetail/ImageGallery';
import Description from '@/components/livehouseDetail/Description';
import Contacts from '@/components/contacts/Contacts';

import livehouses from '@/public/data/livehouses.json';

const Page = () => {
    const params = useParams();

    // Find the livehouse by id from the URL
    const livehouse = livehouses.livehouses.find(
        (house) => house.id.toString() === params.id
    );

    // If livehouse is not found, show 404 page
    if (!livehouse) {
        notFound();
    }

    return (
        <>
        <section className="relative flex justify-self-center w-full mt-24  max-w-5xl mx-auto4 px-4 sm:px-6 md:px-8 ">
            {/* Larger aura effect background */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-10">
                <DetailHeader 
                    name={livehouse.name} 
                    address={livehouse.address} 
                    price={livehouse.price} 
                    id={params.id} 
                />
                
                <div className="mb-4 sm:mb-6">
                    <ImageGallery images={livehouse.images} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <Description description={livehouse.description} />
                    </div>
                    <div className="md:col-span-2">
                        <Contacts contacts={livehouse.contactDetails} />
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Page;
