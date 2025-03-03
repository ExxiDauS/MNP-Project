"use client";
import React, { useEffect, useState } from "react";
import ExploreCardContainer from "./ExploreCardContainer";
import CSearchBar from "../CustomSearchBar/CSearchBar";

interface BufferImage {
  type: string;
  data: number[];
}

interface Livehouse {
  livehouse_id: number;
  user_id: number;
  name: string;
  location: string;
  province: string;
  description: string;
  price_per_hour: string;
  sample_image01: BufferImage | null;
  sample_image02: BufferImage | null;
  sample_image03: BufferImage | null;
  sample_image04: BufferImage | null;
  sample_image05: BufferImage | null;
}

const MainExPart = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [filteredLivehouses, setFilteredLivehouses] = useState<Livehouse[]>([]);
  const [livehouses, setLivehouses] = useState<Livehouse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivehouses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/livehouse/get-livehouse");
        if (!response.ok) {
          throw new Error("Failed to fetch livehouses");
        }
        const data = await response.json();
        setLivehouses(data.livehouses);
        setFilteredLivehouses(data.livehouses);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching livehouses:", error);
      }
    };
    fetchLivehouses();
  }, []);

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

      {/* Search Bar */}
      <div className="my-4 flex justify-center">
        <CSearchBar
          handleSearch={handleSearch}
          placeholder="Search livehouses..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center my-4">
          {error}
        </div>
      )}

      {/* Popular Livehouse showcase */}
      <section className="pb-4 mt-6">
        <ExploreCardContainer data={filteredLivehouses} cardSize={220} />
      </section>
    </>
  );
};

export default MainExPart;
