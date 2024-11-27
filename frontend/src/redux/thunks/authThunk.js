import { loginUser } from '../services/apiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour authentifier l'utilisateur
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const responseData = await loginUser(email, password);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
