import React from 'react';
import LikeButton from './LikeButton';
import axios from 'axios';
import { useEffect, useState } from 'react';




const RestaurantCard = ({ restaurant,  onLike, onClick }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuItems, setMenuItems] = useState([]);
  const [cuisineNames, setCuisineNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
  
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/ResMenu/${restaurant._id}`, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setMenuItems(response.data);
            const uniqueCuisines = [...new Set(response.data.map(item => item.cuisineName))];
            setCuisineNames(uniqueCuisines);
          } else if (response.data && Array.isArray(response.data.menu)) {
            setMenuItems(response.data.menu);
            const uniqueCuisines = [...new Set(response.data.menu.map(item => item.cuisineName))];
            setCuisineNames(uniqueCuisines);
          } else {
            setError('Received invalid data format for menu items');
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMenuItems();
  }, [restaurant._id]);
  if (!restaurant) return null;
  const checking = () => {
    console.log('clicked');
  };
  return (
    <div
      key={restaurant.id}
      className="bg-white rounded-lg shadow-lg p-5 cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onClick(restaurant)}
    >
      <div className="relative">
        <img
          src={"https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg"}
          alt={restaurant.restaurantName}
          className="w-full h-48 object-cover rounded-lg mb-5"
        />
        <LikeButton
          // isLiked={isLiked}
          // onLike={onLike}
          onClick={checking}
          restaurantId={restaurant.id} 
        />
      </div>
      <div className='flex justify-between items-center'>
        <h3 className="text-xl font-semibold mb-2">{restaurant.restaurantName}</h3>


        <p className={`text-gray-600 mb-2 font-poppins mr-2 ${restaurant?.isOpen?"text-green-600":"text-neutral-500"}`}>
        {restaurant?.isOpen?"Open":"Closed"}
        </p>
      </div>

      <p className="text-gray-600 mb-2">  {cuisineNames.length > 0 ? cuisineNames.join(', ') : 'No cuisine available'}</p>
      <p className="text-gray-600 mb-2">{'⭐'.repeat(restaurant.rating)}</p>
    </div>
  );
};

export default RestaurantCard;
