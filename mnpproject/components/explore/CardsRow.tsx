"use client"

import React from 'react'
import LivehouseCard from './LivehouseCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

interface Livehouse {
    id: number,
    name: string,
    location: string,
    image: string
}

interface Livehouses extends Array<Livehouse> { }

const CardsRow = ({
    topic,
    data,
    cardSize
}: {
    topic: string,
    data: Livehouses,
    cardSize: number
}) => {
    return (
        <section>
            <div className="ml-12 my-3">
                <h3 className="text-white font-bold text-xl">{topic}</h3>
            </div>

            <div className="w-full flex justify-center items-center">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        slidesToScroll: 1,
                        skipSnaps: false
                    }}
                    // plugins={[
                    //     Autoplay({
                    //         delay: 3000,
                    //     }),
                    // ]}
                    className="w-full max-w-7xl px-16"
                >
                    <CarouselContent className="-ml-4">
                        {data.map((livehouse) => (
                            <CarouselItem key={livehouse.id} className="pl-4 basis-1/5">
                                <div className="p-3">
                                    <LivehouseCard
                                        card_size={cardSize}
                                        bg_image={livehouse.image}
                                        location={livehouse.location}
                                        name={livehouse.name}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>
            </div>
        </section>
    )
}

export default CardsRow