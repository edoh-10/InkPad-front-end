// ResetPasswordPage.jsx
import React, { useEffect, useState } from 'react';
// import Footer from './Footer'; 
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'; 
import { useNavigate, useSearchParams } from 'react-router-dom'; 

const ResetPasswordPage = () => {
  const navigate = useNavigate(); // Pour la redirection
  const [searchParams] = useSearchParams(); // Pour obtenir les paramètres de l'URL avec React Router
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulation de l'extraction du token depuis l'URL
    const urlToken = searchParams.get('token');
    // Ou avec window.location pour une approche plus simple sans router :
    // const params = new URLSearchParams(window.location.search);
    // const urlToken = params.get('token');

    if (urlToken) {
      setToken(urlToken);
      // console.log('Token extrait de l\'URL:', urlToken);
      // Ici, vous pourriez aussi faire un appel API pour valider le token avant d'afficher le formulaire
      // afin de vous assurer qu'il est toujours valide et n'a pas expiré.
      // Si le token est invalide, afficher un message d'erreur et ne pas montrer le formulaire.
    } else {
      console.error('Aucun token de réinitialisation trouvé dans l\'URL.');
      setError('Lien de réinitialisation invalide ou manquant. Veuillez refaire une demande de mot de passe oublié.');
    }
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'au montage et démontage.

  const handlePasswordResetSuccess = (receivedToken, newPassword) => {
    // console.log('Mot de passe réinitialisé avec succès pour le token:', receivedToken);
    // La logique de redirection est gérée dans le formulaire après succès
  };

  const handleSwitchToLogin = () => {
    // console.log('Redirection vers la page de connexion');
    // navigate('/login'); // Exemple avec React Router
    alert('Redirection vers la page de connexion...');
    window.location.href = '/login'; // Redirection simple
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <a href="/" className="text-4xl font-bold text-indigo-600 hover:text-indigo-700">
            InkPad
          </a>
        </div>
        {error ? (
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={() => window.location.href = '/forgot-password'} // Redirige vers la demande de mot de passe oublié
              className="mt-6 inline-block py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Demander un nouveau lien
            </button>
          </div>
        ) : token ? (
          <ResetPasswordForm
            token={token}
            onPasswordReset={handlePasswordResetSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        ) : (
          // Affichage pendant le chargement ou si le token n'est pas encore défini (avant que useEffect ne s'exécute)
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
             <p className="text-gray-700">Vérification du lien de réinitialisation...</p>
          </div>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ResetPasswordPage;
