import { createSlice } from '@reduxjs/toolkit';

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
});

// Export du reducer du slice
export default userProfileSlice.reducer;