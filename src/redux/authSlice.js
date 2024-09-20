// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', credentials);
  return response.data;
});

// Thunk to handle registration
export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('https://api.escuelajs.co/api/v1/users/', userData);
  return response.data;
});

// Thunk to handle token refresh
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState }) => {
  const { refreshToken } = getState().auth;
  if (!refreshToken) throw new Error('No refresh token available');
  
  const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', { refreshToken });
  return response.data;
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (accessToken) => {
  const response = await axios.get('https://api.escuelajs.co/api/v1/auth/user', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
    status: 'idle',
    error: null,
    tokenRefreshTime: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.tokenRefreshTime = null;
    },
    setTokenRefreshTime: (state, action) => {
      state.tokenRefreshTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        // Optionally fetch user data after login
        // dispatch(fetchUserData(action.payload.access_token));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch User Data
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Registration
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Token Refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.tokenRefreshTime = Date.now(); // Update token refresh time
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout, setTokenRefreshTime } = authSlice.actions;
export default authSlice.reducer;
