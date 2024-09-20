// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category) => {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      // console.log("Fetched products for category:", category, data); // Log category and products
      return { category, products: data };
    }
  );
  

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    mens: [],
    womens: [],
    jewelry: [],
    electronics: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.category === 'men\'s clothing') {
          state.mens = action.payload.products;
        } else if (action.payload.category === 'women\'s clothing') {
          state.womens = action.payload.products;
        } else if (action.payload.category === 'jewelery') {
          state.jewelry = action.payload.products;
        } else if (action.payload.category === 'electronics') {
          state.electronics = action.payload.products;
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
