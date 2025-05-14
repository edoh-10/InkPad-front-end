// PublicNoteList.jsx
import React from 'react';
import PublicNoteItem from '../PublicNoteItem/PublicNoteItem'; // Assurez-vous que le chemin est correct

const PublicNoteList = ({ notes }) => {
  // console.log("notes dans notePublicList", notes)
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-10">
        <img 
          src="https://placehold.co/300x200/e2e8f0/94a3b8?text=Aucune+note+publique+pour+le+moment...&font=raleway" 
          alt="Illustration de notes publiques vides" 
          className="mx-auto mb-4 rounded-lg"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/cccccc/333333?text=Image+Indisponible"; }}
        />
        <p className="text-gray-500 text-lg">Aucune note publique à afficher pour le moment.</p>
        <p className="text-gray-400">Revenez plus tard ou explorez d'autres sections !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <PublicNoteItem
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
};

export default PublicNoteList;
