// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userProfileSlice from './slices/userProfileSlice';
import { middleware } from './middleware'; 

// Configure le store Redux avec Redux Toolkit
// configureStore est une fonction de Redux Toolkit qui permet de configurer le store Redux 
// avec des options comme les reducers, les middlewares et d'autres configurations.
const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware) 
});

// Export du store
export default store;