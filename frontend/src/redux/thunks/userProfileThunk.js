import { fetchUserProfile } from '../services/apiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserThunk = createAsyncThunk(
  'userProfile/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const responseData = await fetchUserProfile(token);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
