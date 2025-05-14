// AdminLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiFileText, FiSettings, FiLogOut, FiMenu, FiX, FiChevronDown, FiChevronUp, FiBarChart2 } from 'react-icons/fi';
import { FiMessageSquare } from "react-icons/fi";
import { useAuth } from '../../Context/AuthContext'; // Assurez-vous que le chemin est correct

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar ouverte par défaut sur les grands écrans
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Menu mobile pour la sidebar
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Rediriger vers la page de connexion après la déconnexion
  };

  const adminNavLinks = [
    { name: 'Tableau de Bord', path: '/admin', icon: <FiGrid className="h-5 w-5" />, exact: true },
    { name: 'Utilisateurs', path: '/admin/users', icon: <FiUsers className="h-5 w-5" /> },
    { name: 'Notes', path: '/admin/notes', icon: <FiFileText className="h-5 w-5" /> },
    { name: 'Statistiques', path: '/admin/stats', icon: <FiBarChart2 className="h-5 w-5" /> },
    { name: 'message', path: '/admin/message', icon: <FiMessageSquare className="h-5 w-5" /> },
    // Ajoutez d'autres liens d'administration ici
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo et nom de l'application */}
      <div className="px-6 py-4 border-b border-gray-700">
        <NavLink to="/admin" className="flex items-center text-white">
          {/* Vous pouvez utiliser une icône ou un SVG pour votre logo ici */}
          <svg className="h-8 w-8 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
          </svg>
          <span className="text-xl font-semibold">InkPad Admin</span>
        </NavLink>
      </div>

      {/* Liens de navigation */}
      <nav className="flex-grow mt-5 px-4 space-y-1">
        {adminNavLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.exact} // 'end' prop pour NavLink pour une correspondance exacte de la route
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={isMobileMenuOpen ? toggleMobileMenu : undefined} // Ferme le menu mobile au clic
          >
            {link.icon && React.cloneElement(link.icon, { className: 'mr-3 h-5 w-5 flex-shrink-0' })}
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Section utilisateur et déconnexion en bas de la sidebar */}
      <div className="px-6 py-4 mt-auto border-t border-gray-700">
        <div className="flex items-center mb-3">
          <img
            src={authState.user?.avatarUrl || `https://placehold.co/40x40/7e5bef/white?text=${(authState.user?.name || 'A').charAt(0)}&font=raleway`}
            alt="Avatar Admin"
            className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-indigo-400"
          />
          <div>
            <p className="text-sm font-medium text-white">{authState.user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">{authState.user?.role || 'Administrator'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out group"
        >
          <FiLogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar pour grands écrans */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:flex md:flex-shrink-0 transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar pour mobile (menu hamburger) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={toggleMobileMenu}></div>
          {/* Contenu de la sidebar mobile */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Fermer la sidebar</span>
                <FiX className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Espace pour pousser la sidebar hors de l'écran */}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header du contenu principal (optionnel, peut contenir des actions ou le titre de la page) */}
        <header className="bg-white shadow-sm w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between md:justify-end">
            {/* Bouton pour ouvrir la sidebar sur mobile */}
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Ouvrir la sidebar</span>
              <FiMenu className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Bouton pour afficher/cacher la sidebar sur desktop (optionnel) */}
            <button
              type="button"
              className="hidden md:block text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-4"
              onClick={toggleSidebar}
              title={isSidebarOpen ? "Cacher la sidebar" : "Afficher la sidebar"}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Vous pouvez ajouter d'autres éléments ici, comme des notifications ou un menu utilisateur */}
            <div className="text-gray-700 font-semibold">
              Espace Administration
            </div>
          </div>
        </header>

        {/* Zone de contenu où les pages enfants seront rendues */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          <Outlet /> {/* C'est ici que le contenu des sous-routes (/admin, /admin/users, etc.) sera affiché */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
