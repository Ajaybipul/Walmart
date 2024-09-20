// src/components/ComputerCategoryPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComputerCategoryProducts } from '../redux/computerSlice';
import { AiFillStar } from 'react-icons/ai'; // For star rating

const ComputerCategoryPage = () => {
  const dispatch = useDispatch();
  const { category, products, status, error } = useSelector((state) => state.computer);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComputerCategoryProducts());
    }
  }, [dispatch, status]);

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
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-bold text-blue-600">${product.price}</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <AiFillStar key={index} className="text-black" />
                ))}
              </div>
            </div>
            <button className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition-colors mt-4">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white text-center font-bold text-xl fixed top-0 left-0 right-0 z-50">
        Walmart Inspired Shop - Computer Category
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {category ? category.name : 'Loading Category...'}
          </h1>
          {content}
        </div>
      </main>
    </div>
  );
};

export default ComputerCategoryPage;
