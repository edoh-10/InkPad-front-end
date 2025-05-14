// RegisterForm.jsx
import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi"; // Icônes
// const api_base_url = "http://localhost:5000/api";
const api_base_url = "https://inkpad.onrender.com/api";

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setIsLoading(true);

    try {
        // console.log('Tentative d\'inscription avec:', { username, email, password });
      const response = await fetch(`${api_base_url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess(
        "Inscription réussie ! Vous allez être redirigé vers la page de connexion."
      );
      if (onRegister) {
        onRegister(data);
      }
      // console.log(data && data.token)

      // Réinitialiser les champs après succès
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000); // Redirige après 2 secondes
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.error || "Une erreur est survenue. Veuillez réessayer.");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Créer un compte InkPad
      </h2>
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

        {/* Champ Nom complet */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom complet
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiUser className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Votre nom complet"
            />
          </div>
        </div>

        {/* Champ Email */}
        <div>
          <label
            htmlFor="email-register"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adresse e-mail
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="email-register" // ID unique pour le champ email du formulaire d'inscription
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
          <label
            htmlFor="password-register"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mot de passe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="password-register" // ID unique
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Créez un mot de passe"
            />
          </div>
        </div>

        {/* Champ Confirmer Mot de passe */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Confirmez votre mot de passe"
            />
          </div>
        </div>

        {/* Bouton d'Inscription */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {/* <FiLogIn className="mr-2 h-5 w-5" />{" "} */}
            {/* L'icône FiUserPlus serait peut-être plus appropriée */}
            {/* S'inscrire */}
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FiLogIn className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </div>
      </form>

      <p className="text-sm text-center text-gray-600">
        Vous avez déjà un compte ?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
        >
          Connectez-vous ici
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
