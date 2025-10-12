import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import Footer from '../../../components/HomePageCompo/Footer';
import { Trash2 } from 'lucide-react';
import usersRestaurantData from '../usershome/usersRestaurantdata.json'; // Ensure the JSON data is imported correctly

const Usersliked = () => {
  const [likedRestaurants, setLikedRestaurants] = useState({});
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

  useEffect(() => {
    // Load liked restaurants from local storage
    const storedLikes = JSON.parse(localStorage.getItem('likedRestaurants')) || {};
    setLikedRestaurants(storedLikes);
  }, []);

  const handleDelete = (restaurantId) => {
    setLikedRestaurants(prev => {
      const updatedLikes = { ...prev };
      delete updatedLikes[restaurantId];
      
      // Save updated liked restaurants to local storage
      localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));
      
      return updatedLikes;
    });
  };

  const handleMouseEnter = (restaurantId) => {
    setHoveredRestaurant(restaurantId);
  };

  const handleMouseLeave = () => {
    setHoveredRestaurant(null);
  };

  return (
    <>
      <Navbar />
      <div className="px-5 mb-10">
        <h2 className="text-2xl font-bold mb-5 pt-10">Liked Restaurants</h2>
        {Object.keys(likedRestaurants).length === 0 ? (
          <p>No liked restaurants yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(likedRestaurants).map(([id, liked]) => {
              if (!liked) return null;
              const restaurant = usersRestaurantData.restaurants.find(r => r.id === parseInt(id)); // Ensure ID comparison is correct
              if (!restaurant) return null; // Add check to ensure restaurant exists
              const isHovered = hoveredRestaurant === restaurant.id;

              return (
                <div
                  key={restaurant.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-lg relative"
                  onMouseEnter={() => handleMouseEnter(restaurant.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="text-lg text-gray-800 cursor-pointer">{restaurant.name}</h3>
                  {isHovered && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-4 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                      <p className="text-sm text-gray-600 mb-1"><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Rating:</strong> {'⭐'.repeat(restaurant.rating)}</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Rating Count:</strong> {restaurant.ratingCount}</p>
                    </div>
                  )}
                  <button
                    className="p-2 rounded-full text-black focus:outline-none"
                    onClick={() => handleDelete(restaurant.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer className="fixed bottom-0 w-full"/>
    </>
  );
};

export default Usersliked;
