import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthenticated } from '../slices/authSlice';

// Vérifie l'existence d'un token dans le localStorage ou le sessionStorage
// et met à jour l'état d'authentification en conséquence.
export const loadAuthState = createAsyncThunk(
  'auth/loadAuthState',
  async (_, { dispatch }) => {
    
    let token = localStorage.getItem('token'); 
    if (!token) {
      token = sessionStorage.getItem('token'); 
    }
    if (token) {
      try {
        // Dispatcher l'action pour mettre à jour l'état d'authentification
        dispatch(setAuthenticated(true)); 
        return token;
      } catch (error) {
        console.error('Erreur lors du chargement de l\'état d\'authentification :', error);
        // Dispatcher l'action pour indiquer que l'utilisateur n'est pas authentifié
        dispatch(setAuthenticated(false)); 
      }
    } else {
      // Si aucun token n'est trouvé, dispatcher l'action pour indiquer que l'utilisateur n'est pas authentifié
      dispatch(setAuthenticated(false));
    }
  },
);