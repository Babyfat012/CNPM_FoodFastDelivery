// RestaurantAddMenuForm.jsx

import React, { useState ,useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modal = ({ show, handleClose, addMenuItem }) => {
  const [image, setImage] = useState(null);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [cuisineName, setCuisineName] = useState("");
  
  const navigate = useNavigate();
 
  const animation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0%)' : 'translateY(-50%)',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("dishName", dishName);
    formData.append("price", parseFloat(price));
    formData.append("description", description);
    formData.append("cuisineName", cuisineName);

 


    console.log("Form data being sent: ", {
      dishName, price: parseFloat(price), description, cuisineName, image: image.name
    });

    try {
      const response = await Axios.post(`${import.meta.env.VITE_API_URL}/api/menu/ResMenu`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Item could not be added!");
      }

      toast.success("Item added successfully!");
      addMenuItem(response.data); // Add this line to update the parent component
      handleClose();
      navigate(0);
    } catch (error) {
      toast.error("Item could not be added!");
      console.error(error);
    }
  };

  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm z-10 bg-gray-600 bg-opacity-50">
          <animated.div style={animation} className="bg-white rounded-lg p-6 z-10 w-1/3 mt-16 font-display">
            <form onSubmit={handleSubmit}>
              <h1 className='font-bold text-xl pb-3'>
                Add new item
              </h1>
              <div className='flex gap-x-3 mb-2'>
                <div className='w-60'>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-900">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Set Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='mb-2'>
                <label htmlFor="cuisine" className="block mb-1 text-sm font-medium text-gray-900">Cuisine Type</label>
                <input
                  type="text"
                  name="cuisine"
                  id="cuisine"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Cuisine Type"
                  value={cuisineName}
                  onChange={(e) => setCuisineName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-2'>
                <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">Product Description</label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write product description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900">Item Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className='flex gap-x-3'>
                <button
                  className="mt-4 bg-neutral-900 hover:scale-[0.95] text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add item
                </button>
                <button
                  className="mt-4 bg-gray-300 py-2 px-4 rounded hover:scale-[0.95]"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </animated.div>
        </div>
      )}
    </>
  );
}

export default Modal;