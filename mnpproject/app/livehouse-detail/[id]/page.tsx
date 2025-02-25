'use client'
import React from 'react'
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

const Page = async () => {
    const params = useParams<{ id: string }>();

    // Fetch livehouse data
    const data = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${params.id}`);
    const res: LivehouseResponse = await data.json();
    const livehouse = res.livehouse;

    if (!livehouse) {
        notFound();
    }

    // Fetch user data
    const user_data = await fetch(`http://localhost:5000/api/users/profile/${livehouse.user_id}`);
    const user_res: UserResponse = await user_data.json();
    const user = user_res.user;

    // Format user contact details
    const contactDetails: ContactDetail[] = [];

    const imageSrc = bufferToDataUrl(livehouse.sample_image01);

    if (user.email) {
        contactDetails.push({
            type: 'email',
            label: 'Email',
            value: user.email,
            url: `-`
        });
    }

    contactDetails.push({
        type: 'phone',
        label: 'Phone',
        value: user.phone,
        url: `-`
    });

    contactDetails.push({
        type: 'facebook',
        label: 'Facebook',
        value: user.facebook_name,
        url: user.facebook_link
    });

    contactDetails.push({
        type: 'instagram',
        label: 'Instagram',
        value: user.instagram_name,
        url: user.instagram_link
    });

    return (
        <>
            <section className='relative flex justify-self-center w-3/4 mt-24'>
                {/* Larger aura effect background */}
                <div className='absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl'></div>

                {/* Solid background content container */}
                <div className='relative flex flex-col w-full m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>

                    <DetailHeader
                        name={livehouse.name}
                        address={livehouse.location}
                        price={livehouse.price_per_hour}
                        id={params.id}
                    />
                    <div className="mb-2">
                        <ImageGallery image1={imageSrc} image2='' image3='' image4='' image5='' />
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
        </>
    );
};

export default Page;