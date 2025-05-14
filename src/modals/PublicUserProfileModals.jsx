// UserProfileModal.jsx
import React, { useCallback } from "react";
import { FiX, FiUser, FiMail, FiEdit2, FiLogOut } from "react-icons/fi"; // Icônes
import { useUserProfil } from "../Context/UserProfileContext";
import { UsePublicsNotes } from "../Context/PublicsNotesContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const PublicUserProfileModal = ({ onLogout }) => {
  const {publicsNotesState, setPublicNotesState} = UsePublicsNotes();
  const {publicsNotesData, setPublicNotesData} = UsePublicsNotes();
  const {publicProfilState, setPublicProfilState} = UsePublicsNotes();
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useUserProfil();
  const { user } = useUserProfil();

  //   initialisation de variable pour les donné de l'utilisateur
  const userData = user;
  // initialisation du state pour le profilExiteData
  // setProfilExistData(userData);

  //   fonction pour ouvrir le modals de changement des infos du profil
  // const onEditProfile = () => {
  //   if (!changeProfil) {
  //     setChangeProfil(true);
  //   }
  // };

  // Si le modal n'est pas ouvert, ne rien rendre
  if (!publicProfilState) {
    return null;
  }

  // fonction toggle pour fermer le modals
  const onClose = () => {
    if(publicProfilState){
            setPublicProfilState(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  //   fonction pour afficher l'image du profil en grand
  const openProfilImage = () => {
      setPublicNotesState(true);
  }; 

  //   fonction pour la déconection
  // const Logout = (e) => {
  //   e.preventDefault();
  //   onClose();
  //   navigate("/");
  // };

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

  const OneUser = publicsNotesData.user
  const currentUser  = OneUser || defaultUser;
  const createDate = new Date(currentUser.createdAt);
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
                src={currentUser.avatar}
                alt={`Avatar de ${currentUser.username}`}
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
              {currentUser.username}
            </h3>
          </div>

          {/* Informations détaillées */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FiMail className="w-5 h-5 mr-3 text-indigo-500" />
              {/* email */}
              <span>{currentUser.email}</span>
            </div>

            {/* bio */}
            {currentUser.bio && (
              <div className="text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Bio :</p>
                {/* bio */}
                <p className="text-sm italic pl-1">{currentUser.bio}</p>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              {/* membre depuis */}
              <span>Membre depuis : {normalDate}</span>
            </div>
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

export default PublicUserProfileModal;
