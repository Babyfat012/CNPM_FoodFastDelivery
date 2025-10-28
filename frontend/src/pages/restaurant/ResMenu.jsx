import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import Modal from '../../components/AfterLoginRestaurantCompo/RestaurantMenu.jsx/RestaurantAddMenuForm';
import RestaurantMenuCard from '../../components/AfterLoginRestaurantCompo/RestaurantMenu.jsx/RestaurantMenuCard';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have installed and imported react-toastify

const Menu = () => {
  const [show, setShow] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const addMenuItem = (newItem) => {
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  const toggleStockStatus = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/menu/toggleStock/${id}`);
      if (response.status === 200) {
        const updatedMenuItems = menuItems.map(item => 
          item._id === id ? { ...item, inStock: !item.inStock } : item
        );
        setMenuItems(updatedMenuItems);
      } else {
        toast.error("Failed to update stock status!");
      }
    } catch (error) {
      console.error("Error updating stock status:", error);
      toast.error("Error updating stock status!");
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/menu/ResMenu`)
      .then(result => setMenuItems(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='bg-gray-100 ml-60 mt-[78px] w-full font-poppins min-h-screen'>
      <div className='flex justify-end items-center -mb-3'>
        <div className='flex items-center mr-24 mt-4 bg-white rounded-md shadow-md'>
          <p className='p-2'>
            Add item
          </p>
          <button className='mr-2 p-[6px] rounded-2xl bg-gray-200 hover:bg-gray-300' onClick={showModal}>
            <IoMdAdd />
          </button>
        </div>
      </div>
      <Modal show={show} handleClose={hideModal} addMenuItem={addMenuItem} />
      {menuItems.map((menuItem) => (
        <RestaurantMenuCard
          key={menuItem._id}
          cardId={menuItem._id}
          inStock={menuItem.inStock}
          src={menuItem.image}
          title={menuItem.dishName}
          description={menuItem.description}
          price={menuItem.price}
          cuisineName={menuItem.cuisineName}
          toggleStockStatus={toggleStockStatus}
        />
      ))}
    </div>
  );
}

export default Menu;
