import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../redux/productsSlice";
import { FaStar, FaAngleDown } from "react-icons/fa";
import FeedbackComponent from "./Feedback";

const MensPage = () => {
  const dispatch = useDispatch();
  const { mens, status, error } = useSelector((state) => state.products);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isFilterByRating, setIsFilterByRating] = useState(false);
  const [isFilterByPriceAscending, setIsFilterByPriceAscending] = useState(false);
  const [isFilterByBelow15, setIsFilterByBelow15] = useState(false);
  const [isFilterByAbove15, setIsFilterByAbove15] = useState(false);
  const [isFilterByRatingAbove3, setIsFilterByRatingAbove3] = useState(false);

  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsByCategory("men's clothing"));
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "succeeded") {
      setProducts(mens);
      setOriginalProducts(mens);
      setIsLoading(false);
    }
  }, [mens, status]);

  // Handle filtering logic
  useEffect(() => {
    let filteredProducts = [...originalProducts];

    if (isFilterByRating) {
      filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    if (isFilterByPriceAscending) {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (isFilterByBelow15) {
      filteredProducts = filteredProducts.filter((product) => product.price < 15);
    }

    if (isFilterByAbove15) {
      filteredProducts = filteredProducts.filter((product) => product.price >= 15);
    }

    if (isFilterByRatingAbove3) {
      filteredProducts = filteredProducts.filter((product) => product.rating.rate > 3);
    }

    setProducts(filteredProducts);
  }, [
    isFilterByRating,
    isFilterByPriceAscending,
    isFilterByBelow15,
    isFilterByAbove15,
    isFilterByRatingAbove3,
    originalProducts,
  ]);

  // Handling filter change
  const handleRatingFilterChange = (e) => setIsFilterByRating(e.target.checked);
  const handlePriceAscendingFilterChange = (e) => setIsFilterByPriceAscending(e.target.checked);
  const handleBelow15FilterChange = (e) => setIsFilterByBelow15(e.target.checked);
  const handleAbove15FilterChange = (e) => setIsFilterByAbove15(e.target.checked);
  const handleRatingAbove3FilterChange = (e) => setIsFilterByRatingAbove3(e.target.checked);

  const clearFilters = () => {
    setIsFilterByRating(false);
    setIsFilterByPriceAscending(false);
    setIsFilterByBelow15(false);
    setIsFilterByAbove15(false);
    setIsFilterByRatingAbove3(false);
    setProducts(originalProducts);
  };

  const toggleRatingDropdown = () => setIsRatingDropdownOpen(!isRatingDropdownOpen);
  const togglePriceDropdown = () => setIsPriceDropdownOpen(!isPriceDropdownOpen);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (status === "failed") {
    content = <p>Error: {error}</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
            </Link>
            <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold text-gray-900">${product.price}</p>
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                + Add to Cart
              </button>
            </div>
            <div className="flex items-center justify-center mt-2">
              <FaStar className="mr-1 text-xs" />
              <span className="text-xs">{product.rating?.rate || 0} / 5</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="pt-2">
        <div className="container mx-auto">
          <h1 className="text-2xl  text-gray-800 mb-2">Men's Clothing</h1>
          <img src="images/wal2.png" alt="Saving" className="w-full h-auto mb-8" />
          <img src="images/mens.png" alt="Saving" className="w-full h-auto mb-8" />
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
                        <label htmlFor="filterByPriceAscending" className="ml-2">Price: Low to High</label>
                      </div>
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByBelow15"
                          checked={isFilterByBelow15}
                          onChange={handleBelow15FilterChange}
                        />
                        <label htmlFor="filterByBelow15" className="ml-2">Below $15</label>
                      </div>
                      <div className="py-2">
                        <input
                          type="checkbox"
                          id="filterByAbove15"
                          checked={isFilterByAbove15}
                          onChange={handleAbove15FilterChange}
                        />
                        <label htmlFor="filterByAbove15" className="ml-2">Above $15</label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Filters Button */}
                <button
                  className=" text-black py-2 px-4 rounded hover:bg-blue-300 transition-colors"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
           
          </div>

          {/* Display Products */}
          {content}
        </div>
        <FeedbackComponent/>
      </main>
    </div>
  );
};

export default MensPage;
