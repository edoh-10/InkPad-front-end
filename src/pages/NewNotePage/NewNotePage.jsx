// NewNotePage.jsx
import React from 'react';
// import Header from '../../features/Header/Header'; // Assurez-vous que le chemin est correct
// import Footer from '../../features/Footer/Footer'; // Assurez-vous que le chemin est correct
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';
import { useUserProfil } from '../../Context/UserProfileContext';
import { useNavigate } from 'react-router-dom'; 

const NewNotePage = ({setNotes}) => {

  const {noteTo, setNoteTo} = useUserProfil();

  const navigate = useNavigate(); // Pour la redirection après sauvegarde ou annulation

  const handleSaveNote = (noteData) => {
    // console.log('Nouvelle note à enregistrer:', noteData);
    // setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    if(setNoteTo.length === 0){
      setNoteTo((prevNotes) => [noteData])
    }else if(setNoteTo.length > 0){
      setNoteTo((prevNotes) => [...prevNotes, noteData]); 
    }
  };



  const handleCancel = () => {
    // console.log('Création de note annulée');
    // navigate(-1); // Retourne à la page précédente
    navigate('/inkpad/mes-notes');
    alert('Création annulée. Redirection vers le tableau de bord...');
    // window.location.href = '/dashboard'; // Redirection simple pour la démo
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Header /> Le Header devrait refléter un état connecté */}
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewNoteForm 
          onSave={handleSaveNote}
          onCancel={handleCancel}
        />
      </main>

      {/* <Footer /> */} 
    </div>
  );
};

export default NewNotePage;
