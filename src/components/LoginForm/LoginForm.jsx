// LoginForm.jsx
import React, { useState } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'; // Icônes pour email, mot de passe, connexion
// const api_base_url = "http://localhost:5000/api";
const api_base_url = "https://inkpad.onrender.com/api";

const LoginForm = ({ onLogin, onSwitchToSignUp, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Pour afficher les messages d'erreur
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Réinitialiser les erreurs précédentes

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    try {
      // console.log('Tentative de connexion avec:', { email });
      const response = await fetch(`${api_base_url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error)
        
      }
      
      // connexion réussir 
      // console.log('Connexion réussie, data reçue: Token', data);

      // stokage du token
      // if(data.token){
      //   localStorage.setItem('authToken', data.token);
      // }else{
      //   console.warn('Aucun token reçu du backend après la connexion.');
      // }

        if(onLogin){
          onLogin(data.user, data.token);
        }  // Appeler la fonction onLogin passée en prop


    } catch (data) {
      console.error("Erreur de connexion:", data);
      setError(data.error ||"Email ou mot de pass incorrect");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Connexion à InkPad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">
            {error}
          </p>
        )}
        {/* Champ Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse e-mail
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="vous@exemple.com"
            />
          </div>
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Votre mot de passe"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-900">
              Se souvenir de moi
            </label>
          </div> */}
          {/* <button
            type="button"
            onClick={onForgotPassword}
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Mot de passe oublié ?
          </button> */}
        </div>

        {/* Bouton de Connexion */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {/* <FiLogIn className="mr-2 h-5 w-5" />
            Se Connecter */}
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FiLogIn className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </div>
      </form>

      <p className="text-sm text-center text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
        >
          Inscrivez-vous ici
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
