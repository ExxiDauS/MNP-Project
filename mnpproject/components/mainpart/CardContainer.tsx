import React from "react";
import ExCard from "../mainpart/ExCard";

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
    <section className="px-10 sm:px-20 md:px-30 lg:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((livehouse) => (
          <ExCard
            key={livehouse.name}
            card_size={cardSize}
            bg_image={livehouse.image}
            location={livehouse.location}
            name={livehouse.name}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsCarousel;
