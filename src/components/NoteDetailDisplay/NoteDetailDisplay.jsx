// NoteDetailDisplay.jsx
import React from "react";
import {
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiTag,
  FiArrowLeft,
} from "react-icons/fi"; // Icônes

const NoteDetailDisplay = ({ note, onEdit, onDelete, onGoBack }) => {
  if (!note) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">
          Chargement de la note ou note introuvable...
        </p>
        <button
          onClick={onGoBack}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiArrowLeft className="mr-2 h-5 w-5" />
          Retour au tableau de bord
        </button>
      </div>
    );
  }

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
      return dateString;
    }
  };
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl mx-auto max-w-3xl">
      {/* Bouton Retour */}
      <div className="mb-6">
        <button
          onClick={onGoBack}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Retour aux notes
        </button>
      </div>

      {/* Titre de la note */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 break-words">
        {note.title || "Note sans titre"}
      </h1>

      <div
        className="prose prose-indigo max-w-none text-gray-700 leading-relaxed break-words"
        // dangerouslySetInnerHTML={{ __html: note.content }}
      >
        {/* Si votre contenu est du texte brut (avec des sauts de ligne) : */}
        {note.content &&
          note.content
            .split("\n")
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {!note.content && <p className="italic">Cette note est vide.</p>}
      </div><br/>

      {/* Métadonnées de la note */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-4">
        <div className="flex items-center">
          <FiCalendar className="mr-1.5 h-4 w-4" />
          <span>Dernière modification : {formatDate(note.updatedAt)}</span>
        </div>

        {/* Exemple pour des étiquettes/tags si vous en avez */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex items-center">
            <FiTag className="mr-1.5 h-4 w-4" />
            <span>{note.tags.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0">
        <button
          onClick={() => onEdit(note.title)}
          className="w-full sm:w-auto flex justify-center items-center py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <FiEdit className="mr-2 h-5 w-5" />
          Modifier
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="w-full sm:w-auto flex justify-center items-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <FiTrash2 className="mr-2 h-5 w-5" />
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default NoteDetailDisplay;
