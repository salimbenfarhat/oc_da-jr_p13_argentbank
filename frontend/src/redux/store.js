// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userProfileSlice from './slices/userProfileSlice';
import { middleware } from './middleware'; 
import { loadAuthState } from './thunks/loadAuthStateThunk';

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

// Charger l'état d'authentification au démarrage de l'application
// On dispatch loadAuthState au démarrage pour vérifier si un token est présent 
// dans le localStorage ou le sessionStorage et pour mettre à jour l'état d'authentification en conséquence.
store.dispatch(loadAuthState());

// Export du store
export default store;