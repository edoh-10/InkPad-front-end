// NoteItem.jsx
import React from "react";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi"; // Icônes pour édition, suppression, date
import { Link } from "react-router-dom";

const NoteItem = ({ note, onEdit, onDelete }) => {
  // Formatte la date pour un affichage plus lisible
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between h-full">
      <Link to={`/inkpad/notes/${note.title}`}>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {note.title || "Note sans titre"}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {note.content || "Pas de contenu..."}
          </p>
        </div>
        <div className="text-xs text-gray-400 mb-4 flex items-center">
          <FiClock className="mr-1" />
          Dernière modif. : {formatDate(note.updatedAt)}
        </div>
      </Link>
      <div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onEdit(note.title)}
            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-150"
            aria-label={`Modifier la note ${note.title || ""}`}
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-150"
            aria-label={`Supprimer la note ${note.title || ""}`}
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
