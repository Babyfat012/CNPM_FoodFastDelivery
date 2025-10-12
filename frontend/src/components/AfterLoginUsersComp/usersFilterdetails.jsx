import React, { useEffect, useRef } from 'react';

const FilterOptions = ({ filters, handleFilterChange, applyFilters, closeFilters }) => {
  const filterRef = useRef(null);

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      closeFilters();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className="fixed top-0 right-0 w-72 h-screen bg-white shadow-xl p-5 overflow-y-auto z-50">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Cuisine</h4>
        {['Italian', 'Indian', 'American', 'Japanese'].map((cuisine) => (
          <label key={cuisine} className="block cursor-pointer mb-2">
            <input
              type="checkbox"
              className="mr-2 cursor-pointer"
              checked={filters.cuisine.includes(cuisine)}
              onChange={() => handleFilterChange('cuisine', cuisine)}
            />
            {cuisine}
          </label>
        ))}
      </div>
      
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide hover:bg-gray-700 transition-colors duration-300"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterOptions;