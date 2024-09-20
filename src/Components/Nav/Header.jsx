import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaAngleDown } from 'react-icons/fa';
import { logout } from '../../redux/authSlice'; // Adjust the path if necessary
import { Button } from '@chakra-ui/react'; // Import the Button component
import SearchBar from './SearchBar'; // Import the SearchBar component
import DeliveryOptionsComponent from './deliveryoption';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (query) => {
    // Implement search functionality here
    console.log('Search query:', query);
    // Navigate based on the query
    if (query.toLowerCase().includes('mens')) {
      navigate('/mens');
    } else if (query.toLowerCase().includes('womens')) {
      navigate('/womens');
    } else if (query.toLowerCase().includes('electronics')) {
      navigate('/electronics');
    } else if (query.toLowerCase().includes('jewelry')) {
      navigate('/jewelry');
    } else {
      // Navigate to a default search results page or handle as needed
      navigate('/search');
    }
  };

  return (
    <header>
      {/* Top Header with Logo, Search Bar, and Cart/Account */}
      <div className="bg-blue-600 text-white py-3 px-4 flex items-center justify-between">
        {/* Left side: Walmart logo */}
        <div className="flex items-center">
          <img
            src="https://i5.walmartimages.com/dfw/63fd9f59-b3e1/7a569e53-f29a-4c3d-bfaf-6f7a158bfadd/v1/walmartLogo.svg"
            alt="Walmart Logo"
            className="w-16 h-auto mr-4"
          />
          
          {/* New Section: How do you want your items? (Visible only on desktop) */}
          <div className="hidden md:flex flex-col ml-4">
            {/* <p className="font-semibold">How do you want your items?</p>
            <p className="text-sm">Sacramento, 95829 • Sacramento Supercenter</p> */}

            <DeliveryOptionsComponent/>
          </div>
        </div>

        {/* Search Bar - Adjustable size on mobile */}
        <div className="flex-grow px-2 md:px-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Wishlist, Account, Cart Section - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/wishlist" className="flex items-center space-x-2 hover:text-gray-300">
            <FaHeart />
            <span>My Items</span>
          </Link>
          {accessToken ? (
            <div className="flex items-center space-x-2">
              <span className="hover:text-gray-300">Hi, {user?.name || 'Ajay'}</span>
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUser />
              <span>Account</span>
            </Link>
          )}
          <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-300">
            <FaShoppingCart />
            <span>$2.46</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-100 py-3 px-4">
        {/* Desktop View */}
        <ul className="hidden md:flex flex-wrap justify-between">
          {/* Departments Dropdown */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setIsDepartmentsOpen(true)}
            onMouseLeave={() => setIsDepartmentsOpen(false)}
          >
            <div className="flex items-center hover:text-blue-600">
              <span className="font-semibold">Departments</span> <FaAngleDown className="ml-1" />
            </div>
            {isDepartmentsOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md w-48 p-2 z-10 max-h-60 overflow-y-auto">
                <li><Link to="/saving" className="block py-2 hover:bg-blue-100">Savings</Link></li>
                <li><Link to="/" className="block py-2 hover:bg-blue-100">Home</Link></li>
                <li><Link to="/electronics" className="block py-2 hover:bg-blue-100">Electronics</Link></li>
                <li><Link to="/jewelry" className="block py-2 hover:bg-blue-100">Jewelry</Link></li>
                <li><Link to="/mens" className="block py-2 hover:bg-blue-100">Mens</Link></li>
                <li><Link to="/womens" className="block py-2 hover:bg-blue-100">Womens</Link></li>
                <li><Link to="/fashion" className="block py-2 hover:bg-blue-100">Fashion</Link></li>
                <li><Link to="/toyshop" className="block py-2 hover:bg-blue-100">Toy Shop</Link></li>
                <li><Link to="/registry" className="block py-2 hover:bg-blue-100">Registry</Link></li>
              </ul>
            )}
          </li>
          <span className="mx-2">|</span>

          {/* Services Dropdown */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="flex items-center hover:text-blue-600">
              <span className="font-semibold">Services</span> <FaAngleDown className="ml-1" />
            </div>
            {isServicesOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md w-48 p-2 z-10 max-h-60 overflow-y-auto">
                <li><a href="/wishlist" className="block py-2 hover:bg-blue-100">List</a></li>
                <li><a href="/cart" className="block py-2 hover:bg-blue-100">Online Order</a></li>
                <li><a href="/registry" className="block py-2 hover:bg-blue-100">Registry</a></li>
                
              </ul>
            )}
          </li>

          {/* Other Links */}
          <li className="flex-1 text-center"><Link to="/saving" className="block py-2 hover:text-blue-600">Savings</Link></li>
          <li className="flex-1 text-center"><Link to="/" className="block py-2 hover:text-blue-600">Home</Link></li>
          <li className="flex-1 text-center"><Link to="/fashion" className="block py-2 hover:text-blue-600">Fashion</Link></li>
          <li className="flex-1 text-center"><Link to="/electronics" className="block py-2 hover:text-blue-600">Electronics</Link></li>
          <li className="flex-1 text-center"><Link to="/jewelry" className="block py-2 hover:text-blue-600">Jewellery</Link></li>
          <li className="flex-1 text-center"><Link to="/mens" className="block py-2 hover:text-blue-600">Mens</Link></li>
          <li className="flex-1 text-center"><Link to="/womens" className="block py-2 hover:text-blue-600">Womens</Link></li>
          <li className="flex-1 text-center"><Link to="/registry" className="block py-2 hover:text-blue-600">Registry</Link></li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden flex flex-col space-y-2 bg-blue-600 text-white p-4">
          <li><Link to="/" className="block hover:bg-blue-500 py-2">Home</Link></li>
            <li><Link to="/saving" className="block hover:bg-blue-500 py-2">Savings</Link></li>
            <li><Link to="/electronics" className="block hover:bg-blue-500 py-2">Electronics</Link></li>
            <li><Link to="/jewelry" className="block hover:bg-blue-500 py-2">Jewellery</Link></li>
            <li><Link to="/mens" className="block hover:bg-blue-500 py-2">Mens</Link></li>
            <li><Link to="/womens" className="block hover:bg-blue-500 py-2">Womens</Link></li>
            <li><Link to="/registry" className="block hover:bg-blue-500 py-2">Registry</Link></li>
            <li><Link to="/fashion" className="block hover:bg-blue-500 py-2">Fashion</Link></li>

            {/* Sign In and Cart Buttons in Mobile Menu */}
            {accessToken ? (
              <>
                <li className="flex items-center justify-between">
                  <span>Hi, {user?.name || 'Welcome'}</span>
                  <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="block hover:bg-blue-500 py-2">Sign In</Link>
              </li>
            )}
            <li>
              <Link to="/cart" className="flex items-center space-x-2 hover:bg-blue-500 py-2">
                <FaShoppingCart />
                <span>$2.46</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
