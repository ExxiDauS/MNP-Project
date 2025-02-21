import React from "react";
import LivehouseCard from "./LivehouseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Livehouse {
  id: number;
  name: string;
  location: string;
  image: string;
}

interface Livehouses extends Array<Livehouse> {}

const CardsCarousel = ({
  data,
  cardSize,
}: {
  data: Livehouses;
  cardSize: number;
}) => {
  return (
    <section>
      {/* Cards Carousel */}
      <div className="w-full flex justify-center items-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          className="w-full max-w-[85rem] px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <CarouselContent className="-ml-2">
            {data.map((livehouse) => (
              <CarouselItem
                key={livehouse.id}
                className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <LivehouseCard
                  card_size={cardSize}
                  bg_image={livehouse.image}
                  location={livehouse.location}
                  name={livehouse.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default CardsCarousel;
