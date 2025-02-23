"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  handleSearch?: (query: string) => void; // Function type annotation
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
    <>
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </>
  );
};

export default CSearchBar;
