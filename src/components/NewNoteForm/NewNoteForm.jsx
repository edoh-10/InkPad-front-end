// NewNoteForm.jsx
import React, { useState } from "react";
import { FiSave, FiXCircle, FiType, FiFileText } from "react-icons/fi"; // Icônes
// const api_base_url = "http://localhost:5000/api";
const api_base_url = "https://inkpad.onrender.com/api";
// import { useUserProfil } from '../../Context/UserProfileContext';

const NewNoteForm = ({ onSave, onCancel }) => {
  // const {noteTo, setNoteTo} = useUserProfil();

  const [visibility, setVisibility] = useState("");

  const handleCheckbox = (value) => {
    setVisibility((prev) => (prev === value ? "" : value));
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (!title && !content) {
        setError("Veuillez saisir un titre ou du contenu pour votre note.");
        return;
      }

      const token = localStorage.getItem("authToken");

      const response = await fetch(`${api_base_url}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          isPrivate: visibility === 'private',
          isPublic: visibility === 'public',
        }),
      });

      const data = await response.json();
      // console.log(data);

      if (onSave) {
        onSave(data);
      }

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(error.message || "Une erreur est survenue. Veuillez réessayer.");
    }
    // Réinitialiser les champs après la sauvegarde
    setTitle("");
    setContent("");
  };

  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 bg-white rounded-xl shadow-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
        Créer une nouvelle note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Champ Titre */}
        <div>
          <label
            htmlFor="note-title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titre de la note
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiType className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="note-title"
              name="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Donnez un titre à votre note (optionnel)"
            />
          </div>
        </div>

        {/* Champ Contenu */}
        <div>
          <label
            htmlFor="note-content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contenu
          </label>
          <div className="relative">
            {/* L'icône pour le textarea est moins courante à l'intérieur, on peut la mettre à côté du label si besoin */}
            {/* <span className="absolute top-3 left-0 flex items-center pl-3">
              <FiFileText className="w-5 h-5 text-gray-400" />
            </span> */}
            <textarea
              id="note-content"
              name="note-content"
              rows="10" // Ajustez le nombre de lignes selon vos besoins
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Commencez à écrire votre note ici..."
            ></textarea>
          </div>
        </div>

        {/* checkbox pour rendre les notes publiques ou privées */}
        <div>
          <h4>Rendre la note:</h4>
          <div className="flex items-center justify-between w-[45%] md:w-[30%]">
            <div className="flex items-center">
              <label name="visibilité" htmlFor="privé">
                Privée
              </label>
              <input
                type="checkbox"
                value={isPrivate}
                checked={visibility == "private"}
                onChange={(e) => {
                  handleCheckbox("private");
                  // setIsPrivate(e.target.value);
                }}
                className="ml-2"
              />
            </div>
            <div className="flex items-center">
              <label name="visibilité" htmlFor="publique">
                Publique
              </label>
              <input
                type="checkbox"
                value={isPublic}
                checked={visibility === "public"}
                onChange={(e) => {
                  handleCheckbox("public");
                  // setIsPublic(e.target.value);
                }}
                className="ml-2"
              />
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto flex justify-center items-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <FiXCircle className="mr-2 h-5 w-5" />
            Annuler
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <FiSave className="mr-2 h-5 w-5" />
            Enregistrer la Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
