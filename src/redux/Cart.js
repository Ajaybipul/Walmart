import { createSlice } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, getCartFromLocalStorage } from '../Utils/Cart/localStorage';

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
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

            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const { itemId, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === itemId && item.size === size));

            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            saveCartToLocalStorage(state);
        },
        updateCartItem: (state, action) => {
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

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
