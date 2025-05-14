// LoginPage.jsx
import React from 'react';
// import Header from './Header'; // Optionnel: vous pouvez choisir de ne pas avoir de header complet sur la page de login
// import Footer from './Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useUserProfil } from '../../Context/UserProfileContext';
import { useEffect } from 'react';


const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {authState, setAuthState} = useAuth();
    const {userDat, setUserDat} = useUserProfil();

  const handleSuccessfulLogin = (userData1, token) => {
    // console.log('Utilisateur connecté:', userData1);
    // setUserDat(userData1)
    // console.log(userData1.username)
    // mis à jour l'état global de l'application
    login(userData1, token);
  };

  useEffect(() => {
    if (authState.isAuthenticated){
      navigate("/inkpad", {replace: true})
    }
  }, [authState.isAuthenticated, navigate])

  const handleSwitchToSignUp = () => {
    // console.log('Redirection vers la page d\'inscription');
    navigate('/regiter');
    // alert('Redirection vers la page d\'inscription...');
    // window.location.href = '/signup';
  };

  const handleForgotPassword = () => {
    // console.log('Redirection vers la page de mot de passe oublié');
    navigate('/forgot-password');
    // alert('Redirection vers la page de mot de passe oublié...');
    // window.location.href = '/forgot-password';
  };

  return ( 
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Vous pouvez choisir d'avoir un Header simplifié ou pas de Header ici */}
      {/* <Header logoText="InkPad" /> */}
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          {/* Logo simple si pas de Header complet */}
          <a href="/" className="text-4xl font-bold text-indigo-600 hover:text-indigo-700">
            JinkPad
          </a>
        </div>
        <LoginForm 
          onLogin={handleSuccessfulLogin}
          onSwitchToSignUp={handleSwitchToSignUp}
          onForgotPassword={handleForgotPassword}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
