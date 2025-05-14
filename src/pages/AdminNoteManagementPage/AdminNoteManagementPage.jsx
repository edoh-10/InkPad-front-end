// AdminNoteManagementPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { FiFileText, FiEdit, FiTrash2, FiEye, FiSearch, FiCalendar, FiUser, FiShield, FiAlertOctagon, FiCheckSquare, FiXSquare } from 'react-icons/fi';
// import { useAuth } from '../../Context/AuthContext'; // Si nécessaire

// URL de base de votre API.
// const API_BASE_URL = 'http://localhost:5000/api'; // À ADAPTER
const API_BASE_URL = 'https://inkpad.onrender.com/api'; // À ADAPTER

// Données de démonstration pour les auteurs (similaire à AdminUserManagementPage)
const demoAuthors = [
  { id: 'usr_1', name: 'Adélaïde Moreau', avatarUrl: 'https://placehold.co/40x40/FFC0CB/333333?text=AM' },
  { id: 'usr_2', name: 'Bastien Durand', avatarUrl: 'https://placehold.co/40x40/ADD8E6/333333?text=BD' },
  { id: 'usr_3', name: 'Chloé Petit (Admin)', avatarUrl: 'https://placehold.co/40x40/90EE90/333333?text=CP' },
  { id: 'usr_4', name: 'David Lefevre', avatarUrl: 'https://placehold.co/40x40/FFD700/333333?text=DL' },
  { id: 'usr_5', name: 'Élise Dubois', avatarUrl: 'https://placehold.co/40x40/E6E6FA/333333?text=ED' },
];

// Données de démonstration pour les notes (simulant un appel API)
const demoNotes = [
  { 
    id: 'note_1', 
    title: 'Recette Secrète de Tiramisu', 
    authorId: 'usr_1', 
    createdAt: '2025-03-10T10:00:00Z', 
    updatedAt: '2025-03-11T14:30:00Z', 
    status: 'public', // public, private, reported, archived
    contentSnippet: 'Ingrédients : Mascarpone de qualité, œufs extra-frais, biscuits cuillères...',
  },
  { 
    id: 'note_2', 
    title: 'Plan de Voyage : Asie du Sud-Est', 
    authorId: 'usr_2', 
    createdAt: '2025-04-01T09:15:00Z', 
    updatedAt: '2025-04-05T11:00:00Z', 
    status: 'private',
    contentSnippet: 'Itinéraire détaillé pour 3 semaines : Thaïlande, Vietnam, Cambodge...',
  },
  { 
    id: 'note_3', 
    title: 'Idées de Romans SF', 
    authorId: 'usr_3', 
    createdAt: '2025-02-15T18:45:00Z', 
    updatedAt: '2025-02-15T18:45:00Z', 
    status: 'public',
    contentSnippet: 'Concept 1 : Une IA découvre une faille dans la réalité...',
  },
  { 
    id: 'note_4', 
    title: 'Leçons Apprises Projet X', 
    authorId: 'usr_1', 
    createdAt: '2025-01-20T12:00:00Z', 
    updatedAt: '2025-01-22T16:20:00Z', 
    status: 'reported', // Exemple de note signalée
    reportReason: 'Contenu inapproprié suspecté',
    contentSnippet: 'Importance de la communication claire dès le début...',
  },
  { 
    id: 'note_5', 
    title: 'Top 5 Documentaires Impactants', 
    authorId: 'usr_4', 
    createdAt: '2025-03-25T08:00:00Z', 
    updatedAt: '2025-03-25T08:00:00Z', 
    status: 'public',
    contentSnippet: '1. "Planet Earth II" - Pour la beauté brute de la nature...',
  },
  { 
    id: 'note_6', 
    title: 'Objectifs Personnels Q2', 
    authorId: 'usr_5', 
    createdAt: '2025-04-02T17:50:00Z', 
    updatedAt: '2025-04-03T10:05:00Z', 
    status: 'private',
    contentSnippet: 'Santé : Courir 3 fois par semaine, boire 2L d\'eau/jour...',
  }
].map(note => ({ // Ajout des informations de l'auteur aux notes
  ...note,
  author: demoAuthors.find(author => author.id === note.authorId) || { name: 'Auteur Supprimé', avatarUrl: `https://placehold.co/40x40/cccccc/333333?text=?` }
}));


const AdminNoteManagementPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // const [viewingNote, setViewingNote] = useState(null); // Pour un futur modal de visualisation

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Remplacer par votre appel API réel pour lister TOUTES les notes
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/admin/notes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les notes.`);
        }
        const data = await response.json(); // s'attendre à ce que 'author' soit peuplé
        setNotes(data);

        // Simulation
        // console.log("Chargement de toutes les notes (simulation)...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotes(data);
        // console.log(data);
      } catch (err) {
        console.error("Erreur lors du chargement des notes:", err);
        setError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm) ||
      (note.user.username || '').toLowerCase().includes(searchTerm) ||
      note.status.toLowerCase().includes(searchTerm) ||
      (note.content || '').toLowerCase().includes(searchTerm)
    );
  }, [notes, searchTerm]);

  const handleViewNoteContent = (note) => {
    // console.log(`Action: Voir contenu complet note ID: ${note.id}`, note);
    // Ouvrir un modal pour afficher le contenu complet de la note
    // setViewingNote(note); 
    alert(`Titre: ${note.title}\nContenu (début): ${note.contentSnippet}\nStatut: ${note.status}\nAuteur: ${note.author.name}`);
  };

  const handleChangeNoteStatus = async (noteId, newStatus) => {
    // console.log(`Action: Changer statut note ID: ${noteId} en '${newStatus}'`);
    // Mettre à jour l'état local pour un feedback immédiat
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === noteId ? { ...note, status: newStatus } : note
    ));
    // try {
      // Appel API pour mettre à jour le statut de la note
      // const token = localStorage.getItem('authToken');
      // const response = await fetch(`${API_BASE_URL}/admin/notes/${noteId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });
      // if (!response.ok) { /* ... gestion d'erreur, rollback ... */ }
      // const updatedNote = await response.json();
      // setNotes(prevNotes => prevNotes.map(note => note.id === noteId ? updatedNote : note));
    //   alert(`Statut de la note ${noteId} changé en ${newStatus} (simulation).`);
    // } catch (err) { /* ... gestion d'erreur, rollback ... */ }
  };

  const handleDeleteNoteByAdmin = async (noteId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement la note ID: ${noteId} ?`)) {
      // console.log(`Action: Supprimer note ID: ${noteId} par admin`);
      // try {
        // Appel API pour supprimer la note
      //   setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      //   alert('Note supprimée avec succès.');
      // } catch (err) { /* ... gestion d'erreur ... */ }
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)); // Simulation
      alert('Note supprimée par l\'admin (simulation).');
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: 'numeric' });
  };

  const getStatusPill = (status) => {
    switch (status) {
      case false:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Public</span>;
      case true:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Privé</span>;
      case 'reported':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Signalé</span>;
      case 'archived':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Archivé</span>;
      default:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };


  if (isLoading) {
    return <div className="text-center py-10"><p className="text-gray-500 text-lg">Chargement des notes...</p></div>;
  }
  if (error) {
    return <div className="text-center py-10 bg-red-50 p-4 rounded-lg"><p className="text-red-600 text-lg">Erreur : {error}</p></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Gestion des Notes</h1>

      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Rechercher par titre, auteur, statut, contenu..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-700"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">Titre</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">Auteur</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">Créée le</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">Modifiée le</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.length > 0 ? filteredNotes.map((note) => (
              <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 font-medium whitespace-no-wrap hover:text-indigo-600 cursor-pointer" onClick={() => handleViewNoteContent(note)}>
                    {note.title}
                  </p>
                  <p className="text-gray-500 text-xs whitespace-nowrap truncate max-w-xs">{note.contentSnippet}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <img 
                      src={note.user.avatar} 
                      alt={`Avatar de ${note.user.username}`}
                      className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                      onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/40x40/cccccc/333333?text=${note.author.name.charAt(0)}&font=raleway`; }}
                    />
                    <p className="text-gray-900 whitespace-no-wrap">{note.user.username}</p>
                  </div>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatDate(note.createdAt)}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatDate(note.updatedAt)}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  {getStatusPill(note.isPrivate)}
                  
                  {note.status === 'reported' && note.reportReason && (
                    <p className="text-xs text-red-500 mt-1 italic" title={note.reportReason}>
                      Raison: {note.reportReason.substring(0,30)}{note.reportReason.length > 30 ? '...' : ''}
                    </p>
                  )}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm text-center">
                  <div className="flex item-center justify-center space-x-1 sm:space-x-2">
                    <button onClick={() => handleViewNoteContent(note)} title="Voir la note" className="text-gray-500 hover:text-indigo-600 transition-colors p-1">
                      <FiEye size={18}/>
                    </button>
                    {/* Exemple d'actions conditionnelles pour les notes signalées */}
                    {note.status === 'reported' && (
                      <>
                        <button onClick={() => handleChangeNoteStatus(note.id, 'public')} title="Approuver (rendre public)" className="text-green-500 hover:text-green-700 transition-colors p-1">
                          <FiCheckSquare size={18}/>
                        </button>
                        <button onClick={() => handleChangeNoteStatus(note.id, 'private')} title="Rejeter (rendre privé)" className="text-yellow-600 hover:text-yellow-800 transition-colors p-1">
                          <FiXSquare size={18}/>
                        </button>
                      </>
                    )}
                     <button onClick={() => handleChangeNoteStatus(note.id, note.status === 'public' ? 'private' : 'public')} title={note.status === 'public' ? 'Rendre Privé' : 'Rendre Public'} className="text-gray-500 hover:text-blue-600 transition-colors p-1">
                      <FiShield size={18}/>
                    </button>
                    <button onClick={() => handleDeleteNoteByAdmin(note.id)} title="Supprimer la note" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                      <FiTrash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center py-10 px-5 text-gray-500">
                  Aucune note trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination (à implémenter si nécessaire) */}
    </div>
  );
};

export default AdminNoteManagementPage;
