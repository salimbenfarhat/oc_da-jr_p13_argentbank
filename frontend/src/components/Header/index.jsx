import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ARGENTBANK_LOGO from '../../assets/img/argentBankLogo.png';
import '../Header/index.scss';

function Header() {
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
      <div>
        <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i> Sign In
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;