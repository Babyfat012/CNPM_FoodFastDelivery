import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import axios from 'axios';

const StatusBadge = ({ status }) => {
  let bgColor, textColor;
  switch (status) {
    case 'Preparing':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Ready':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'Out for delivery':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Delivered':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const Usersorder = () => {  

const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/getOrdersByUserId`,
        {withCredentials: true

        });
        if(response.status === 200){
          setOrders(response.data);
        }
        else{
          console.log("Error fetching orders");
        }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order?._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.paymentId?.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.restaurant?.restaurantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order?.orderItems?.map((item) => (
                      <p key={item?._id} className="text-sm">{item?.item?.dishName} x {item?.quantity}</p>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$ {order?.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <StatusBadge status={order?.orderStatus} />
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Usersorder;