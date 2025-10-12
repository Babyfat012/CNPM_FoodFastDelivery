import React from 'react';

const AddressPopup = ({ 
  showAddressPopup, 
  isEditing, 
  address, 
  setAddress, 
  country,
  setCountry,
  city,
  setCity,
  state,
  setState,
  handleAddressSubmit, 
  setShowAddressPopup, 
  setIsEditing 
}) => {
  return (
    showAddressPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? 'Edit Your Delivery Address' : 'Enter Your Delivery Address'}
          </h2>
          <form onSubmit={handleAddressSubmit}>
            <input
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
            <input
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required
            />
            <input
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
            <textarea
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              required
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddressPopup(false);
                  if (isEditing) setIsEditing(false);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300" 
                
              >
                {isEditing ? 'Update Address' : 'Submit Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddressPopup;