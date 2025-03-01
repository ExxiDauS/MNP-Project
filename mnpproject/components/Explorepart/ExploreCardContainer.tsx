import React from "react";
import ExploreCard from "./ExploreCard";

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

interface Livehouses extends Array<Livehouse> {}

const ExploreCardContainer = ({
  data,
  cardSize,
}: {
  data: Livehouses;
  cardSize: number;
}) => {
  return (

    <section className="px-10 sm:px-20 md:px-30 lg:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((livehouse) => (
          <ExploreCard
            key={livehouse.name}
            card_size={cardSize}
            bg_image={`../livehouse/${livehouse.images[0]}`}
            location={livehouse.location}
            name={livehouse.name}
            id={livehouse.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreCardContainer;
