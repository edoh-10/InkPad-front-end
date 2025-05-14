// UserProfileModal.jsx
import React, { useCallback } from "react";
import { FiX, FiUser, FiMail, FiEdit2, FiLogOut } from "react-icons/fi"; // Icônes
import { useUserProfil } from "../Context/UserProfileContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useUserProfil();
  const { user } = useUserProfil();
  const { profilImage, setProfilImage } = useUserProfil();
  const { changeProfil, setChangeProfil } = useUserProfil();
  const { profilExistData, setProfilExistData } = useUserProfil();
  const { logout } = useAuth();

  //   initialisation de variable pour les donné de l'utilisateur
  const userData = user;
  // initialisation du state pour le profilExiteData
  setProfilExistData(userData);

  //   fonction pour ouvrir le modals de changement des infos du profil
  const onEditProfile = () => {
    if (!changeProfil) {
      setChangeProfil(true);
    }
  };

  // Si le modal n'est pas ouvert, ne rien rendre
  if (isOpen) {
    return null;
  }

  // fonction toggle pour fermer le modals
  const onClose = () => {
    if (!isOpen) {
      setIsOpen(!false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  //   fonction pour afficher l'image du profil en grand
  const openProfilImage = () => {
    if (!profilImage) {
      setProfilImage(true);
    }
  }; 

  //   fonction pour la déconection
  const Logout = (e) => {
    e.preventDefault();
    logout();
    onClose();
    navigate("/");
  };

  // Données utilisateur par défaut si aucune n'est fournie (pour l'exemple)
  const defaultUser = {
    name: "Utilisateur InkPad",
    email: "utilisateur@example.com",
    avatarUrl:
      "https://placehold.co/100x100/7e5bef/white?text=Avatar&font=raleway", // Placeholder pour l'avatar
    bio: "Passionné par la prise de notes et l'organisation.",
    memberSince: new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
    }),
  };

  const currentUser = user || defaultUser;
  const createDate = new Date(currentUser[4]);
  const normalDate = createDate.toLocaleString("fr-FR");

  return (
    // Overlay semi-transparent pour l'arrière-plan
    <div
      className="fixed z-[100] inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleModalClick} // Permet de fermer le modal en cliquant en dehors
    >
      {/* Conteneur du modal */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur du modal
      >
        {/* En-tête du modal avec titre et bouton de fermeture */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Votre Profil</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Fermer le modal"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Contenu du profil */}
        <div className="space-y-6">
          {/* Section Avatar et Nom */}
          <div className="flex flex-col items-center space-y-3">
            <button onClick={openProfilImage}>
              <img
                src={currentUser[2]}
                alt={`Avatar de ${currentUser[0]}`}
                className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-indigo-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/cccccc/333333?text=Img&font=raleway";
                }}
              />
            </button>
            <h3 className="text-xl font-semibold text-gray-700">
              {/* name */}
              {currentUser[0]}
            </h3>
          </div>

          {/* Informations détaillées */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FiMail className="w-5 h-5 mr-3 text-indigo-500" />
              {/* email */}
              <span>{currentUser[1]}</span>
            </div>

            {/* bio */}
            {currentUser[3] && (
              <div className="text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Bio :</p>
                {/* bio */}
                <p className="text-sm italic pl-1">{currentUser[3]}</p>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              {/* membre depuis */}
              <span>Membre depuis : {normalDate}</span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="md:flex md:justify-around md:items-center pt-2 border-t border-gray-200 space-y-2 sm:space-y-0 ">
            <button
              onClick={onEditProfile}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <FiEdit2 className="mr-2 h-4 w-4" />
              Modifier le Profil
            </button>

            <button
              onClick={Logout}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      {/* Style pour l'animation d'apparition du modal */}
      <style jsx global>{`
        @keyframes modalShow {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-modalShow {
          animation: modalShow 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserProfileModal;
