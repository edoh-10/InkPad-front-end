// AdminContactMessagesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { FiMessageSquare, FiMail, FiUser, FiClock, FiSearch, FiSend, FiEye, FiCheck, FiArrowLeft, FiPaperclip } from 'react-icons/fi';

// URL de base de votre API 
const API_BASE_URL = 'https://inkpad.onrender.com/api';

// Données de démonstration pour les messages de contact
const demoContactMessages = [
  { 
    id: 'msg_1', 
    senderName: 'Alice Wonderland', 
    senderEmail: 'alice.w@example.com', 
    subject: 'Question sur les fonctionnalités', 
    message: 'Bonjour, je suis intéressée par InkPad et j\'aimerais savoir si vous prévoyez d\'intégrer une fonctionnalité de collaboration en temps réel. Merci !', 
    receivedAt: '2025-05-12T10:30:00Z', 
    status: 'unread', // unread, read, replied
    replies: []
  },
  { 
    id: 'msg_2', 
    senderName: 'Bob The Builder', 
    senderEmail: 'bob.builder@example.net', 
    subject: 'Problème de connexion', 
    message: 'Je n\'arrive pas à réinitialiser mon mot de passe. Le lien semble expiré. Pouvez-vous m\'aider ? Mon identifiant est bob.builder.', 
    receivedAt: '2025-05-11T15:00:00Z', 
    status: 'read',
    replies: []
  },
  { 
    id: 'msg_3', 
    senderName: 'Charles Xavier', 
    senderEmail: 'prof.x@xavierinstitute.org', 
    subject: 'Partenariat potentiel', 
    message: 'Nous sommes une institution éducative et nous serions intéressés par une version d\'InkPad pour nos étudiants. Serait-il possible de discuter d\'un partenariat ou de tarifs de groupe ?', 
    receivedAt: '2025-05-10T09:15:00Z', 
    status: 'replied',
    replies: [
      { id: 'rep_1', repliedBy: 'Admin InkPad', message: 'Bonjour Professeur Xavier, merci pour votre intérêt ! Nous serions ravis d\'en discuter. Pouvez-vous nous indiquer vos disponibilités pour un appel ?', repliedAt: '2025-05-10T14:00:00Z' }
    ]
  },
  { 
    id: 'msg_4', 
    senderName: 'Diana Prince', 
    senderEmail: 'diana.prince@themyscira.com', 
    subject: 'Suggestion d\'amélioration', 
    message: 'J\'adore InkPad ! Une petite suggestion : serait-il possible d\'ajouter des options de formatage de texte plus avancées, comme des tableaux ou des blocs de code ? Ce serait formidable.', 
    receivedAt: '2025-05-13T08:00:00Z', 
    status: 'unread',
    replies: []
  },
];

const AdminContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null); // Pour afficher le détail et répondre
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Remplacer par votre appel API réel pour lister les messages de contact
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/admin/message`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        const data = await response.json();
        // console.log(data);
        setMessages(data);

        // Simulation
        // console.log("Chargement des messages de contact (simulation)...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        setError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());

  const filteredMessages = useMemo(() => {
    return messages.filter(msg =>
      msg.name?.toLowerCase().includes(searchTerm) ||
      msg.email?.toLowerCase().includes(searchTerm) ||
      msg.content?.toLowerCase().includes(searchTerm)
    );
  }, [messages, searchTerm]);
  // console.log("les message",messages);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setReplyText(''); // Réinitialiser le champ de réponse
    // Marquer comme lu si c'est la première vue (simulation)
    if (message.status === 'unread') {
      setMessages(prev => prev.map(m => m.id === message.id ? { ...m, status: 'read' } : m));
      // TODO: API call to mark as read on backend
      // console.log(`Message ${message.id} marqué comme lu (simulation)`);
    }
  };

  const handleBackToList = () => setSelectedMessage(null);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;
    setIsReplying(true);
    // console.log(`Envoi de la réponse pour le message ID ${selectedMessage.id}: "${replyText}" à ${selectedMessage.senderEmail}`);
    
    // try {
    //   Appel API pour envoyer la réponse et mettre à jour le message.
    //   Le backend se chargera d'enregistrer la réponse ET d'envoyer l'e-mail.
    //   const token = localStorage.getItem('authToken');
    //   const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${selectedMessage.id}/reply`, {
    //     method: 'POST',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}` 
    //     },
    //     body: JSON.stringify({ 
    //        replyMessage: replyText, 
    //        recipientEmail: selectedMessage.senderEmail // Important: le backend a besoin de savoir à qui envoyer l'email
    //     })
    //   });
    //   if (!response.ok) {
    //      const errorData = await response.json();
    //      throw new Error(errorData.message || 'Erreur lors de l\'envoi de la réponse.');
    //   }
    //   const updatedMessage = await response.json(); // Le backend renvoie le message mis à jour (avec la nouvelle réponse)
      
    //   // Une fois que le backend a confirmé, mettre à jour l'interface utilisateur
    //   setMessages(prev => prev.map(m => m.id === updatedMessage.id ? updatedMessage : m));
    //   setSelectedMessage(updatedMessage); // Afficher la réponse dans l'interface
    //   alert('Réponse envoyée avec succès ! L\'e-mail a été transmis au destinataire.');
    //   setReplyText('');

    // Simulation (le code ci-dessus est ce que vous feriez avec un vrai backend)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simuler la latence réseau
      const newReply = { 
        id: `rep_${Date.now()}`, 
        repliedBy: 'Admin InkPad (Vous)', 
        message: replyText, 
        repliedAt: new Date().toISOString() 
      };
      const updatedMsg = { 
        ...selectedMessage, 
        status: 'replied', 
        replies: [...selectedMessage.replies, newReply] 
      };
      setMessages(prev => prev.map(m => m.id === selectedMessage.id ? updatedMsg : m));
      setSelectedMessage(updatedMsg);
      alert('Réponse envoyée (simulation) ! Dans un cas réel, le backend aurait aussi envoyé un e-mail.');
      setReplyText('');
    // } catch (err) {
    //   alert(`Erreur lors de l'envoi de la réponse: ${err.message}`);
    // } finally {
      setIsReplying(false);
    // }
  };
  
  const formatDate = (dateString) => new Date(dateString).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });

  const getStatusPill = (status) => {
    if (status === 'unread') return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Non lu</span>;
    if (status === 'read') return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Lu</span>;
    if (status === 'replied') return <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Répondu</span>;
    return null;
  };

  if (isLoading) return <div className="text-center py-20"><FiMessageSquare className="h-16 w-16 text-indigo-500 mx-auto animate-pulse" /><p className="text-gray-500 text-lg mt-4">Chargement des messages...</p></div>;
  if (error) return <div className="text-center py-10 bg-red-50 p-6 rounded-lg shadow"><p className="text-red-600 text-lg font-semibold">Erreur : {error}</p></div>;

  // Vue Détail et Réponse
  if (selectedMessage) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <button onClick={handleBackToList} className="mb-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedMessage.subject}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FiUser className="mr-1.5 h-4 w-4" /> De : <a href={`mailto:${selectedMessage.email}`} className="text-indigo-600 hover:underline ml-1">{selectedMessage.senderName} ({selectedMessage.senderEmail})</a>
          <span className="mx-2">|</span>
          <FiClock className="mr-1.5 h-4 w-4" /> Reçu le : {formatDate(selectedMessage.createdAt)}
          <span className="ml-3">{getStatusPill(selectedMessage.status)}</span>
        </div>
        
        <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <p className="font-semibold text-gray-700">Message original :</p>
          {selectedMessage.content?.split('\n').map((para, i) => <p key={i}>{para}</p>)}

        </div>

        {selectedMessage.replies?.length > 0 && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Vos réponses :</h3>
            {selectedMessage.name.map(reply => (
              <div key={reply.id} className="bg-indigo-50 p-4 rounded-md border border-indigo-200">
                <p className="text-xs text-indigo-700 font-medium mb-1">Répondu par {reply.repliedBy} le {formatDate(reply.repliedAt)}</p>
                {reply.content.split('\n').map((para, i) => <p key={i} className="text-sm text-gray-800">{para}</p>)}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendReply} className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Répondre à ce message :</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-700"
            placeholder="Votre réponse..."
            required
            disabled={isReplying}
          />
          {/* Option pour pièce jointe (simplifiée) */}
          {/* <div className="mt-3">
            <label htmlFor="attachment" className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer flex items-center">
              <FiPaperclip className="mr-2"/> Joindre un fichier (optionnel)
            </label>
            <input type="file" id="attachment" className="hidden" />
          </div> */}
          <button
            type="submit"
            disabled={isReplying || !replyText.trim()}
            className="mt-4 w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isReplying ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FiSend className="mr-2 h-5 w-5" />
            )}
            {isReplying ? 'Envoi en cours...' : 'Envoyer la Réponse'}
          </button>
        </form>
      </div>
    );
  }

  // Vue Liste des Messages
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Messages de Contact</h1>
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Rechercher par nom, email, sujet, message..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-700"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredMessages.length > 0 ? filteredMessages.map((msg, index) => (
            <li key={index} className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${msg.status === 'unread' ? 'bg-indigo-50' : ''}`} onClick={() => handleViewMessage(msg)}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold truncate ${msg.status === 'unread' ? 'text-indigo-700' : 'text-gray-800'}`}>{msg.subject}</p>
                    <time dateTime={msg.createdAt} className="flex-shrink-0 ml-4 text-xs text-gray-500">{formatDate(msg.createdAt)}</time>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <p className="truncate">{msg.name} <span className="text-gray-400">&lt;{msg.email}&gt;</span></p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{msg.content}</p>
                </div>
                <div className="ml-4 flex-shrink-0 self-center">
                  {getStatusPill(msg.status)}
                </div>
              </div>
            </li>
          )) : (
            <li className="p-6 text-center text-gray-500">Aucun message trouvé.</li>
          )}
        </ul>
      </div>
      {/* Pagination (à implémenter si nécessaire) */}
    </div>
  );
};

export default AdminContactMessagesPage;
