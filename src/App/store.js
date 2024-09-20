// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; // Adjust the import path if needed
import savingReducer from '../redux/savingSlice';
import computerReducer from '../redux/computerSlice';
import productsReducer from '../redux/productsSlice';
import WishlistReducer from '../redux/Wishlist';
import cartReducer from '../redux/Cart'

const store = configureStore({
  reducer: {
    auth: authReducer,
    saving: savingReducer,
    computer: computerReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist:WishlistReducer
    
  },
});

export default store;
