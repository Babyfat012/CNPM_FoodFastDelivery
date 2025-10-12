import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Details = ({ restaurantId }) => {
    const [restaurantName, setRestaurantName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [stateName, setStateName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [editable, setEditable] = useState(false);
    const navigate = useNavigate();

    const callResDetails = async () => {
        try {
            const res = await fetch('http://localhost:3000/auth/RestaurantLayout/ResDetails', {
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
            setRestaurantName(data.restaurantName || '');
            setOwnerName(data.ownerName || '');
            setCountryName(data.countryName || '');
            setStateName(data.stateName || '');
            setCity(data.city || '');
            setAddress(data.address || '');
            setPhone(data.phone || '');
            setEmail(data.email || '');
        } catch (err) {
            console.log(err);
            navigate('/ResLogin');
        }
    };

    useEffect(() => {
        callResDetails ();
    }, [restaurantId]);

    const handleCancel = () => {
        setEditable(false);
        // Optionally clear form or reset state here
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/auth/updateDetails/${restaurantId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ restaurantName, ownerName, countryName, stateName, city, address, phone, email }),
            });

            if (!response.ok) {
                throw new Error("Could not update !!");
            }
            toast.success("Updated successfully!");
            setEditable(false);
        } catch (error) {
            toast.error("Could not update information!");
            setEditable(false);
        }
    };

    return (
        <div className='bg-gray-100 ml-60 mt-[78px] w-full font-display min-h-screen'>
            <form className='my-8 mx-32 flex flex-col bg-white gap-y-4 pb-8 shadow-md' onSubmit={handleSubmit}>
                <div className='flex '>
                    <div className='w-full'>
                        <h1 className='flex justify-center items-center font-bold text-3xl mt-4'>
                            {restaurantName}
                        </h1>
                    </div>
                    <button className='p-2 mt-4 flex justify-end items-center mr-10 bg-gray-100 rounded-md hover:bg-gray-200'
                        onClick={() => setEditable(true)}
                        type='button'>
                        <MdEdit size={24} />
                    </button>
                </div>
                <div className='flex justify-center gap-x-10 '>
                    <div className='w-80'>
                        <label htmlFor="restaurantName" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Restaurant Name</label>
                        <input
                            type="text"
                            id="restaurantName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                    <div className='w-80'>
                        <label htmlFor="ownerName" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Owner's Name</label>
                        <input
                            type="text"
                            id="ownerName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                </div>
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="countryName" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Country Name</label>
                        <input
                            type="text"
                            id="countryName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                    <div className='w-80'>
                        <label htmlFor="stateName" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">State Name</label>
                        <input
                            type="text"
                            id="stateName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                </div>
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="city" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">City</label>
                        <input
                            type="text"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                    <div className='w-80'>
                        <label htmlFor="address" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                </div>
                <div className='flex justify-center gap-x-10'>
                    <div className='w-80'>
                        <label htmlFor="phone" className="block mb-1 ml-1 text-sm font-semibold text-gray-900 ">Contact No</label>
                        <input
                            type="tel"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                    <div className='w-80'>
                        <label htmlFor="email" className="block mb-1 ml-1 text-sm font-semibold text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editable} />
                    </div>
                </div>
                <div className='flex justify-center gap-x-10'>
                    <button type="submit" className={`w-40 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 ${!editable && 'hidden'}`}>Save</button>
                    <button type="button" className={`w-40 py-2 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 ${!editable && 'hidden'}`} onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Details;
