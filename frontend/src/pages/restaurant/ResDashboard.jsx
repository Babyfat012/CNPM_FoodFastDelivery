import React, { useEffect, useState } from 'react';
import chef from '../../assets/chef image.webp';
import ResDashboardCard from '../../components/AfterLoginRestaurantCompo/ResDashboardCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResDashboard() {
  const [ResUser, setResUser] = useState([]);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const resId = localStorage.getItem('restaurantId');

  const callResDashboard = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/RestaurantLayout/ResDashBoard`, { // Update with the correct backend URL and port
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
  
      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      localStorage.setItem('restaurantId', data._id);
      console.log(data);
      setResUser(data);
      if (!data) {
        throw new Error("No data received");
      }
    } catch (err) {
      console.log(err);
      navigate('/ResLogin');
    }
  };

  const getOrders = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/getOrdersByResId/${resId}`,
            {
                withCredentials: true,
            }
        );
        console.log(res.data);
        setOrders(res.data);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/menu/ResMenu`)
    .then(result => setMenuItems(result.data))
    .catch(err => console.log(err));
}, []);

  useEffect(() => {
    callResDashboard();
    getOrders();
  }, []);

// 1. Fetch menu data from backend
// 2. Fetch total revenue from backend
 const ResDashboardCardData = [
  {
    description: "Total Menus",
    number: menuItems.length
  },
  {
    description: "Total Revenue",
    number: orders.reduce((a, b) => a + b.totalAmount, 0)
  },
  {
    description: "Items Sold",
    number: orders.reduce((total, order) => total + order.orderItems.reduce((c,item) => c+ item.quantity,0 ), 0)
  },
  {
    description: "Total Orders",
    number: orders.length
  }
 ]

  // Total menus, total revenue, items sold, No of orders will be fetched from backend 
  
  return (
    <div className='flex flex-col items-center ml-60 mt-[78px] w-full font-poppins'>
      <div className='text-3xl mt-8 font-semibold'>
        {ResUser ? ResUser.restaurantName : 'Loading...'}
      </div>
      <div className='inline-flex mt-12'>
        <div className='grid grid-cols-2 gap-8 h-72 ml-8'>
          {ResDashboardCardData.map((item, index) => (
            <ResDashboardCard
              key={index}
              number={item.number}
              description={item.description}
            />
          ))}
        </div>
        <div className='size-72 ml-20 -mt-16 bg-red-300'>
          <img src={chef} className='' alt='Chef' />
        </div>
      </div>
    </div>
  );
}

export default ResDashboard;