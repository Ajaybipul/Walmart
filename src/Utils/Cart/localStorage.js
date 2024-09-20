// src/Utils/localStorageUtils.js

export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], totalPrice: 0 };
};

export const clearCartFromLocalStorage = () => {
    localStorage.removeItem('cart');
};
