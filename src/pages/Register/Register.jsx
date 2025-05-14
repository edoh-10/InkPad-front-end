// RegisterPage.jsx
import React from 'react';
// import Footer from '../../features/Footer/Footer'; // Assurez-vous que le chemin est correct
import RegisterForm from '../../components/RegisterForm/RegisterForm'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate(); 

  const handleSuccessfulRegister = (userData) => {
    // console.log('Nouvel utilisateur inscrit:', userData);
    // avant de rediriger vers la page de connexion.
    // Pour l'instant, on redirige vers la connexion après un court délai (géré dans RegisterForm).
  };

  const handleSwitchToLogin = () => {
    // console.log('Redirection vers la page de connexion');
    navigate('/login'); 
    // alert('Redirection vers la page de connexion...');
    // window.location.href = '/login'; // Redirection simple
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mt-[10vh] mb-[5vh] ">
        <div className="mb-8 text-center">
          <a href="/" className="text-4xl font-bold text-indigo-600 hover:text-indigo-700">
            InkPad
          </a>
        </div>
        <RegisterForm 
          onRegister={handleSuccessfulRegister}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RegisterPage;
