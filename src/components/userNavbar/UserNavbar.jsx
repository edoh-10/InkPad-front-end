// Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Exemple d'icônes FontAwesome
import {
  FiHome,
  FiInfo,
  FiBriefcase,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi"; // Exemple d'icônes Feather
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserProfil } from "../../Context/UserProfileContext";
import { LuNotepadText } from "react-icons/lu";
import { useEffect } from "react";

import { Link } from "react-router-dom";

const   UserNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOpen, setIsOpen } = useUserProfil();
  const {user} = useUserProfil();

  // fonction pour ovrir le modals de profil
  const onOpen = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  const onOpenMobile = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  const Logout = (e) => {
    e.preventDefault();
    logout();
    navigate("/inkpad");
  };
  const LogoutMobile = (e) => {
    e.preventDefault();
    logout();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/inkpad");
  };

  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // État pour simuler si l'utilisateur est connecté (à adapter avec votre logique d'authentification)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour basculer l'état du menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Liens de navigation (vous pouvez les personnaliser)
  const navLinks = [
    {
      href: "/inkpad",
      text: "Accueil",
      icon: <FiHome size={24} className="mr-2" />,
    },
    // { href: "#a-propos", text: "À Propos", icon: <FiInfo className="mr-2" /> },
    // {
    //   href: "#services",
    //   text: "Services",
    //   icon: <FiBriefcase className="mr-2" />,
    // },
    { href: "/inkpad/mes-notes", text: "Mes Notes", icon: <LuNotepadText size={24} className="mr-2" /> },
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Section Logo/Nom du Projet */}
          <div className="text-2xl font-bold">
            <a href="/inkpad" className="hover:text-gray-300">
              InkPad
            </a>
          </div>

          {/* Liens de navigation pour grands écrans */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center px-3 py-2 rounded-md text-[18px] font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            {/* Section Authentification/Utilisateur pour grands écrans */}
            <button
              onClick={Logout} // Simule la déconnexion
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out"
            >
              <FiLogOut className="mr-2" />
              Déconnexion
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
            <button onClick={onOpen}>
              <img src={user[2]} alt="" className="rounded-full w-12 h-12 mr-2"/>
            </button>
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu après un clic
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                {link.icon}
                {link.text}
              </a>
            ))}
            {/* Section Authentification/Utilisateur pour menu mobile */}
            <div className="border-t border-gray-700 pt-4 mt-2">
              <button
                onClick={LogoutMobile}
                className="w-full flex items-center text-gray-300 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                <FiLogOut className="mr-2" />
                Déconnexion
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
              <div
                onClick={onOpenMobile}
                className="mt-2 flex items-center text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                <img src={user[2]} alt="" className="rounded-full w-12 h-12 mr-2"/> Profil
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
