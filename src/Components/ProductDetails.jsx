import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa"; // Import heart icon
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cart";
import { addToWishlist } from "../redux/Wishlist"; // Import the wishlist action

const ProductDetails = () => {
  const { productId } = useParams(); // Captures the product ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items); // Get wishlist items from Redux
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);

        const similarResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
        const similarData = await similarResponse.json();

        // Filter out the current product and limit to 4 similar products
        const similar = similarData.filter((item) => item.id !== parseInt(productId)).slice(0, 4);
        setSimilarProducts(similar);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]); // This will run whenever the productId changes

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
      size: selectedSize,
    };

    dispatch(addToCart(cartItem));
    alert(`${product.title} has been added to your cart!`);
  };

  const handleAddToWishlist = (product) => {
    const wishlistItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
    };

    // Check if item is already in wishlist
    const isItemInWishlist = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (isItemInWishlist) {
      alert("This item is already in your wishlist.");
      return;
    }

    dispatch(addToWishlist(wishlistItem));
    alert(`${product.title} has been added to your wishlist!`);
  };

  if (!product) {
    return <p>Product Loading......</p>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="relative flex-shrink-0 w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-w-full max-h-[500px]"
          />
          <button
            className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
            onClick={() => handleAddToWishlist(product)}
          >
            <FaHeart />
          </button>
        </div>
        <div className="flex-grow w-full lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
          <div className="flex items-center mb-4">
            <FaStar className="text-green-500 mr-2" />
            <p className="text-lg font-medium text-gray-700">
              {product.rating?.rate || 0} / 5 ({product.rating?.count || 0} reviews)
            </p>
          </div>
          <p className="text-lg font-bold text-red-600 mb-4">
            MRP: {product.price}
          </p>
          <div className="border border-dotted p-4 mb-4">
            <p className="text-lg font-medium text-gray-700">Offer Code:</p>
            <p className="text-gray-600">Use code SAVE10 for 10% off</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Size:</p>
            <div className="flex space-x-2">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${selectedSize === size
                      ? 'bg-[#062f3d] text-white border-[#062f3d]'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex mb-4 space-x-2">
            <button
              className="text-white p-4 rounded hover:brightness-110"
              style={{ backgroundColor: 'rgb(66, 165, 245)', width: '300px' }}
              onClick={handleAddToCart}
            >
              👜 Add to Cart
            </button>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Product Details</h3>
          <p className="text-md font-medium text-gray-700 mb-2">Brand: {product.brand || 'Unknown'}</p>
          <p className="text-md font-medium text-gray-700 mb-4">Category: {product.category || 'Unknown'}</p>
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Description:</p>
            <p className="text-gray-600">{product.description || 'No description available'}</p>
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-4 inline-block px-4 py-2 text-gray-500">
          ____________________________________________________________ Similar Products ____________________________________________________________
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="relative bg-white rounded-lg shadow-md p-4">
              <img
                src={similarProduct.image}
                alt={similarProduct.title}
                className="object-contain w-full h-48"
              />
              <button
                className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
                onClick={() => handleAddToWishlist(similarProduct)}
              >
                <FaHeart />
              </button>
              <h4 className="text-md font-semibold mb-2">{similarProduct.title}</h4>
              <p className="text-lg font-bold text-red-600 mb-4">{similarProduct.price}</p>
              <button
                className="bg-[#062f3d] text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                onClick={() => navigate(`/product/${similarProduct.id}`)} // Navigate to the clicked product
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
