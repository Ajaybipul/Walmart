import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../redux/Cart';
import { addToWishlist } from '../../redux/Wishlist';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = (itemId, size) => {
        dispatch(removeFromCart({ itemId, size }));
    };

    const handleQuantityChange = (itemId, size, quantity) => {
        dispatch(updateCartItem({ itemId, size, quantity }));
    };

    const handleAddToWishlist = (item) => {
        dispatch(addToWishlist(item));
        alert(`${item.title} has been added to your wishlist!`);
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const deliveryFee = 1;
    const platformFee = 3;
    const orderTotal = totalPrice - 4 + deliveryFee + platformFee;

    const handleProceedToShipping = () => {
        navigate('/delivery-details');
    };

    return (
        <div className="p-4 flex flex-col min-h-screen bg-gray-100">
            {/* Logo and Step Progress Bar */}
            <div className="flex flex-col items-start mb-8">
                <div className="text-4xl font-bold text-[#062f3d] mb-4">
                    Walmart
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                        <div className="icon bg-[#062f3d] text-white rounded-full w-8 h-8 flex items-center justify-center">
                            👜
                        </div>
                        <span className="ml-2 font-semibold">Bag</span>
                    </div>
                    <div className="line bg-gray-300 h-1 w-12"></div>
                    <div className="flex items-center">
                        <div className="icon bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                            📍
                        </div>
                        <span className="ml-2 text-gray-500">Delivery Details</span>
                    </div>
                    <div className="line bg-gray-300 h-1 w-12"></div>
                    <div className="flex items-center">
                        <div className="icon bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                            ₹
                        </div>
                        <span className="ml-2 text-gray-500">Payment</span>
                    </div>
                </div>
            </div>

            {/* Cart Items and Order Details */}
            {cartItems.length === 0 ? (
                <div className="flex-grow text-center">
                    <h1 className="text-3xl font-bold mb-4">Your Shopping Bag is Empty!</h1>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold mb-6">Cart ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</h1>
                        {cartItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="relative flex items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md"
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-32 h-32 object-cover"
                                />
                                <div className="flex-grow ml-6">
                                    <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        Quantity: 
                                        <select 
                                            value={item.quantity} 
                                            onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value))}
                                            className="ml-2 border p-1 rounded"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))} 
                                        </select>
                                    </p>
                                    <p className="font-bold text-lg mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="absolute bottom-2 right-2 flex space-x-3">
                                    <button 
                                        onClick={() => handleRemoveItem(item.id, item.size)} 
                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <FaTrash className="mr-1" />
                                    </button>
                                    <button 
                                        onClick={() => handleAddToWishlist(item)} 
                                        className="text-red-600 hover:text-red-800 flex items-center"
                                    >
                                        <FaHeart className="mr-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 h-auto">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="text-sm text-gray-600 mb-4">
                            <p className="mb-2">Bag total: <span className="float-right">${totalPrice.toFixed(2)}</span></p>
                            <p className="mb-2">Bag discount: <span className="float-right">$-87.00</span></p>
                            <p className="mb-2">Delivery Fee: <span className="float-right">${deliveryFee.toFixed(2)}</span></p>
                            <p className="mb-2">Platform Fee: <span className="float-right">${platformFee.toFixed(2)}</span></p>
                        </div>
                        <hr className="my-4" />
                        <p className="font-bold text-lg">Order Total: <span className="float-right">${orderTotal.toFixed(2)}</span></p>
                        <button 
                            className="bg-blue-600 text-white py-3 mt-6 w-full rounded-lg hover:bg-blue-700"
                            onClick={handleProceedToShipping}
                        >
                            Proceed to Shipping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
