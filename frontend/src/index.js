// src/index.js
// Point d'entrée de l'application React. 
// Initialise le routeur et le store Redux, puis rend le composant principal.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'; // Importation du Provider
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate
} from "react-router-dom";

import './index.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import Error from './components/Error';

import store from './redux/store'; // Importation de votre store Redux
import PropTypes from 'prop-types';
import reportWebVitals from './reportWebVitals';

// Composant de route protégée
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Composant de fonction React pour la redirection après la connexion
const HandleLogin = () => {
  const navigate = useNavigate();
  navigate('/dashboard'); // Redirige l'utilisateur vers la page du tableau de bord
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,  // Page d'erreur à afficher en cas de route non trouvée
    children: [
      {
        path: "/", // Route pour la page d'accueil
        element: <Home />,
      },
      {
        path: "/login",  // Route pour la page de connexion
        element: <Login onLogin={<HandleLogin />} />,
      },
      {
        path: "erreur-404",  // Route pour afficher la page d'erreur personnalisée
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Enveloppé dans le Provider Redux */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();