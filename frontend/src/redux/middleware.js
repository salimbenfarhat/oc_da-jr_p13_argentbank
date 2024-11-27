// src/redux/middleware.js

// Les middlewares sont des fonctions qui interceptent les actions dispatchées vers le store Redux. 
// Ils peuvent modifier l'action, la rejeter ou exécuter du code avant ou après qu'elle atteigne le reducer.

// Définition du middleware pour logger les actions dispatchées
// Ce middleware affiche les actions dispatchées dans la console pour le débogage.
const loggerMiddleware = store => next => action => {
  console.log('Dispatching action:', action);
  return next(action);
};

// Export du middleware 
export const middleware = [loggerMiddleware];
