import React, { useEffect, useState, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import ResEditDelMenuDialog from './ResEditDelMenuDialog';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RestaurantMenuCard = (props) => {
    const [inStock, setInStock] = useState(props.inStock);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dialogRef.current &&
            !dialogRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsDialogOpen(false);
        }
    };

    // After InStock Toggle fetch request to backend to update the stock
    const handleInStockChange = async () => {
        setInStock(!inStock); // Optimistically update UI

        try {
            const response = await fetch(`http://localhost:3000/api/menu/toggleStock/${props.cardId}`, {
                credentials: 'include',
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inStock: !inStock }),
            });

            if (!response.ok) {
                throw new Error("Could not update!!");
            }

            toast.success("Updated Stock successfully!");
        } catch (error) {
            console.error(error);
            setInStock(!inStock); // Revert the optimistic update
            toast.error("Could not update Stock!");
        }
    }

    useEffect(() => {
        if (isDialogOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Unmount the event listener 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDialogOpen]);

    return (
        <>
            <div className='flex items-center my-8 mx-24 border border-neutral-300 bg-white rounded-xl'>
                <div className='flex justify-center items-center h-44 w-44'>
                    <img src={props.src} alt="food image" className='h-[70%] w-[70%] object-cover size-60' />
                </div>
                <div className='flex flex-col gap-y-3 ml-5 py-4 w-[700px]'>
                    <div className='flex justify-between items-center max-w-[680px]'>
                        <div className='flex gap-x-8'>
                            <h1 className='text-xl font-semibold'>
                                {props.title}
                            </h1>
                            <div className='bg-neutral-200 rounded-lg text-sm px-2 py-1'>
                                {props.cuisineName}
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <label className="inline-flex items-center cursor-pointer">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                                    {inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                                <input type="checkbox" checked={inStock} className="sr-only peer"
                                    onChange={handleInStockChange} />
                                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                            <div className='flex relative'>
                                <button className='hover:bg-neutral-200 hover:rounded-full p-2'
                                    onClick={() => { setIsDialogOpen(!isDialogOpen) }}
                                    ref={buttonRef}>
                                    <BsThreeDotsVertical size={20} />
                                </button>
                                {isDialogOpen && (
                                    <ResEditDelMenuDialog
                                        ref={dialogRef}
                                        id={props.cardId}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='flex flex-wrap max-w-[680px]'>
                            {props.description}
                        </p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>
                            {props.price}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantMenuCard;
