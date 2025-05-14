// ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi'; // Icônes

const ForgotPasswordForm = ({ onRequestReset, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // const api_base_url = 'http://localhost:5000/api/' 
    const api_base_url = 'https://inkpad.onrender.com/api/' 

    if (!email) {
      setError('Veuillez saisir votre adresse e-mail.');
      return;
    }

    // Simulation d'un appel API pour la demande de réinitialisation
    try {
      // console.log('Demande de réinitialisation pour:', email);
      // Simuler un appel API
      const response = await fetch(`${api_base_url}request/resetpass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        })
      });
      if (response.ok) {
        setSuccess('Si un compte existe pour cette adresse, un e-mail de réinitialisation a été envoyé.');
        setEmail(''); // Réinitialiser le champ
      } else {
        setError(response.message || 'Impossible de traiter la demande. Veuillez réessayer.');
      }

      const data = response.json();
      // console.log(data);

      // Pour la démo
      setSuccess(`Si un compte existe pour ${email}, un e-mail de réinitialisation a été envoyé (simulation).`);
      setEmail('');
      if(onRequestReset) onRequestReset(email);

    } catch (err) {
      console.error("Erreur lors de la demande de réinitialisation:", err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Mot de passe oublié ?
      </h2>
      <p className="text-center text-sm text-gray-600">
        Pas de souci ! Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md text-center">
            {success}
          </p>
        )}

        {/* Champ Email */}
        <div>
          <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse e-mail
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="email-forgot" // ID unique
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

        {/* Bouton d'Envoi */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <FiSend className="mr-2 h-5 w-5" />
            Envoyer le lien de réinitialisation
          </button>
        </div>
      </form>

      <p className="text-sm text-center text-gray-600">
        Vous vous souvenez de votre mot de passe ?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
