// NoteList.jsx
import React from 'react';
import NoteItem from '../NoteItem/NoteItem'; // Assurez-vous que le chemin est correct

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-10">
        <img 
          src="https://placehold.co/300x200/e2e8f0/94a3b8?text=Aucune+note+pour+le+moment...&font=raleway" 
          alt="Illustration de notes vides" 
          className="mx-auto mb-4 rounded-lg"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/cccccc/333333?text=Image+Indisponible"; }}
        />
        <p className="text-gray-500 text-lg">Vous n'avez aucune note pour le moment.</p>
        <p className="text-gray-400">Commencez par en créer une nouvelle !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <NoteItem 
          key={note._id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
