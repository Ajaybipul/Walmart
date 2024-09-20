import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLowPriceProducts } from '../redux/savingSlice';
import { FaStar, FaStarHalfAlt, FaRegStar, FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FeedbackComponent from '../Components/Feedback';
 // Import the saving image

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { products, status, error } = useSelector((state) => state.saving);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isFilterByRating, setIsFilterByRating] = useState(false);
  const [isFilterByPriceAscending, setIsFilterByPriceAscending] = useState(false);
  const [isFilterByBelow100, setIsFilterByBelow100] = useState(false);
  const [isFilterByAbove100, setIsFilterByAbove100] = useState(false);
  const [isFilterByRatingAbove3, setIsFilterByRatingAbove3] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLowPriceProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded') {
      setFilteredProducts(products);
      setOriginalProducts(products);
    }
  }, [products, status]);

  useEffect(() => {
    let updatedProducts = [...originalProducts];

    if (isFilterByRating) {
      updatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    if (isFilterByPriceAscending) {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (isFilterByBelow100) {
      updatedProducts = updatedProducts.filter((product) => product.price < 100);
    }

    if (isFilterByAbove100) {
      updatedProducts = updatedProducts.filter((product) => product.price >= 100);
    }

    if (isFilterByRatingAbove3) {
      updatedProducts = updatedProducts.filter((product) => product.rating.rate > 3);
    }

    setFilteredProducts(updatedProducts);
  }, [
    isFilterByRating,
    isFilterByPriceAscending,
    isFilterByBelow100,
    isFilterByAbove100,
    isFilterByRatingAbove3,
    originalProducts,
  ]);

  const handleRatingFilterChange = (e) => setIsFilterByRating(e.target.checked);
  const handlePriceAscendingFilterChange = (e) => setIsFilterByPriceAscending(e.target.checked);
  const handleBelow100FilterChange = (e) => setIsFilterByBelow100(e.target.checked);
  const handleAbove100FilterChange = (e) => setIsFilterByAbove100(e.target.checked);
  const handleRatingAbove3FilterChange = (e) => setIsFilterByRatingAbove3(e.target.checked);

  const clearFilters = () => {
    setIsFilterByRating(false);
    setIsFilterByPriceAscending(false);
    setIsFilterByBelow100(false);
    setIsFilterByAbove100(false);
    setIsFilterByRatingAbove3(false);
    setFilteredProducts(originalProducts);
  };

  const toggleRatingDropdown = () => setIsRatingDropdownOpen(!isRatingDropdownOpen);
  const togglePriceDropdown = () => setIsPriceDropdownOpen(!isPriceDropdownOpen);

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
        {filteredProducts.map((product) => (
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
      <main className="py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl text-gray-800 mb-8">Saving</h1>

          {/* Add saving image below the "Saving" text */}
          <img src="images/saving.png" alt="Saving" className="w-full h-auto mb-8" />

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex ">
              <div className="bg-white p-4 rounded-lg shadow-md flex gap-8 items-center">
                {/* Rating Filter Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center justify-between text-black py-2 px-4 rounded border hover:bg-gray-200 transition-colors w-48"
                    onClick={toggleRatingDropdown}
                  >
                    Rating
                    <FaAngleDown className="ml-1" />
                  </button>
                  {isRatingDropdownOpen && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-2 p-4 w-48 border">
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByRating"
                          checked={isFilterByRating}
                          onChange={handleRatingFilterChange}
                        />
                        <label htmlFor="filterByRating" className="ml-2">Sort by Rating</label>
                      </div>
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByRatingAbove3"
                          checked={isFilterByRatingAbove3}
                          onChange={handleRatingAbove3FilterChange}
                        />
                        <label htmlFor="filterByRatingAbove3" className="ml-2">Rating Above 3</label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Filter Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center justify-between text-black py-2 px-4 rounded border hover:bg-gray-200 transition-colors w-48"
                    onClick={togglePriceDropdown}
                  >
                    Price
                    <FaAngleDown className="ml-1" />
                  </button>
                  {isPriceDropdownOpen && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-2 p-4 w-48 border">
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByPriceAscending"
                          checked={isFilterByPriceAscending}
                          onChange={handlePriceAscendingFilterChange}
                        />
                        <label htmlFor="filterByPriceAscending" className="ml-2">Sort by Price</label>
                      </div>
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByBelow100"
                          checked={isFilterByBelow100}
                          onChange={handleBelow100FilterChange}
                        />
                        <label htmlFor="filterByBelow100" className="ml-2">Below $100</label>
                      </div>
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByAbove100"
                          checked={isFilterByAbove100}
                          onChange={handleAbove100FilterChange}
                        />
                        <label htmlFor="filterByAbove100" className="ml-2">$100 & Above</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                className=" text-black py-1 px-2 ml-2 rounded hover:bg-blue-300 transition-colors"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <h2 className='font bold'> Savings</h2>
          
          {content}
        </div>
        <FeedbackComponent/>
      </main>
    </div>
  );
};

export default ProductList;
