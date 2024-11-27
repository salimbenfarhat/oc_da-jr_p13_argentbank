// src/pages/Dashboard/index.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, updateUserThunk } from "../../redux/thunks/userProfileThunk";
import "../Dashboard/index.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Dashboard() {
  // Récupération du prénom de l'utilisateur depuis le store Redux.
  const userFirstName = useSelector((state) => state.userProfile.firstName);
  // Récupération du nom de l'utilisateur depuis le store Redux.
  const userLastName = useSelector((state) => state.userProfile.lastName);
  // Hook pour dispatcher des actions Redux.
  const dispatch = useDispatch();
  // Récupération du token d'authentification depuis le store Redux.
  const userToken = useSelector((state) => state.auth.token);
  // État pour contrôler l'affichage du formulaire d'édition.
  const [editView, setEditView] = useState(false);
  // État pour stocker le prénom saisi dans le formulaire d'édition.
  const [firstName, setFirstName] = useState(userFirstName);
  // État pour stocker le nom saisi dans le formulaire d'édition.
  const [lastName, setLastName] = useState(userLastName);

  // Effet qui se déclenche après chaque rendu et récupère les données du profil utilisateur.
  useEffect(() => {
    // Si un token d'authentification est présent...
    if (userToken) {
      // ...on déclenche le thunk pour récupérer les informations du profil.
      dispatch(fetchUserThunk(userToken));
    }
    // L'effet ne se déclenche que si userToken ou dispatch changent.
  }, [userToken, dispatch]);

  // Fonction qui affiche le formulaire d'édition.
  const updateProfile = async () => {
    setEditView(true);
  };

  // Fonction qui gère la sauvegarde des modifications du profil.
  const handleSave = async () => {
    // Envoi de la requête pour mettre à jour le profil via le thunk updateUserThunk
    dispatch(updateUserThunk({ token: userToken, firstName, lastName }));
    // Masque le formulaire après la sauvegarde
    setEditView(false);
  };

  // Fonction qui annule les modifications et ferme le formulaire.
  const handleCancel = () => {
    // Réinitialise les valeurs des champs de formulaire à celles récupérées depuis le store
    setFirstName(userFirstName);
    setLastName(userLastName);
    // Masque le formulaire
    setEditView(false);
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        {!editView ? (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {userFirstName} {userLastName}
            </h1>
            <button className='edit-button' onClick={updateProfile}>
              Edit Name
            </button>
          </div>
        ) : (
          <div className='header'>
            <h1>Welcome back</h1>
            <div className='edit-form'>
              <input
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={userFirstName}
              />
              <input
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                placeholder={userLastName}
              />
              <div className='edit-buttons'>
                <button className='cancel-button' onClick={handleCancel}>
                  Cancel
                </button>
                <button className='save-button' onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

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