'use client'

import React from 'react'
import DetailHeader from '@/components/livehouseDetail/DetailHeader'
import ImageGallery from '@/components/livehouseDetail/ImageGallery'
import Description from '@/components/livehouseDetail/Description'
import Contacts from '@/components/livehouseDetail/Contacts'
import livehouses from '@/public/data/detailslivehouses.json'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

const Page = () => {
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
        <>
            <section className='relative flex justify-self-center w-3/4 mt-24'>
                {/* Larger aura effect background */}
                <div className='absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl'></div>

                {/* Solid background content container */}
                <div className='relative flex flex-col w-full m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl'>
                    <DetailHeader name={livehouse.name} address={livehouse.address} price={livehouse.price} />
                    <ImageGallery images={livehouse.images} />

                    <div className="grid grid-cols-5">
                        <div className="col-span-3">
                            <Description description={livehouse.description} />
                        </div>
                        <div className="col-span-2">
                            <Contacts />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page