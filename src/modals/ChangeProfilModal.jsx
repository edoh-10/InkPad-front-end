// EditProfileModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiUser, FiMail, FiEdit3, FiCamera, FiSave, FiInfo } from 'react-icons/fi'; // Icônes
import { useUserProfil } from '../Context/UserProfileContext';

const EditProfileModal = () => {
    // déclaration des state import depuis useUserProfil
    const {changeProfil, setChangeProfil} = useUserProfil();
    // déclaration de fonction pour changer le state changeprofil
    const  onClose = () => {
        if(changeProfil){
            setChangeProfil(false) 
        }
    }

    // initialisation de variable pour l'url de base de l'api
    const url_base_api = "https://inkpad.onrender.com/api/user/";
    // récupération du token
    const token = localStorage.getItem("authToken");

    // déclaration du state user 
    const {user, setUser} = useUserProfil();
    const userData = user;
    // récupération de l'idée de l'utilisateur
    const userId = userData[5];
    const date = userData[4];

  // États pour les champs du formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatarFile] = useState(""); // Pour le fichier image
  const [avatarPreview, setAvatarPreview] = useState(null); // Pour l'aperçu de l'image
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null); // Référence pour le champ de fichier caché

  // Pré-remplir le formulaire avec les données de l'utilisateur lorsque le modal s'ouvre ou que l'utilisateur change
  useEffect(() => {
    if (userData) {
      setUsername(userData[0] || '');
      setEmail(userData[1] || '');
      setBio(userData[3] || '');
      setAvatarPreview(userData[2] || 'https://placehold.co/150x150/7e5bef/white?text=Avatar&font=raleway');
    } else {
      // Valeurs par défaut si aucun utilisateur n'est fourni
      setUsername('Utilisateur InkPad');
      setEmail('utilisateur@example.com');
      setBio('');
      setAvatarPreview('https://placehold.co/150x150/7e5bef/white?text=Avatar&font=raleway');
    }
    // Réinitialiser le fichier avatar et les erreurs à chaque ouverture
    setAvatarFile("");
    setError('');
  }, [changeProfil, user]); // Se déclenche si changeProfil ou user change

  // Gérer le changement de fichier pour l'avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limite de 2MB pour l'avatar
        setError('L\'image est trop volumineuse (max 2MB).');
        setAvatarFile(null);
        setAvatarPreview(user?.avatarUrl || 'https://placehold.co/150x150/7e5bef/white?text=Avatar&font=raleway');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Format d\'image non valide (JPEG, PNG, GIF, WEBP autorisés).');
        setAvatarFile(null);
        setAvatarPreview(user?.avatarUrl || 'https://placehold.co/150x150/7e5bef/white?text=Avatar&font=raleway');
        return;
      }
      setError('');
      setAvatarFile(file);
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !email.trim()) {
      setError('Le nom d\'utilisateur et l\'e-mail sont requis.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('bio', bio);
    if(avatar){
      formData.append('avatar', avatar)
    }
    
    try {
        const response = await fetch(`${url_base_api}${userId}`, {
          method: "PUT",
          headers: {
            // 'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: formData,
        });

        if(!response.ok){
          const errorData = await response.json()
          throw new Error(errorData.message || "Erreur lors de l\'envoie des données", Error.message);
        }else{
          setTimeout(() => {
            setError("Profil mis à jour avec succès");
          }, 100);
        }

        const data = await response.json();
        // console.log(data);
        // console.log("modifier avec succès")

        // mis à jour de l'état global avec les nouvel donées 
        setUsername(data.updatedUser.usernme);
        setEmail(data.updatedUser.email);
        setBio(data.updatedUser.bio);
        if(data.updatedUser.avatar){
          setAvatarPreview(data.updatedUser.avatar);
        }

        const upUser = [data.updatedUser.username, data.updatedUser.email, data.updatedUser.avatar, data.updatedUser.bio, date, userId]
        setUser(upUser);




    } catch (error) {
      console.error("Erreur :", error.message)
      console.error("error.message");
    }
   
    setIsLoading(false);
  };

  // Si le modal n'est pas ouvert, ne rien rendre
  if (!changeProfil) {
    return null;
  }

  return (
    <div 
      className="fixed z-[102] inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
     onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Modifier votre profil</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Fermer le modal"
            disabled={isLoading}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm" role="alert">
              <div className="flex items-center">
                <FiInfo className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Champ Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src={avatarPreview}
              alt="Aperçu de l'avatar"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-indigo-200"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/cccccc/333333?text=Img&font=raleway"; }}
            />
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleAvatarChange}
              className="hidden" // Caché, activé par le bouton ci-dessous
              ref={fileInputRef}
              id="avatarUpload"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()} // Ouvre le sélecteur de fichier
              disabled={isLoading}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 px-3 rounded-md border border-indigo-200 hover:bg-indigo-50 transition-colors"
            >
              <FiCamera className="w-4 h-4 mr-2" />
              Changer l'avatar
            </button>
          </div>

          {/* Champ Nom d'utilisateur */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiUser className="w-5 h-5 text-gray-400" />
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
                placeholder="Votre nom d'utilisateur"
                required
              />
            </div>
          </div>

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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
                placeholder="vous@exemple.com"
                required
              />
            </div>
          </div>

          {/* Champ Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Biographie (optionnel)
            </label>
            <div className="relative">
              <span className="absolute top-3.5 left-0 flex items-center pl-3">
                <FiEdit3 className="w-5 h-5 text-gray-400" />
              </span>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
                placeholder="Quelques mots sur vous..."
              ></textarea>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto flex justify-center items-center py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex justify-center items-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiSave className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
      {/* Style pour l'animation d'apparition du modal (identique au UserProfileModal) */}
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

export default EditProfileModal;
