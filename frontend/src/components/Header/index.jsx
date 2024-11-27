// src/components/Header/index.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ARGENTBANK_LOGO from '../../assets/img/argentBankLogo.png';
import { logout } from '../../redux/slices/authSlice'
import '../Header/index.scss';

function Header() {
  // Hook pour dispatcher les actions Redux
  const dispatch = useDispatch();
  // Hook pour accéder à l'état d'authentification depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Hook pour accéder au prénom de l'utilisateur connecté depuis le store Redux
  const userFirstName = useSelector((state) => state.userProfile.firstName);

  // Fonction gérant le clic sur le bouton de déconnexion.
  // Empêche le comportement par défaut du lien et dispatch l'action de déconnexion.
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={ARGENTBANK_LOGO}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="header-right">
        {/* Affichage conditionnel basé sur l'état d'authentification */}
        {isAuthenticated ? (
          // Si l'utilisateur est connecté, afficher son prénom et le bouton de déconnexion
          <>
            <i className="fa fa-user-circle main-nav-item"></i>
            <span className="main-nav-item">{userFirstName}</span>
            <NavLink className="main-nav-active" to="/login" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </NavLink>
          </>
        ) : (
          // Sinon, afficher le lien de connexion
          <>
            <NavLink className="main-nav-active" to="/login">
              <i className="fa fa-user-circle"></i> Sign In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;