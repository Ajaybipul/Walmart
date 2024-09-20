export const saveWishlistToLocalStorage = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const getWishlistFromLocalStorage = () => {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : { items: [], totalPrice: 0 };
};

export const clearWishlistFromLocalStorage = () => {
    localStorage.removeItem('wishlist');
};
