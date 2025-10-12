import React from 'react';
import { Search } from 'lucide-react';

const SearchRestaurant = ({ searchTerm, handleSearch }) => {
  return (
    <div className="relative flex-grow">
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-full text-lg outline-none transition-border duration-300 focus:border-green-500 focus:shadow-outline placeholder-gray-400"
        placeholder='Search for restaurants'
        type='text'
        value={searchTerm}
        onChange={handleSearch}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Search /></span>
    </div>
  );
};

export default SearchRestaurant;