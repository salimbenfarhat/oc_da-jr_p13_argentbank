// src/pages/Dashboard/index.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk } from "../../redux/thunks/userProfileThunk";
import "../Dashboard/index.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Dashboard() {
  // Utilisation du hook useSelector pour récupérer le prénom de l'utilisateur depuis le store Redux.
  const userFirstName = useSelector((state) => state.userProfile.firstName);
  // Utilisation du hook useSelector pour récupérer le nom de l'utilisateur depuis le store Redux.
  const userLastName = useSelector((state) => state.userProfile.lastName);
  // Utilisation du hook useDispatch pour dispatcher des actions Redux.
  const dispatch = useDispatch();
  // Utilisation du hook useSelector pour récupérer le token d'authentification depuis le store Redux.
  const userToken = useSelector((state) => state.auth.token);

  // Effet de bord React qui s'exécute après chaque rendu.
  // Il récupère les données du profil utilisateur si un token est présent.
  useEffect(() => {
    // Condition pour vérifier si un token d'authentification est disponible.
    if (userToken) {
      // Dispatch de l'action asynchrone fetchUserThunk pour récupérer les données du profil.
      // Le token est passé en argument pour l'authentification de la requête API.
      dispatch(fetchUserThunk(userToken));
    }
    // Tableau de dépendances pour useEffect.  L'effet ne se déclenchera que si userToken ou dispatch changent.
  }, [userToken, dispatch]);

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userFirstName} {userLastName}
          </h1>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;