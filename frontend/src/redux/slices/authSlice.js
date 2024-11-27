import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice d'authentification.
// isAuthenticated : Booléen indiquant si l'utilisateur est connecté.
// token :  Le jeton JWT de l'utilisateur (null s'il n'est pas connecté).
// status :  L'état actuel du slice ('idle', 'loading', 'succeeded', 'failed').
// error :  Un message d'erreur éventuel.
const initialState = {
  isAuthenticated: false,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Création du slice d'authentification à l'aide de createSlice.
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState, // État initial
  reducers: {
    // Reducers pour les actions synchrones
    logout(state) {
      // Supprime le token du localStorage et du sessionStorage lors de la déconnexion
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Réinitialise l'état du slice d'authentification
      state.isAuthenticated = false;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    setAuthenticated(state, action) {
      // Action pour mettre à jour manuellement l'état d'authentification (peut être utile dans certains cas)
      state.isAuthenticated = action.payload;
    },
  }
});

// Export des actions du slice
export const { logout, setAuthenticated } = authSlice.actions;

// Export du reducer du slice
export default authSlice.reducer;