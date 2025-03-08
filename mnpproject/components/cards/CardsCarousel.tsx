import React from 'react'
import LivehouseCard from './LivehouseCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// Make sure this interface matches what's coming from your API
interface BufferImage {
    type: string,
    data: number[]
}

interface Livehouse {
    livehouse_id: number,
    user_id: number,
    name: string,
    location: string,
    province: string,
    price_per_hour: string,
    description: string,
    sample_image01: BufferImage | null,
    sample_image02: BufferImage | null,
    sample_image03: BufferImage | null,
    sample_image04: BufferImage | null,
    sample_image05: BufferImage | null,
}

interface Livehouses extends Array<Livehouse> {}

// Convert Buffer Image into Url
export const bufferToDataUrl = (bufferImage: BufferImage | null): string => {
    if (!bufferImage || !bufferImage.data || !Array.isArray(bufferImage.data)) {
      return '';
    }
    
    try {
        // Convert buffer array to Uint8Array
        const uint8Array = new Uint8Array(bufferImage.data);
        
        // Convert to base64
        let binary = '';
        uint8Array.forEach(byte => {
          binary += String.fromCharCode(byte);
        });
        
        // Create data URL
        return `data:image/png;base64,${btoa(binary)}`;
    } catch (error) {
        console.error('Error converting buffer to data URL:', error);
        return '';
    }
};

// Main Carousel
const CardsCarousel = ({
    data,
    cardSize
}: {
    data?: Livehouses, // Made optional with '?'
    cardSize: number 
}) => {
    // Early return if data is undefined or empty
    if (!data || data.length === 0) {
        return (
            <section className="w-full flex justify-center items-center py-6">
                <div className="text-center p-8">
                    <p className="text-lg text-gray-500">No livehouses available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full flex justify-center items-center py-6">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false
                }}
                className="w-full max-w-[85rem] px-4 sm:px-8 md:px-12 lg:px-16"
            >
                <CarouselContent className="-ml-2">
                    {data.map((livehouse) => {
                        const imageSrc = bufferToDataUrl(livehouse.sample_image01);
                        return (
                            <CarouselItem
                                key={livehouse.livehouse_id}
                                className="pl-2 basis-full sm:basis-1/3 md:basis-1/4.5 lg:basis-1/5"
                            >
                                <LivehouseCard
                                    id={(livehouse.livehouse_id).toString()}
                                    card_size={cardSize}
                                    bg_image={imageSrc}
                                    location={livehouse.location}
                                    name={livehouse.name}
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="left-2 sm:left-4" />
                <CarouselNext className="right-2 sm:right-4" />
            </Carousel>
        </section>
    )
}

export default CardsCarousel