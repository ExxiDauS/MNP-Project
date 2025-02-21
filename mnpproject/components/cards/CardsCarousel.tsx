import React from 'react'
import LivehouseCard from './LivehouseCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface contactDetailProps {
    type: string,
    label: string,
    value: string,
    url: string
}

interface Livehouse {
    id: string,
    name: string,
    address: string,
    location: string,
    price: number,
    description: string,
    images: string[],
    contactDetails: contactDetailProps[]
}

interface Livehouses extends Array<Livehouse> { }

const CardsCarousel = ({
    data,
    cardSize
}: {
    data: Livehouses,
    cardSize: number
}) => {

    return (
        <section>

            {/* Cards Carousel */}
            <div className="w-full flex justify-center items-center">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        skipSnaps: false
                    }}
                    className="w-full max-w-[85rem] px-16"
                >
                    <CarouselContent className="-ml-2">
                        {data.map((livehouse) => (
                            <CarouselItem key={livehouse.id} className="pl-2 basis-1/5">
                                <LivehouseCard
                                    id={livehouse.id}
                                    card_size={cardSize}
                                    bg_image={`../livehouse/${livehouse.images[0]}`}
                                    location={livehouse.location}
                                    name={livehouse.name}
                                />
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

export default CardsCarousel