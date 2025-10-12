// src/components/AfterLoginUsersComp/LikeButton.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';


// const LikeButton = ({ isLiked, onLike,restaurantId}) => {
  const LikeButton = ({ restaurantId}) => {
  const [islikedRestaurants, setisLikedRestaurants] = useState(false);
  const[likecount,setLikecount]=useState(0);

  const handleLike = (e) => {
    if(islikedRestaurants){
      setLikecount(likecount-1);
    }else{
      setLikecount(likecount+1);}
      console.log("liked",likecount);
    setisLikedRestaurants(!islikedRestaurants);
    e.stopPropagation();
    const message = !isLiked ? "Restaurant liked!" : "Restaurant unliked!";
    toast(message, { type: !isLiked ? "success" : "info" });
    onLike(restaurantId);
  };


  // const handleLike = () => {
  //   setLikedRestaurants(prev => {
  //     const isLiked = !prev[restaurantId];
  //     const updatedLikes = {
  //       ...prev,
  //       [restaurantId]: isLiked,
  //     };

  //     localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));

  //     return updatedLikes;
  //   });
  // };
  return (
    <button
    
      className={`absolute top-2 right-2 p-2 rounded-full ${islikedRestaurants ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
      onClick={handleLike}
    >
      <FaHeart />
    </button>
  );
};

export default LikeButton;
