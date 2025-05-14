// Navbar.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; // Exemple d'icônes FontAwesome
import { FiHome, FiInfo, FiBriefcase, FiMail, FiLogIn, FiLogOut } from 'react-icons/fi'; // Exemple d'icônes Feather
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // déclaration de navigate
    const navigate = useNavigate();
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // État pour simuler si l'utilisateur est connecté (à adapter avec votre logique d'authentification)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour basculer l'état du menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

//   fonction de redirection vers la page de connexion
  const LogIn = () => {
    if(window.location.pathname !== '/login'){
        navigate('/login', {replace: true});
    }
  };

  // Liens de navigation (vous pouvez les personnaliser)
  const navLinks = [
    { href: '#accueil', text: 'Accueil', icon: <FiHome size={20} className="mr-2" /> },
    { href: '#a-propos', text: 'À Propos', icon: <FiInfo size={20} className="mr-2" /> },
    { href: '#services', text: 'Services', icon: <FiBriefcase size={20} className="mr-2" /> },
    { href: '#contact', text: 'Contact', icon: <FiMail size={20} className="mr-2" /> },
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Section Logo/Nom du Projet */}
          <div className="text-2xl font-bold">
            <a href="/" className="hover:text-gray-300">InkPad</a>
          </div>

          {/* Liens de navigation pour grands écrans */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={`/${link.href}`}
                className="flex items-center px-1 py-2 text-[18px] rounded-md  font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            {/* Section Authentification/Utilisateur pour grands écrans */}
            <button
                onClick={LogIn} // Simule la connexion
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out"
              >
                <FiLogIn className="mr-2" />
                Connexion
              </button>
            {/* {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)} // Simule la déconnexion
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out"
              >
                <FiLogOut className="mr-2" />
                Déconnexion
              </button>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)} // Simule la connexion
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out"
              >
                <FiLogIn className="mr-2" />
                Connexion
              </button>
            )} */}
          </div>

          {/* Bouton Hamburger pour petits écrans */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Ouvrir le menu principal"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (apparaît lorsque isMobileMenuOpen est true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={`/${link.href}`}
                onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu après un clic
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            {/* Section Authentification/Utilisateur pour menu mobile */}
            <div className="border-t border-gray-700 pt-4 mt-2">
            <button
                    onClick={LogIn}
                    className="w-full flex items-center text-gray-300 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                    <FiLogIn className="mr-2" />
                    Connexion
                </button>
                {/* {isLoggedIn ? (
                <button
                    onClick={() => {
                        setIsLoggedIn(false);
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center text-gray-300 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                    <FiLogOut className="mr-2" />
                    Déconnexion
                </button>
                ) : (
                <button
                    onClick={() => {
                        setIsLoggedIn(true);
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center text-gray-300 hover:bg-green-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                    <FiLogIn className="mr-2" />
                    Connexion
                </button>
                )} */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
