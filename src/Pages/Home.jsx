import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ProductList from '../Components/ProductList'; // Adjust the path to your ProductList component
import FeedbackComponent from '../Components/Feedback';

export default function Home() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  return (
    <div>
      {/* Trending section - cover more screen width */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
        {/* Left two-column section */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Editor's pick */}
          <div
            className="bg-white-100 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/mens')} // Navigate to /jewelry
          >
            <img src="images/h1.png" alt="A pair of stylish shoes" className="mt-4 rounded-lg" />
          </div>

          {/* Men's collection */}
          <div
            className="bg-white-100 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/mens')} // Navigate to /mens
          >
            <img src="images/h2.png" alt="Men's clothing" className="mt-4 rounded-lg" />
          </div>

          {/* Trending banner */}
          <div
            className="col-span-2 bg-gray-90 p-4 rounded-lg flex items-center cursor-pointer"
            onClick={() => navigate('/saving')} // Navigate to /electronics
          >
            <img src="images/bh.png" alt="Person with a bicycle" className="ml-4 rounded-lg" />
          </div>

          {/* Fall fashion */}
          <div
            className="bg-gray-80 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/womens')} // Navigate to /womens
          >
            <img src="images/lh2.png" alt="Fashionable person in fall clothing" className="mt-4 rounded-lg" />
          </div>

          {/* Beauty section */}
          <div
            className="bg-white-80 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/jewelry')} // Navigate to /jewelry
          >
            <img src="images/lh.png" alt="Beauty products" className="mt-4 rounded-lg" />
          </div>
        </div>

        {/* Right single-column section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Porch picks */}
          <div
            className="bg-yellow-80 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/saving')} // Navigate to /saving
          >
            <img src="images/h3.png" alt="Porch decor" className="mt-4 rounded-lg" />
          </div>

          {/* Discounted items */}
          <div
            className="bg-yellow-80 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/electronics')} // Navigate to /electronics
          >
            <img src="images/h4.png" alt="Discounted items" className="mt-4 rounded-lg" />
          </div>

          {/* Stylish shoes */}
          <div
            className="bg-yellow-80 p-4 rounded-lg cursor-pointer"
            onClick={() => navigate('/womens')} // Navigate to /mens
          >
            <img src="images/lh2.png" alt="Stylish shoes" className="mt-4 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <ProductList />

      {/* Toy Shop Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4 cursor-pointer"
            onClick={() => navigate('/saving')} // Navigate to /saving
          >
            <div className="relative">
              <img src="images/wal3.png" alt="Banner with text 'This way to The Toy Shop'" className="w-full rounded-lg" />
              <div className="absolute top-4 left-4"></div>
              <div className="absolute bottom-4 left-4 flex space-x-4"></div>
            </div>
          </div>

          {/* Individual toy sections */}
          <div
            className="bg-blue-80 rounded-lg shadow p-4 cursor-pointer"
            onClick={() => navigate('/electronics')} // Navigate to /electronics
          >
            <img src="images/h3.png" alt="Little Tikes toy" className="w-full mt-4 rounded-lg" />
          </div>
          <div
            className="bg-green-80 rounded-lg shadow p-4 cursor-pointer"
            onClick={() => navigate('/saving')} // Navigate to /saving
          >
            <img src="images/h4.png" alt="Playdate toy" className="w-full mt-4 rounded-lg" />
          </div>
          <div
            className="bg-green-80 rounded-lg shadow p-4 cursor-pointer"
            onClick={() => navigate('/electronics')} // Navigate to /electronics
          >
            <img src="images/h3.png" alt="Transformers toy" className="w-full mt-4 rounded-lg" />
          </div>
          <div
            className="bg-white rounded-lg shadow p-4 cursor-pointer"
            onClick={() => navigate('/jewelry')} // Navigate to /jewelry
          >
            <img src="images/img2.png" alt="Halloween toy" className="w-full mt-4 rounded-lg" />
          </div>
        </div>
        <FeedbackComponent/>
      </div>
    </div>
  );
}
