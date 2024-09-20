import React, { useState } from 'react';
import { FaShippingFast, FaStore, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const DeliveryOptionsComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Div containing the clickable text */}
      <div 
        className="hidden md:flex flex-col ml-4 cursor-pointer" 
        onClick={() => setIsModalOpen(true)}
      >
        <p className="font-semibold">How do you want your items?</p>
        <p className="text-sm">Sacramento, 95829 • Sacramento Supercenter</p>
      </div>

      {/* Modal for delivery options */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96 relative">
            <div className="bg-blue-800 text-white rounded-t-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-bold">How do you want your items?</p>
                <p className="text-sm">Sacramento, 95829 • Sacramento Supercenter</p>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div>

            <div className="flex justify-around my-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <FaShippingFast size={24} />
                </div>
                <p className="mt-2">Shipping</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <FaStore size={24} />
                </div>
                <p className="mt-2">Pickup</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-200 p-4">
                  <FaTruck size={24} />
                </div>
                <p className="mt-2">Delivery</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <p className="ml-2 text-gray-700">Add an address for shipping and delivery</p>
              </div>
              <p className="text-gray-500 ml-6">Sacramento, CA 95829</p>
              <button className="bg-blue-600 text-white rounded-full w-full py-2 mt-4">
                Add address
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <FaStore className="text-gray-500" />
              <div className="ml-2">
                <p className="font-bold">Sacramento Supercenter</p>
                <p className="text-gray-500">8915 GERBER ROAD, Sacramento, CA 95829</p>
              </div>
              <i className="fas fa-chevron-right ml-auto text-gray-500"></i>
            </div>

            {/* Close Modal Button */}
            <button 
              className="absolute top-2 right-2 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptionsComponent;
