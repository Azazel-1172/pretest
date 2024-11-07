// src/components/SearchBar.tsx
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-white shadow p-4 z-50 mb-4 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchOutlined className="text-gray-400 " />
        </span>
        <input
          type="text"
          value={searchQuery}
          placeholder="搜尋"
          className="p-2 pl-10 border border-gray-300 rounded w-full "
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
