// EditNoteForm.jsx
import React, { useState, useEffect } from 'react';
import { FiSave, FiXCircle, FiType, FiFileText } from 'react-icons/fi'; // Icônes

const EditNoteForm = ({ existingNote, onUpdate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Pré-remplir le formulaire si une note existante est fournie
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title || '');
      setContent(existingNote.content || '');
    }
  }, [existingNote]); // Se réexécute si existingNote change

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!title && !content) {
      setError('Veuillez saisir un titre ou du contenu pour votre note.');
      return;
    }

    const updatedNoteData = {
      // Inclure l'ID de la note pour savoir laquelle mettre à jour
      id: existingNote ? existingNote._id : null, 
      title: title || 'Note sans titre',
      content: content,
    };

    if (onUpdate) {
      onUpdate(updatedNoteData);
    }
  };

  if (!existingNote) {
    // Gérer le cas où la note n'est pas encore chargée ou est introuvable
    return <div className="text-center p-8">Chargement des données de la note...</div>;
  }

  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 bg-white rounded-xl shadow-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
        Modifier la note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Champ Titre */}
        <div>
          <label htmlFor="note-title-edit" className="block text-sm font-medium text-gray-700 mb-1">
            Titre de la note
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiType className="w-5 h-5 text-gray-400" />
            </span>
            <input
              id="note-title-edit"
              name="note-title-edit"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Titre de votre note"
            />
          </div>
        </div>

        {/* Champ Contenu */}
        <div>
          <label htmlFor="note-content-edit" className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <div className="relative">
            <textarea
              id="note-content-edit"
              name="note-content-edit"
              rows="12" // Un peu plus de lignes pour l'édition
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-gray-400 text-gray-700"
              placeholder="Contenu de votre note..."
            ></textarea>
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
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
