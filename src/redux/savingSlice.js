import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products from fakestoreapi
export const fetchLowPriceProducts = createAsyncThunk(
  'saving/fetchLowPriceProducts',
  async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Sort by price and return the lowest priced products
      return data.sort((a, b) => a.price - b.price).slice(0, 20); // Fetch top 20 cheapest products
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-throw to be caught by the slice
    }
  }
);

const savingSlice = createSlice({
  name: 'saving',
  initialState: {
    products: [],
    status: 'idle', // Initial state
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLowPriceProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLowPriceProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchLowPriceProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default savingSlice.reducer;
