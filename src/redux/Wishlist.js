import { createSlice } from '@reduxjs/toolkit';
import { saveWishlistToLocalStorage, getWishlistFromLocalStorage } from '../Utils/Wishlist/localStorage';

const initialState = getWishlistFromLocalStorage();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const { id, price, quantity, size } = action.payload;
            const existingItemIndex = state.items.findIndex(
                item => item.id === id && item.size === size
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push(action.payload);
            }

            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            saveWishlistToLocalStorage(state);
        },
        removeFromWishlist: (state, action) => {
            const { itemId, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === itemId && item.size === size));

            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            saveWishlistToLocalStorage(state);
        },
        updateWishlistItem: (state, action) => {
            const { itemId, size, quantity } = action.payload;
            const itemIndex = state.items.findIndex(
                item => item.id === itemId && item.size === size
            );

            if (itemIndex >= 0) {
                state.items[itemIndex].quantity = quantity;
            }

            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            saveWishlistToLocalStorage(state);
        },
        clearWishlist: (state) => {
            state.items = [];
            state.totalPrice = 0;
            saveWishlistToLocalStorage(state);
        },
    },
});

export const { addToWishlist, removeFromWishlist, updateWishlistItem, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
