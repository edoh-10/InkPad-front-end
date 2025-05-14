// CreateNoteButton.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi'; // Icône Plus

const CreateNoteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      aria-label="Créer une nouvelle note"
    >
      <FiPlus className="mr-2 h-5 w-5" />
      Nouvelle Note
    </button>
  );
};

export default CreateNoteButton;