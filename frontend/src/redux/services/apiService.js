// URL de base de l'API
const BASE_URL = 'http://localhost:3001/api/v1';

// Fonction pour authentifier l'utilisateur
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/user/login`, {
    // Envoie une requête POST à l'API pour authentifier l'utilisateur
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  // Vérification de la réponse de l'API
  if (!response.ok) {
    throw new Error(`Impossible de se connecter: utilisateur introuvable. Code d'erreur: ${response.status}`);
  }

  // Convertit la réponse de l'API en JSON
  const responseData = await response.json();
  return responseData;
};

// Fonction pour récupérer le profil de l'utilisateur
export const fetchUserProfile = async (token) => {
  // Envoie une requête POST à l'API pour récupérer le profil de l'utilisateur
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Vérification de la réponse de l'API
  if (!response.ok) {
    throw new Error('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
  }

  // Convertit la réponse de l'API en JSON
  const responseData = await response.json();
  return responseData;
};

// Fonction pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = async (token, firstName, lastName) => {
  // Envoie une requête PUT à l'API pour mettre à jour le profil de l'utilisateur
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  // Vérification de la réponse de l'API
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour du profil. Veuillez réessayer plus tard.`);
  }
  
  // Convertit la réponse de l'API en JSON
  const responseData = await response.json();
  return responseData;
};