"use client"

import React from 'react'
import Contacts from "@/components/contacts/Contacts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContactDetail {
    type: string;
    label: string;
    value: string;
    url: string;
}

interface Artist {
    ArtistcontactDetails: ContactDetail[];
}

const mockArtist: Artist = {
    ArtistcontactDetails: [
        {
            type: "email",
            label: "Email",
            value: "artist@example.com",
            url: "mailto:artist@example.com"
        },
        {
            type: "phone",
            label: "Phone",
            value: "+1234567890",
            url: "tel:+1234567890"
        },
    ]
};

const page = () => {
    return (
        <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
            {/* Larger aura effect background */}
            <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

            {/* Content container */}
            <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-4">

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Profile Image */}
                    <Avatar className='size-44 mt-6 ml-6'>
                        <AvatarImage src="./payment_qr.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* Profile Details */}
                    <div className="flex flex-col justify-center space-y-4 bg-red-200 col-span-2">
                        <h1 className="text-2xl md:text-4xl font-bold">Username</h1>
                        <h2 className="text-xl md:text-2xl">Name</h2>
                        <p className="text-base md:text-lg">Description of the artist goes here. This can be a brief bio or any other relevant information.</p>
                    </div>
                </div>
                {/* Contacts */}
                <div className="mt-6">
                    <Contacts contacts={mockArtist.ArtistcontactDetails} />
                </div>
            </div>
        </section>
    )
}

export default page;
