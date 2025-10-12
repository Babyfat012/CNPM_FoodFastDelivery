import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from '../../../redux/slices/cartSlice';
import { clearActiveRestaurant, setActiveRestaurant } from '../../../redux/slices/activeRestaurantSlice';


const AddToCartButton = ({ item, restaurantId }) => {
  const userId = localStorage.getItem('userId');
  const quantity = useSelector(state => state.cart.cartItems.find(cartItem => cartItem.userId == userId && cartItem._id === item._id)?.quantity) || 0;
  const [isHovered, setIsHovered] = useState(false);
  const activeRes = useSelector(state => state.activeRestaurant.activeRestaurant);
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    dispatch(addToCart({ ...item, userId: userId }))
    toast.success(`${item.dishName} added to cart!`);
    dispatch(setActiveRestaurant(restaurantId));
  };
 

  const increaseItem = () => {
    dispatch(incrementQuantity({ _id: item._id, userId: userId }));
  }

  const decreaseItem = () => {
    dispatch(decrementQuantity({ _id: item._id, userId: userId }));
  }


  if (quantity === 0) {
    return (
      <button
        onClick={handleAddToCart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          px-4 py-2 bg-yellow-400 text-gray-800 rounded-full
          font-semibold shadow-md
          hover:bg-yellow-500 hover:shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isHovered ? 'scale-105' : 'scale-100'}
          focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
        `}
        disabled={activeRes && activeRes !== restaurantId}
      >
        <span className="flex items-center justify-center">
          <svg
            className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Add to Cart
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md border border-gray-200">
      <button
        onClick={decreaseItem}
        className="px-3 py-2 text-red-500 hover:text-red-600 transition-colors duration-300 focus:outline-none"
      >
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M20 12H4"></path>
        </svg>
      </button>
      <p className="px-3 py-2 font-semibold text-gray-800">{quantity}</p>
      <button
        onClick={increaseItem}
        className="px-3 py-2 text-green-500 hover:text-green-600 transition-colors duration-300 focus:outline-none"
      >
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  );
};

export default AddToCartButton;