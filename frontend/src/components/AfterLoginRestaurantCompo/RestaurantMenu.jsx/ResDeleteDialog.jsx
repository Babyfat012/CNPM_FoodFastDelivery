// src/components/Modal.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const DeleteDialog = ({ show, handleClose,delId }) => {

    const navigate = useNavigate();
    // Define the spring animation for the modal
    const animation = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0%)' : 'translateY(-50%)',
    });
console.log(delId);
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/DeleteMenu/${delId}`, {
                method: "DELETE",
                credentials: 'include'
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("Item could not be deleted successfully!");
            }
            handleClose();
            toast.success("Item deleted successfully!");
            navigate(0);
        } catch (error) {
            handleClose();
            toast.error("Item could not be deleted!");
        }
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50" onClick={handleClose}></div>
                    <animated.div style={animation} className="bg-white rounded-lg p-6 z-10 w-1/3 font-display">
                        <form >
                            <h1 className='font-bold text-xl pb-3'>
                                Are you sure you want to delete this item?
                            </h1>                               
                            <div className='flex gap-x-3'>
                                <button
                                    className="mt-4 bg-neutral-900 hover:scale-[0.95] text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDelete}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="mt-4 bg-gray-300 py-2 px-4 rounded hover:scale-[0.95]"
                                    onClick={handleClose}
                                    type='button'
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
};

export default DeleteDialog;
