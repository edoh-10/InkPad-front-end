// ResetPasswordForm.jsx
import React, { useState } from 'react';
import { FiLock, FiCheckCircle } from 'react-icons/fi'; // Icônes

const ResetPasswordForm = ({ token, onPasswordReset, onSwitchToLogin }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    // Simulation d'un appel API pour la réinitialisation du mot de passe
    try {
      // console.log('Tentative de réinitialisation du mot de passe avec token:', token, 'et nouveau mot de passe.');
      // Simuler un appel API
      // const response = await fakeResetPasswordApi(token, newPassword);
      // if (response.success) {
      //   setSuccess('Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.');
      //   setNewPassword('');
      //   setConfirmPassword('');
      //   // Optionnel: rediriger automatiquement après un délai
      //   setTimeout(() => {
      //     if(onSwitchToLogin) onSwitchToLogin();
      //   }, 3000);
      // } else {
      //   setError(response.message || 'Le lien de réinitialisation est invalide ou a expiré. Veuillez refaire une demande.');
      // }

      // Pour la démo
      setSuccess('Votre mot de passe a été réinitialisé avec succès (simulation) ! Vous pouvez maintenant vous connecter.');
      setNewPassword('');
      setConfirmPassword('');
      if(onPasswordReset) onPasswordReset(token, newPassword);
      setTimeout(() => {
        if(onSwitchToLogin) onSwitchToLogin();
      }, 3000);


    } catch (err) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Réinitialiser votre mot de passe
      </h2>
      <p className="text-center text-sm text-gray-600">
        Veuillez saisir votre nouveau mot de passe ci-dessous.
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

        {/* Champ Nouveau Mot de passe */}
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="new-password"
              name="new-password"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Saisissez votre nouveau mot de passe"
            />
          </div>
        </div>

        {/* Champ Confirmer Nouveau Mot de passe */}
        <div>
          <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le nouveau mot de passe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="confirm-new-password"
              name="confirm-new-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Confirmez votre nouveau mot de passe"
            />
          </div>
        </div>

        {/* Bouton de Réinitialisation */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <FiCheckCircle className="mr-2 h-5 w-5" />
            Réinitialiser le mot de passe
          </button>
        </div>
      </form>

      {success && (
        <p className="text-sm text-center text-gray-600 mt-4">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Retourner à la page de connexion
          </button>
        </p>
      )}
    </div>
  );
};

export default ResetPasswordForm;
