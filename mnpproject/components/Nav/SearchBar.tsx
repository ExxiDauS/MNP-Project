"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import livehousesData from "@/public/data/livehouses.json";

const livehouses = livehousesData.livehouses;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = searchQuery
    ? livehouses.filter((house) =>
        house.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-black w-full">
        <Search className="h-5 w-5 text-white mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search livehouses..."
          className="bg-transparent w-full outline-none text-white px-3 py-2"
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4 text-white" />
          </Button>
        )}
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-black  border border-gray-700 rounded-lg shadow-md">
          <Command>
            <CommandList>
              <CommandGroup heading="Suggestions" className=" bg-[#1b181a]">
                {filteredSuggestions.map((house) => (
                  <a href={`/livehouse-detail/${house.id}`}>
                    <CommandItem
                      key={house.id}
                      className="flex items-center px-3 py-2 text-sm text-gray-300 bg-[#1b181a] cursor-pointer rounded-md"
                      onClick={() => {
                        setSearchQuery(house.name);
                        // handleSearch(house.name);
                        setIsOpen(false);
                      }}
                    >
                      {house.name}
                    </CommandItem>
                  </a>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
