import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DeliveryDetails = () => {
    const [showForm, setShowForm] = useState(false);
    const [address, setAddress] = useState(null);
    const [formData, setFormData] = useState({ fullName: '', phoneNumber: '', address: '', pinCode: '' });

    const productDetails = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const navigate = useNavigate();

    const deliveryFee = 50;
    const platformFee = 49;
    const orderTotal = totalPrice - 87 + deliveryFee + platformFee;

    const handleAddAddressClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleProceedToPayment = () => {
        navigate('/payment');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitAddress = (e) => {
        e.preventDefault();
        setAddress(formData);
        setShowForm(false);
    };

    return (
        <div className="p-4 flex flex-col min-h-screen relative bg-gray-100">
            {/* Walmart Logo and Step Progress Bar */}
            <div className="flex flex-col items-start mb-8">
                <div className="text-4xl font-bold text-blue-600 mb-4">Walmart</div>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                        <div className="icon bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            👜
                        </div>
                        <span className="ml-2">Bag</span>
                    </div>
                    <div className="line bg-gray-300 h-1 w-12"></div>
                    <div className="flex items-center">
                        <div className="icon bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            📍
                        </div>
                        <span className="ml-2">Delivery Details</span>
                    </div>
                    <div className="line bg-gray-300 h-1 w-12"></div>
                    <div className="flex items-center">
                        <div className="icon bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                            ₹
                        </div>
                        <span className="ml-2 text-gray-500">Payment</span>
                    </div>
                </div>

                {/* Delivery Details Text with Location Icon */}
                <div className="flex items-center justify-center mt-4">
                    <FaMapMarkerAlt className="text-gray-500 text-2xl mr-2" /> 
                    <span className="text-lg text-gray-700">We will deliver your order to this address</span>
                </div>
            </div>

            {/* Product and Order Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Products</h2>
                    {productDetails.map((item) => (
                        <div key={item.id} className="flex items-center mb-4 p-4 border rounded-lg shadow-lg bg-white">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-32 h-32 object-cover" 
                            />
                            <div className="ml-4">
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <p className="text-gray-600">Size: {item.size}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="font-bold text-blue-600">${item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Details Box */}
                <div className="p-4 border w-full max-w-sm mx-auto bg-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
                    <div className="mb-4">
                        <p className="text-gray-600">Bag total: <span className="float-right">${totalPrice.toFixed(2)}</span></p>
                        <p className="text-gray-600">Bag discount: <span className="float-right">- $87.00</span></p>
                        <p className="text-gray-600">Delivery Fee: <span className="float-right">${deliveryFee.toFixed(2)}</span></p>
                        <p className="text-gray-600">Platform Fee: <span className="float-right">${platformFee.toFixed(2)}</span></p>
                        <p className="font-bold text-gray-800">Order Total: <span className="float-right">${orderTotal.toFixed(2)}</span></p>
                    </div>
                    <button 
                        className="bg-blue-600 text-white p-4 rounded w-full hover:brightness-110"
                        onClick={handleProceedToPayment}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>

            {/* Add Address Section */}
            <div className="mb-8">
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
                    onClick={handleAddAddressClick}
                >
                    Add Address
                </button>
                {address && (
                    <div className="mt-4 p-4 bg-gray-100 border rounded">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Saved Address:</h3>
                        <p><strong>Full Name:</strong> {address.fullName}</p>
                        <p><strong>Phone Number:</strong> {address.phoneNumber}</p>
                        <p><strong>Address:</strong> {address.address}</p>
                        <p><strong>Pin Code:</strong> {address.pinCode}</p>
                    </div>
                )}
            </div>

            {/* Address Form (Pop-up Modal) */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
                        <h2 className="text-xl font-bold mb-4">Add Your Address</h2>
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseForm}
                        >
                            &times;
                        </button>
                        <form onSubmit={handleSubmitAddress}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded" 
                                    placeholder="Enter your full name" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded" 
                                    placeholder="Enter your phone number" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <textarea 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded" 
                                    placeholder="Enter your address" 
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Pin Code</label>
                                <input 
                                    type="text" 
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded" 
                                    placeholder="Enter your pin code" 
                                />
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Address</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-auto">
                <div className="flex flex-col items-center mt-8"></div>
            </footer>
        </div>
    );
};

export default DeliveryDetails;
