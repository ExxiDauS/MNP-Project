"use client";
import React, { useEffect, useState } from "react";
import ExploreCardContainer from "./ExploreCardContainer";
import CSearchBar from "../CustomSearchBar/CSearchBar";
import livehousesData from "@/public/data/livehouses.json";

const livehouses = livehousesData.livehouses;

const MainExPart = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredLivehouses, setFilteredLivehouses] = useState(livehouses);

  // Function to handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = livehouses.filter((livehouse) =>
      livehouse.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLivehouses(filtered);
  };

  return (
    <>
      {/* Topic */}
      {/* <div className="my-6 flex justify-center">
        <h3 className="text-custom-text-primary font-bold text-3xl">Popular Livehouses</h3>
      </div> */}

      {/* Search Bar */}
      <div className="my-4 flex justify-center">
        <CSearchBar
          handleSearch={handleSearch}
          placeholder="Search livehouses..."
        />
      </div>

      {/* Popular Livehouse showcase */}
      <section className="pb-4 mt-6">
        <ExploreCardContainer data={filteredLivehouses} cardSize={220} />
      </section>
    </>
  );
};

export default MainExPart;
