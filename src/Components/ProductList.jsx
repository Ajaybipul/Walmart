import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLowPriceProducts } from '../redux/savingSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { products, status, error } = useSelector((state) => state.saving);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLowPriceProducts());
    }
  }, [dispatch, status]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={index} className="text-black" />
          ))}
        {halfStar === 1 && <FaStarHalfAlt className="text-black" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={index} className="text-black" />
          ))}
      </div>
    );
  };

  let content;

  if (status === 'loading') {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (status === 'failed') {
    content = <p className="text-center text-red-500">Error: {error}</p>;
  } else if (status === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)} // Navigate to ProductDetails page on click
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>

            {/* Rating Section */}
            {product.rating && (
              <div className="flex items-center mt-2 mb-2">
                {renderStars(product.rating.rate)}
                <p className="text-gray-600 ml-2">({product.rating.count} reviews)</p>
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-bold text-black-600">${product.price}</p>
              <button className="bg-blue-400 text-black font-semibold py-2 px-4 rounded hover:bg-blue-500 transition-colors">
                +Add
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
    

      {/* Main Content */}
      <main className="">
        <div className="container mx-auto mt-8 ">
        <h1 className="text-3xl text-gray-800 mb-8">Flash Deal</h1>
           up to 65 % off
          {content}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
