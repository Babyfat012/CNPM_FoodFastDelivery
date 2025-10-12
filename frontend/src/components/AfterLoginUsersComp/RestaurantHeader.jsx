import React from 'react';

const RestaurantHeader = () => {
  return (
    <div className='bg-yellow-400 h-screen flex items-center overflow-hidden relative'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-5'>
        <div className='text-left flex-1'>
          <p className='text-4xl font-bold text-gray-800 mb-2 tracking-wider animate-fade-in-down'>We offer</p>
          <div className='relative inline-block my-4'>
            <p className='text-6xl font-extrabold text-orange-600 relative transition-transform duration-300 hover:scale-105 animate-fade-in'>
              Delicious Food
            </p>
            <div className='absolute inset-0 bg-orange-600 opacity-20 rounded-full scale-110 -rotate-2 transition-transform duration-300 hover:scale-125 hover:rotate-6'></div>
          </div>
          <p className='text-4xl font-bold text-gray-800 mb-2 tracking-wider animate-fade-in-up'>And quick</p>
          <p className='text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent animate-fade-in-up delay-150'>
            services
          </p>
        </div>
        <div className='flex-1 ml-24'>
          <img src="https://res.cloudinary.com/ddyejtuqb/image/upload/v1719411025/eating_eyz1h9.jpg" alt="Delicious Food" className='w-96 h-96 object-cover rounded-full shadow-xl transition-transform duration-300 hover:scale-105' />
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;