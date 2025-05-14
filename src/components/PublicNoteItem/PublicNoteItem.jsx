// PublicNoteItem.jsx
import React from "react";
import { FiCalendar, FiEdit2, FiUser } from "react-icons/fi"; // Icônes
import { useNavigate, Link } from "react-router-dom";
import { UsePublicsNotes } from "../../Context/PublicsNotesContext";

const PublicNoteItem = ({ note }) => {
  const navigate = useNavigate();
  const {publicsNotesState, setPublicNotesState} = UsePublicsNotes();
  const {publicsNotesData, setPublicNotesData} = UsePublicsNotes();
  const {publicProfilState, setPublicProfilState} = UsePublicsNotes();
  const {voirPlusId, setVoirPlusId} = UsePublicsNotes();
  // console.log("NotePublics Items", note);
  // console.log("Id de chaque note", note._id)
  const uniqNote = note;

  // fonction pour ovrir le modal de profil
  const handleNotesSate = (note_id)  => {
    // console.log(note._id)
    if(note_id){
      setPublicNotesData(note)
      // console.log(publicsNotesData);
    }
    setPublicNotesState(true)
  }

  // fonction pour ouvrir le modal des donnée du profil
  const handleNotesUser = (note_id)  => {
    // console.log(note._id)
    if(note_id){
      setPublicNotesData(note)
      // console.log(publicsNotesData);
    }
    setPublicProfilState(true)
  }

  // function de lire plus
  const lirePlus = (note_id) => {
    if(note_id){
      setVoirPlusId(note._id)
      setPublicNotesData(note)
    }
    navigate(`notes/public/${note.title}`);
  }


  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    } catch (e) {
      return dateString; // Retourne la date originale si le formatage échoue
    }
  };

  // Valeurs par défaut si des informations sont manquantes (pour la robustesse)
  const authorName = note.user.username || "Auteur inconnu";
  const authorAvatarUrl =
    note.user.avatar ||
    `https://placehold.co/40x40/7e5bef/white?text=${authorName.charAt(
      0
    )}&font=raleway`;
  const noteTitle = note.title || "Note sans titre";
  const noteContentSnippet =
    note.contentSnippet ||
    (note.content
      ? note.content.substring(0, 150) + "..."
      : "Pas de contenu...");

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between h-full">
      <div>
        {/* Informations de l'auteur */}
        <div className="flex items-center mb-3">
          <button onClick={() => handleNotesSate(note._id)}>
            <img
              src={authorAvatarUrl}
              alt={`Avatar de ${authorName}`}
              className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-indigo-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/40x40/cccccc/333333?text=${authorName.charAt(
                  0
                )}&font=raleway`;
              }}
            />
          </button>
          <div>
            <p className="text-sm font-semibold text-indigo-600">
                <button onClick={() => handleNotesUser(note._id)}>{authorName}</button>
              
            </p>
            <div className="text-xs text-gray-400 flex items-center mt-0.5">
              <FiCalendar className="mr-1 h-3 w-3" />
              <span>Publié le : {formatDate(note.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Titre et extrait de la note */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-indigo-700 transition-colors">
          {noteTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
          {noteContentSnippet}
        </p>
      </div>

      {/* Date de dernière modification */}
      <div className="text-xs text-gray-400 mt-2 flex items-center">
        <FiEdit2 className="mr-1 h-3 w-3" />
        <span>
          Dernière modif. : {formatDate(note.updatedAt || note.lastModified)}
        </span>
      </div>

      {/* Optionnel: Lien pour lire la suite (si c'est un extrait) */}
      {/* Vous devrez gérer la navigation vers la note complète */}
      <button
        onClick={() => lirePlus(note._id)} // Adaptez ce chemin à votre structure de routes pour les notes publiques
        className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 self-start"
      >
        Lire la suite →
      </button>
    </div>
  );
};

export default PublicNoteItem;
