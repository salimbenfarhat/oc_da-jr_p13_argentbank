import { fetchUserProfile, updateUserProfile } from '../services/apiService';
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

// Action asynchrone pour mettre à jour le profil de l'utilisateur
export const updateUserThunk = createAsyncThunk(
  'userProfile/updateProfile',
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    try {
      const responseData = await updateUserProfile(token, firstName, lastName);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);