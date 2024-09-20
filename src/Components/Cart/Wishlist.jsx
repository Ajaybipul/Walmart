import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/Wishlist';
import { addToCart } from '../../redux/Cart';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaTrash } from 'react-icons/fa';
// Import formatPrice

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = (itemId, size) => {
        dispatch(removeFromWishlist({ itemId, size }));
    };

    const handleAddToBag = (item) => {
        dispatch(addToCart(item));
        alert(`${item.title} has been added to your cart!`);
    };

    const handleContinueShopping = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div className="p-4 flex flex-col min-h-screen">
            {wishlistItems.length === 0 ? (
                <div className="flex-grow text-center">
                    <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty!</h1>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
                        onClick={handleContinueShopping}
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-center">My Wishlist</h1>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {wishlistItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="relative flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg w-80 h-auto"
                            >
                                <button 
                                    onClick={() => handleRemoveItem(item.id, item.size)} 
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-60 object-contain mb-4 rounded-lg"
                                />
                                <h2 className="font-bold text-center mb-2">{item.title}</h2>
                                <p className="font-bold text-center mb-4">
                                    ${(item.price)} {/* Use formatPrice here */}
                                </p>
                                <button 
                                    onClick={() => handleAddToBag(item)} 
                                    className="absolute bottom-2 left-2 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    <FaShoppingBag className="mr-2" /> 
                                    
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Footer Images */}
            <div className="flex flex-col items-center mt-auto">
                {/* <img 
                    src="/Cart/footer.JPG" 
                    alt="Footer" 
                    className="w-full h-auto object-cover"
                /> */}
            </div>
        </div>
    );
};

export default Wishlist;
