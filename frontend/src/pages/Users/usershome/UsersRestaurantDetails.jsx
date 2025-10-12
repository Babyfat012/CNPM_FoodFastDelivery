import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantOverview from '../usershome/RestuarantOverview';
import RestaurantMenu from './RestaurantMenu';

const UsersRestaurantDetail = ({ restaurant, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuItems, setMenuItems] = useState([]);
  const [cuisineNames, setCuisineNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3000/api/menu/ResMenu/${restaurant._id}`, {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold mb-2 text-gray-800">{restaurant.name}</h1>
                <div className="text-xl text-gray-600 mb-4">
                  {cuisineNames.length > 0 ? cuisineNames.join(', ') : 'No cuisine available'}
                </div>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-yellow-400 mr-2">
                    <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-2xl font-bold text-gray-800">{restaurant.rating}</span>
                  <span className="text-gray-600 ml-2">({restaurant.ratingCount} ratings)</span>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <button
                  className={`px-6 py-2 rounded-full mr-4 transition-colors ${
                    activeTab === 'overview' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeTab === 'menu' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveTab('menu')}
                >
                  Menu
                </button>
              </div>

              <div className="max-w-3xl mx-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {activeTab === 'overview' && <RestaurantOverview restaurant={restaurant} />}
                {activeTab === 'menu' && (
                  <RestaurantMenu
                    menuItems={menuItems}
                    loading={loading}
                    error={error}
                    restaurantId = {restaurant._id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersRestaurantDetail;
