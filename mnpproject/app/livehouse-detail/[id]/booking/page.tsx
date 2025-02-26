'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation'
import livehouses from '@/public/data/livehouses.json'
import facilities from '@/public/data/facilities.json'
import BookingHeader from '@/components/forms/booking/BookingHeader';
import BookingForm from '@/components/forms/booking/BookingForm';

const page = () => {
    const params = useParams<{ id: string }>()

    // Find the livehouse by id from the URL
    const livehouse = livehouses.livehouses.find(
        (house) => house.id.toString() === params.id
    )

    // If livehouse is not found, show 404 page
    if (!livehouse) {
        notFound()
    }

    return (
        <section className='relative flex justify-self-center w-3/5 mt-24'>
            <div className='absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl'></div>

            <div className='relative flex flex-col w-full m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
                <BookingHeader name={livehouse.name} address={livehouse.address} artistName={"Kawin"} price={livehouse.price} id={params.id}/>
                <BookingForm livehousePrice={livehouse.price} livehouseName={livehouse.name}  facilitiesData={facilities.facilities}/>
            </div>
        </section>
    )
}

export default page