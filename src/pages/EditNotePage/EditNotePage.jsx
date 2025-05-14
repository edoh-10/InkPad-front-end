// EditNotePage.jsx
import React, { useState, useEffect } from 'react';
import { useUserProfil } from '../../Context/UserProfileContext';
// import Header from './Header'; // 
// import Footer from './Footer'; //
import EditNoteForm from '../../components/EditNoteForm/EditNoteForm';
import { useParams, useNavigate } from 'react-router-dom'; // Pour React Router

// Données de démonstration (similaire à DashboardPage et NoteDetailPage)
const allNotesData = [
  { id: '1', title: 'Idées pour le projet InkPad', content: 'Réfléchir aux fonctionnalités clés, design de l\'interface, technologies à utiliser.\n\n- Authentification\n- Éditeur de texte riche\n- Organisation par dossiers/tags\n- Partage de notes', lastModified: '2025-05-07T10:30:00Z', tags: ['projet', 'inkpad', 'idées'] },
  { id: '2', title: 'Liste de courses', content: 'Lait\nOeufs\nPain complet\nBeurre\nCafé en grains\nFruits de saison (fraises, pommes)\nLégumes (brocolis, carottes)', lastModified: '2025-05-06T15:00:00Z', tags: ['perso', 'courses'] },
  // ... ajoutez d'autres notes si nécessaire pour les tests
];

const API_BASE_URL = 'https://inkpad.onrender.com/api'; 
const token = localStorage.getItem("authToken");

const EditNotePage = () => {

  // const {noteTo, setNoteTo} = useUserProfil();

  const navigate = useNavigate();
  const { noteId } = useParams(); // Pour obtenir l'ID de la note depuis l'URL avec React Router
  
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    const getNoteToEdit = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/${noteId}`);

            if(!response.ok){
                throw new Error("Erreur lors de la récupération");
            }

            const data = await response.json();
            if(data){
                // console.log(data);
                setNoteToEdit(data);
            }
        } catch (error) {
            console.error("error.message");
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    
    getNoteToEdit();
  }, []);

  const handleUpdateNote = async (updatedNoteData) => {
    // console.log('Note à mettre à jour:', updatedNoteData);
    if (!updatedNoteData.id) {
        console.error("Erreur: ID de note manquant pour la mise à jour.");
        alert("Une erreur est survenue, l'ID de la note est manquant.");
        return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${updatedNoteData.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
        body: JSON.stringify({ title: updatedNoteData.title, content: updatedNoteData.content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
      }
      const savedNote = await response.json();
      // console.log('Note mise à jour avec succès');

    } catch (err) {
      // console.error('Erreur lors de la mise à jour de la note:', err);
      alert(`Erreur lors de la mise à jour: ${err.message}`);
    }

    alert('Note mise à jour Redirection...');
    navigate(`/DashboardPage/notes/${updatedNoteData.title}`);

  };

  const handleCancelEdit = () => {
    // console.log('Édition de note annulée');
    // navigate(-1); // Retourne à la page précédente
    // ou navigate(`/note-detail?id=${noteToEdit?.id}`);
    alert('Édition annulée.');
    // if (noteToEdit && noteToEdit.id) {
    //   window.location.href = `/note-detail?id=${noteToEdit.id}`;
    // } else {
    //  navigate("/inkpad");
    // }
    navigate(-1)
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-lg">Chargement de la note pour édition...</p>
          {/* Vous pouvez ajouter votre AnimatedInkPadLogo ici aussi */}
        </main>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-red-500 text-lg">{error}</p>
           <button
            onClick={() => window.location.href = '/dashboard'} // Redirige vers le tableau de bord
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retour au tableau de bord
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EditNoteForm 
          existingNote={noteToEdit}
          onUpdate={handleUpdateNote}
          onCancel={handleCancelEdit}
        />
      </main>

    </div>
  );
};

export default EditNotePage;
