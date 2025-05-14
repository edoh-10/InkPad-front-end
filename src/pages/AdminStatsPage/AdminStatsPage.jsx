// AdminStatsPage.jsx
import React, { useState, useEffect } from 'react';
import { FiUsers, FiFileText, FiEye, FiActivity, FiBarChart2, FiTrendingUp, FiTrendingDown, FiClock, FiCheckSquare, FiAlertOctagon } from 'react-icons/fi';
// Pour des graphiques plus avancés, vous pourriez intégrer une bibliothèque comme Recharts ou Chart.js
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// URL de base de votre API (si vous récupérez des stats réelles)
// const API_BASE_URL = 'https://inkpad.onrender.com/api'; // À ADAPTER

// Données de démonstration pour les statistiques
const demoStatsData = {
  general: [
    { title: 'Utilisateurs Inscrits', value: '1,287', icon: <FiUsers className="h-7 w-7 text-blue-500" />, trend: '+15 cette semaine', trendDirection: 'up' },
    { title: 'Total des Notes Créées', value: '6,032', icon: <FiFileText className="h-7 w-7 text-green-500" />, trend: '+120 cette semaine', trendDirection: 'up' },
    { title: 'Notes Publiques', value: '859', icon: <FiEye className="h-7 w-7 text-purple-500" />, trend: '+5 nouvelles', trendDirection: 'up' },
    { title: 'Notes Actives Aujourd\'hui', value: '78', icon: <FiActivity className="h-7 w-7 text-yellow-500" />, trend: '-5 vs hier', trendDirection: 'down' },
  ],
  userActivity: [
    { name: 'Jan', nouvellesInscriptions: 30, utilisateursActifs: 150 },
    { name: 'Fév', nouvellesInscriptions: 45, utilisateursActifs: 180 },
    { name: 'Mar', nouvellesInscriptions: 60, utilisateursActifs: 220 },
    { name: 'Avr', nouvellesInscriptions: 50, utilisateursActifs: 210 },
    { name: 'Mai', nouvellesInscriptions: 70, utilisateursActifs: 250 },
    { name: 'Juin', nouvellesInscriptions: 85, utilisateursActifs: 280 },
  ],
  noteActivity: [
    { name: 'Lun', notesCrees: 15, notesModifiees: 30 },
    { name: 'Mar', notesCrees: 22, notesModifiees: 25 },
    { name: 'Mer', notesCrees: 18, notesModifiees: 35 },
    { name: 'Jeu', notesCrees: 25, notesModifiees: 40 },
    { name: 'Ven', notesCrees: 30, notesModifiees: 28 },
    { name: 'Sam', notesCrees: 12, notesModifiees: 15 },
    { name: 'Dim', notesCrees: 8, notesModifiees: 10 },
  ],
  contentOverview: {
    averageNotesPerUser: 4.69,
    mostPopularTag: 'travail',
    notesReported: 3,
  }
};

const AdminStatsPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Remplacer par votre appel API réel pour récupérer les statistiques
        // const token = localStorage.getItem('authToken');
        // const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // if (!response.ok) {
        //   throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les statistiques.`);
        // }
        // const data = await response.json();
        // setStats(data);

        // Simulation
        // console.log("Chargement des statistiques (simulation)...");
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simuler une latence réseau
        setStats(demoStatsData);

      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
        setError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        {/* Vous pouvez utiliser votre AnimatedInkPadLogo ici */}
        <FiBarChart2 className="h-16 w-16 text-indigo-500 mx-auto animate-pulse" />
        <p className="text-gray-500 text-lg mt-4">Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 p-6 rounded-lg shadow">
        <p className="text-red-600 text-lg font-semibold">Erreur de chargement</p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-10"><p className="text-gray-500">Aucune statistique à afficher.</p></div>;
  }

  // Composant simple pour un "graphique" en barres avec des divs (pour la démo)
  const SimpleBarChart = ({ data, dataKeyX, dataKeyY, barColorClass, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex justify-around items-end h-48 border-b border-l border-gray-200 p-2 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              title={`${item[dataKeyX]}: ${item[dataKeyY]}`}
              className={`w-3/4 ${barColorClass} rounded-t-md hover:opacity-80 transition-opacity`} 
              style={{ height: `${(item[dataKeyY] / Math.max(...data.map(d => d[dataKeyY]))) * 100}%` }}
            >
            </div>
            <span className="text-xs text-gray-500 mt-1">{item[dataKeyX]}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Statistiques de l'Application</h1>

      {/* Cartes de statistiques générales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.general.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 rounded-full bg-gray-100`}>
                {stat.icon}
              </div>
              {stat.trendDirection === 'up' ? 
                <FiTrendingUp className="h-6 w-6 text-green-500" /> : 
                <FiTrendingDown className="h-6 w-6 text-red-500" />
              }
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            <p className={`text-xs mt-2 ${stat.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Section des graphiques (placeholders ou graphiques simples) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart 
          data={stats.userActivity} 
          dataKeyX="name" 
          dataKeyY="nouvellesInscriptions" 
          barColorClass="bg-blue-500"
          title="Nouvelles Inscriptions (6 derniers mois)"
        />
        <SimpleBarChart 
          data={stats.noteActivity} 
          dataKeyX="name" 
          dataKeyY="notesCrees" 
          barColorClass="bg-green-500"
          title="Notes Créées (7 derniers jours)"
        />
      </div>
      
      {/* Aperçu du contenu */}
       <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Aperçu du Contenu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <FiFileText className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-700">{stats.contentOverview.averageNotesPerUser.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Notes par utilisateur (moy.)</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <FiCheckSquare className="h-8 w-8 text-teal-500 mx-auto mb-2" /> {/* Changed icon */}
            <p className="text-2xl font-bold text-gray-700 capitalize">{stats.contentOverview.mostPopularTag}</p>
            <p className="text-sm text-gray-500">Tag le plus populaire</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <FiAlertOctagon className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-700">{stats.contentOverview.notesReported}</p>
            <p className="text-sm text-gray-500">Notes Signalées</p>
          </div>
        </div>
      </div>

      {/* Vous pouvez ajouter d'autres sections de statistiques ici */}
      {/* Par exemple: les utilisateurs les plus actifs, les notes les plus vues, etc. */}

    </div>
  );
};

export default AdminStatsPage;
