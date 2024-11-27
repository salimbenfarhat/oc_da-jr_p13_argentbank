import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '../thunks/authThunk'; // Import du thunk de connexion
import { loadAuthState } from '../thunks/loadAuthStateThunk'; // Import du thunk de chargement de l'état d'authentification


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
  },
  extraReducers: (builder) => {
    // extraReducers : gère les reducers pour les actions asynchrones (thunks)
    builder
      .addCase(loadAuthState.pending, (state) => {
        // Lorsque le thunk loadAuthState commence
        state.status = 'loading';
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        // Lorsque le thunk loadAuthState réussit
        state.status = 'succeeded';
        state.isAuthenticated = action.payload !== null; // true si un token est trouvé
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        // Lorsque le thunk loadAuthState échoue
        state.status = 'failed';
        state.error = action.error.message; // Récupérer le message d'erreur
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(loginThunk.pending, (state) => {
        // Lorsque le thunk loginThunk commence
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        // Lorsque le thunk loginThunk réussit
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.token = action.payload.body.token; // Récupérer le token de la réponse
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        // Lorsque le thunk loginThunk échoue
        state.status = 'failed';
        state.error = action.payload; // Récupérer le message d'erreur
        state.isAuthenticated = false;
      });
    },
});

// Export des actions du slice
export const { logout, setAuthenticated } = authSlice.actions;

// Export du reducer du slice
export default authSlice.reducer;