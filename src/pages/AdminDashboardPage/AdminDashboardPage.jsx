// AdminDashboardPage.jsx
import React from 'react';
import { FiUsers, FiFileText, FiBarChart2, FiActivity, FiAlertCircle, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../Context/AuthContext'; // Assurez-vous que le chemin est correct

const AdminDashboardPage = () => {
  const { authState } = useAuth();
  const adminName = authState.user?.name || 'Admin';

  // Données de démonstration pour les "widgets"
  // Dans une application réelle, ces données proviendraient d'appels API
  const stats = [
    { 
      title: 'Utilisateurs Inscrits', 
      value: '1,250', 
      icon: <FiUsers className="h-8 w-8 text-blue-500" />, 
      color: 'blue',
      link: '/admin/users',
      linkText: 'Gérer les utilisateurs'
    },
    { 
      title: 'Notes Créées', 
      value: '5,870', 
      icon: <FiFileText className="h-8 w-8 text-green-500" />, 
      color: 'green',
      link: '/admin/notes',
      linkText: 'Gérer les notes'
    },
    { 
      title: 'Visites Aujourd\'hui', 
      value: '320', 
      icon: <FiActivity className="h-8 w-8 text-yellow-500" />, 
      color: 'yellow',
      link: '/admin/stats',
      linkText: 'Voir les statistiques'
    },
    { 
      title: 'Rapports en Attente', 
      value: '3', 
      icon: <FiAlertCircle className="h-8 w-8 text-red-500" />, 
      color: 'red',
      link: '/admin/reports', // Exemple de lien
      linkText: 'Voir les rapports'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Message de bienvenue */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bienvenue, {adminName} !
        </h1>
        <p className="text-indigo-100">
          C'est le tableau de bord de l'administration d'InkPad. Gérez les utilisateurs, le contenu et surveillez l'activité.
        </p>
      </div>

      {/* Section des statistiques rapides (widgets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-l-4 border-${stat.color}-500`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                {React.cloneElement(stat.icon, { className: `h-7 w-7 text-${stat.color}-600`})}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              {stat.link && (
                <a 
                  href={stat.link} 
                  className={`mt-3 inline-block text-sm font-medium text-${stat.color}-600 hover:text-${stat.color}-800 transition-colors`}
                >
                  {stat.linkText} &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Autres sections possibles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exemple: Graphique d'activité récente (placeholder) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Activité Récente</h3>
          <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
            <FiBarChart2 className="h-16 w-16 text-gray-400" />
            <p className="ml-2 text-gray-500">Données du graphique à venir...</p>
          </div>
        </div>

        {/* Exemple: Liens rapides vers des actions courantes */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Actions Rapides</h3>
          <ul className="space-y-3">
            <li>
              <a href="/admin/users/new" className="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline">
                <FiUsers className="mr-2" /> Ajouter un nouvel utilisateur
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline">
                <FiSettings className="mr-2" /> Configurer les paramètres du site
              </a>
            </li>
            {/* Ajoutez d'autres liens rapides ici */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
