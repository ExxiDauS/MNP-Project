"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  handleSearch?: (query: string) => void;
  placeholder?: string;
}

const CSearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (handleSearch) handleSearch(e.target.value);
  };

  return (
    <div className="flex justify-center w-full px-4">
      <div className="relative w-full max-w-[90%] sm:max-w-lg">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 rounded-full bg-[#1b181a] text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default CSearchBar;
