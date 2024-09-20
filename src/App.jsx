// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './index.css';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Savings from './Pages/Savings';
import ComputerCategoryPage from './Components/ComputerCategoryPage';
import JewelryPage from './Components/Jewellery';
import ElectronicsPage from './Components/Electronics';
import MensPage from './Components/Mens';
import WomensPage from './Components/Womens';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Cart/Wishlist';
import DeliveryDetails from './Components/Cart/DeliveryDetails';
import PaymentPage from './Components/Cart/PaymentPage';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
import Fashion from './Components/Fashion';
import RegistryPage from './Components/Registry';
import { refreshToken } from './redux/authSlice';

function App() {
  const dispatch = useDispatch();
  const { accessToken, tokenRefreshTime } = useSelector((state) => state.auth);

  useEffect(() => {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    if (accessToken && (now - tokenRefreshTime) > tenMinutes) {
      dispatch(refreshToken());
    }

    const interval = setInterval(() => {
      if (accessToken && (Date.now() - tokenRefreshTime) > tenMinutes) {
        dispatch(refreshToken());
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch, accessToken, tokenRefreshTime]);

  const PrivateRoute = ({ element }) => (
    accessToken ? element : <Navigate to="/login" />
  );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saving" element={<Savings />} />
        <Route path="/computer" element={<ComputerCategoryPage />} />
        <Route path="/jewelry" element={<JewelryPage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/womens" element={<WomensPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/registry" element={<RegistryPage />} />
        {/* Protected Routes */}
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/wishlist" element={<PrivateRoute element={<Wishlist />} />} />
        <Route path="/delivery-details" element={<PrivateRoute element={<DeliveryDetails />} />} />
        <Route path="/payment" element={<PrivateRoute element={<PaymentPage />} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
