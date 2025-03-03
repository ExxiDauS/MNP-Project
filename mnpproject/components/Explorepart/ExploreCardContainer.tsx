import React from "react";
import ExploreCard from "./ExploreCard";
import { bufferToDataUrl } from "../cards/CardsCarousel";

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
            bg_image={livehouse.sample_image01 ? bufferToDataUrl(livehouse.sample_image01) : null}
            location={livehouse.location}
            name={livehouse.name}
            id={livehouse.livehouse_id.toString()}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreCardContainer;
