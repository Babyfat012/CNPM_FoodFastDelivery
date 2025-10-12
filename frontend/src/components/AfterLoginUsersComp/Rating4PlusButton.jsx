// src/components/AfterLoginUsersComp/Rating4PlusButton.js
import React from 'react';
import { Star } from 'lucide-react';

const Rating4PlusButton = ({ isSelected, onClick }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer font-medium text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300 ${isSelected ? '' : 'bg-yellow-500 text-white'}`}
      onClick={onClick}
    >
      <span className="mr-2"><Star /></span>
      Ratings 4+
    </button>
  );
};

export default Rating4PlusButton;
