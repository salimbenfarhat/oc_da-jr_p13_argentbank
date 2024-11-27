// src/pages/Login/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/thunks/authThunk';
import '../Login/index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Login() {
  // Hook useState pour gérer l'état des champs de formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //Récupérer l'erreur retournée par rejectWithValue dans le thunk
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Trigger le thunk qui gère le call API pour vérifier les identifiants
      const result = await dispatch(loginThunk({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        if (rememberMe) {
          // Enregistrer le token dans le localStorage si la case "Remember Me" est cochée
          localStorage.setItem('token', result.payload.body.token);
        } else {
          // Enregistrer le token dans le sessionStorage si la case "Remember Me" n'est pas cochée
          sessionStorage.setItem('token', result.payload.body.token);
        }
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire de connexion :', error);
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {/* Affichage du message d'erreur */}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
  
export default Login;