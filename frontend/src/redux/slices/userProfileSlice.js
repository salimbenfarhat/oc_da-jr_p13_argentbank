import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, updateUserThunk } from '../thunks/userProfileThunk';

// État initial du slice de profil utilisateur.
// firstName et lastName : contiennent les informations du prénom et du nom de l'utilisateur (null initialement).
// status : indique l'état actuel de la requête ('idle', 'loading', 'succeeded', 'failed').
// error : contient un message d'erreur en cas d'échec.
const initialState = {
  firstName: null,
  lastName: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Création du slice de profil utilisateur avec createSlice.
const userProfileSlice = createSlice({
  name: 'userProfile', // Nom du slice
  initialState, // État initial
  reducers: {}, // Pas de reducers synchrones pour ce slice
  extraReducers: (builder) => {
    // Gestion des états pour les actions asynchrones (thunks)
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        // Lorsque le thunk fetchUserThunk commence
        state.status = 'loading';
        state.error = null; // Réinitialisation de l'erreur
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        // Lorsque le thunk fetchUserThunk réussit
        state.status = 'succeeded';
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        state.error = null;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        // Lorsque le thunk fetchUserThunk échoue
        state.status = 'failed';
        state.error = action.error.message; // Récupérer le message d'erreur
      })
      .addCase(updateUserThunk.pending, (state) => {
        // Lorsque le thunk updateUserThunk commence
        state.status = 'loading';
        state.error = null; // Réinitialisation de l'erreur
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        // Lorsque le thunk updateUserThunk réussit
        state.status = 'succeeded';
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        // Lorsque le thunk updateUserThunk échoue
        state.status = 'failed';
        state.error = action.error.message; // Récupérer le message d'erreur
      });
  },
});

// Export du reducer du slice
export default userProfileSlice.reducer;