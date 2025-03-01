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
              {data.map((livehouse) => (
                  <CarouselItem
                      key={livehouse.id}
                      className="pl-2 basis-10/12 sm:basis-1/3 md:basis-1/4.5 lg:basis-1/5"
                  >
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
          <CarouselPrevious className="left-2 sm:left-4" />
          <CarouselNext className="right-2 sm:right-4" />
      </Carousel>
  </section>
  
    )
}

export default CardsCarousel