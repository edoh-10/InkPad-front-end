// NoteDetailPage.jsx
import AnimatedInkPadLogo from '../../features/AnimatedInkPadLogo/AnimatedInkPadLogo';
import React, { useState, useEffect } from 'react';
// import Header from './Header'; 
// import Footer from './Footer'; 
import NoteDetailDisplay from '../../components/NoteDetailDisplay/NoteDetailDisplay';
import { useParams, useNavigate, data } from 'react-router-dom'; // Pour React Router
import { FiArrowLeft } from 'react-icons/fi';
const api_base_url = "https://inkpad.onrender.com/api";


// Données de démonstration (similaire à DashboardPage)

const NoteDetailPage = ({setNotes}) => {
  const navigate = useNavigate(); // Pour la navigation
  const { noteId } = useParams(); // Pour obtenir l'ID de la note depuis l'URL avec React Router

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simuler la récupération de l'ID de la note depuis l'URL
  // Dans une vraie app, vous utiliseriez useParams() de React Router
  useEffect(() => {

    const fetchData = async () => {
      // console.log(noteId);
      try {
        const response = await fetch(`${api_base_url}/notes/${noteId}`);

        if(!response.ok){
          throw new Error("Erreur de récupération");
        }

        const data = await response.json();
        if (data) {
          // console.log("dataDetail")
          setNote(data);
    
        } else {
          setError('Aucun ID de note fourni dans l\'URL.');
        }
      } catch (Error) {
        
      };

      
    }
    fetchData();
    setLoading(false);
 
  }, []); 

  const supprimerNote = async (id) => {
    try {
      const response = await fetch(`${api_base_url}/notes/${id}`, {
        method: "DELETE",
      });

      if(!response.ok){
        throw new Error("Erreur lors de la suppression");
      };

      const data = await response.json();
      // console.log("data supprimer")
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  const handleEditNote = (newId) => {
    // console.log('Action: Modifier la note ID:', newId);
    navigate(`/inkpad/edit-page/${newId}`)
  };

  const handleDeleteNote = (id) => {
    
    // console.log('Action: Supprimer la note ID:',);
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      supprimerNote(id)
      // console.log(id)
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setNote((prevNote) => prevNote === "")
      navigate("/inkpad")

    }
    
  };

  const handleGoBack = () => {
    navigate('/inkpad/mes-notes');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-lg">Chargement de la note...</p>
          <AnimatedInkPadLogo/>
        </main>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* <Header /> */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-red-500 text-lg">{error}</p>
           <button
            onClick={handleGoBack}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Retour au tableau de bord
          </button>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Header /> Devrait refléter un état connecté */}
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NoteDetailDisplay 
          note={note}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onGoBack={handleGoBack}
        />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default NoteDetailPage;
