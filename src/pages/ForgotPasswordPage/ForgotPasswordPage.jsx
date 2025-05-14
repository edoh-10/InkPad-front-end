// ForgotPasswordPage.jsx
import React from 'react';
// import Footer from './Footer'; // Assurez-vous que le chemin est correct
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom'; // Si vous utilisez React Router

const ForgotPasswordPage = () => {
  const navigate = useNavigate(); // Pour la redirection

  const handleRequestReset = (email) => {
    // console.log('Demande de réinitialisation de mot de passe soumise pour:', email);
    // La logique principale est dans le formulaire, ici on pourrait logger ou autre
  };

  const handleSwitchToLogin = () => {
    // console.log('Redirection vers la page de connexion');
    navigate('/login'); 
    // alert('Redirection vers la page de connexion...');
    // window.location.href = '/login'; // Redirection simple
  };

  return (
    <div className="flex flex-col h-auto bg-gray-100 ">
      {/* Un en-tête minimaliste ou juste le logo */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mt-[8vh]">
        <div className="mb-8 text-center">
          <a href="/" className="text-4xl font-bold text-indigo-600 hover:text-indigo-700">
            InkPad
          </a>
        </div>
        <ForgotPasswordForm
          onRequestReset={handleRequestReset}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ForgotPasswordPage;
