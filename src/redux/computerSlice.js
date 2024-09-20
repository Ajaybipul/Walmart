// src/redux/computerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch category and products in one thunk
export const fetchComputerCategoryProducts = createAsyncThunk(
  'computer/fetchCategoryProducts',
  async () => {
    // Fetch category first
    const categoryResponse = await fetch('https://api.escuelajs.co/api/v1/categories');
    const categories = await categoryResponse.json();
    const computerCategory = categories.find(category => category.name.toLowerCase() === 'computer category');

    // Fetch products if category found
    if (computerCategory) {
      const productsResponse = await fetch(`https://api.escuelajs.co/api/v1/categories/${computerCategory.id}/products`);
      const products = await productsResponse.json();
      return { category: computerCategory, products };
    }

    throw new Error('Computer category not found');
  }
);

const computerSlice = createSlice({
  name: 'computer',
  initialState: {
    category: null,
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComputerCategoryProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComputerCategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.products = action.payload.products;
      })
      .addCase(fetchComputerCategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default computerSlice.reducer;
