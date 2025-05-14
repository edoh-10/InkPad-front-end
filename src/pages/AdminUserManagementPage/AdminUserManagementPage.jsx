// AdminUserManagementPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  FiUsers,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiPlusCircle,
  FiToggleLeft,
  FiToggleRight,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
// import { useAuth } from '../../Context/AuthContext'; // Si nécessaire pour des vérifications de permissions spécifiques

// URL de base de votre API.
const API_BASE_URL = "https://inkpad.onrender.com/api"; // À ADAPTER

// Données de démonstration pour les utilisateurs (simulant un appel API)
const demoUsers = [
  {
    id: "usr_1",
    name: "Adélaïde Moreau",
    email: "adelaide.moreau@example.com",
    role: "user",
    joinedDate: "2024-01-15T10:00:00Z",
    avatarUrl: "https://placehold.co/40x40/FFC0CB/333333?text=AM",
    isSuspended: false,
  },
  {
    id: "usr_2",
    name: "Bastien Durand",
    email: "bastien.durand@example.com",
    role: "user",
    joinedDate: "2024-02-20T11:30:00Z",
    avatarUrl: "https://placehold.co/40x40/ADD8E6/333333?text=BD",
    isSuspended: false,
  },
  {
    id: "usr_3",
    name: "Chloé Petit (Admin)",
    email: "chloe.petit.admin@example.com",
    role: "admin",
    joinedDate: "2023-12-01T09:00:00Z",
    avatarUrl: "https://placehold.co/40x40/90EE90/333333?text=CP",
    isSuspended: false,
  },
  {
    id: "usr_4",
    name: "David Lefevre",
    email: "david.lefevre@example.com",
    role: "user",
    joinedDate: "2024-03-10T16:45:00Z",
    avatarUrl: "https://placehold.co/40x40/FFD700/333333?text=DL",
    isSuspended: true,
  },
  {
    id: "usr_5",
    name: "Élise Dubois",
    email: "elise.dubois@example.com",
    role: "user",
    joinedDate: "2024-01-25T14:12:00Z",
    avatarUrl: "https://placehold.co/40x40/E6E6FA/333333?text=ED",
    isSuspended: false,
  },
];

const AdminUserManagementPage = () => {
  // const { authState } = useAuth(); // Pourrait être utilisé pour des permissions fines
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [editingUser, setEditingUser] = useState(null); // Pour un futur modal d'édition

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP ${response.status}: Impossible de charger les utilisateurs.`
          );
        }
        const data = await response.json();
        setUsers(data);
        // console.log("depuis user management page", data);

        // Simulation
        // console.log("Chargement des utilisateurs (simulation)...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // console.log("users data dans user management page _1", users);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    // console.log("users data dans user management page _2", users);
    // console.log("event data dans user management page _1", event);
  };

  const filteredUsers = useMemo(() => {
    // console.log("users data dans user management page _3", users);
    return users.filter(
      (user) =>
        (user.username && user.username.toLowerCase().includes(searchTerm)) ||
        (user.email && user.email.toLowerCase().includes(searchTerm)) ||
        (user.role && user.role.toLowerCase().includes(searchTerm))
    );
  }, [users, searchTerm]);

  const handleViewUser = (userId) => {
    // console.log(`Action: Voir détails utilisateur ID: ${userId}`);
    // Naviguer vers une page de détail utilisateur admin ou ouvrir un modal
  };

  const handleEditUserRole = (userId) => {
    // console.log(`Action: Modifier rôle utilisateur ID: ${userId}`);
    // Ouvrir un modal pour changer le rôle
    // setEditingUser(users.find(u => u.id === userId));
  };

  const handleToggleSuspendUser = async (userId, currentSuspendedStatus) => {
    // console.log(
    //   `Action: ${
    //     currentSuspendedStatus ? "Réactiver" : "Suspendre"
    //   } utilisateur ID: ${userId}`
    // );
    // Mettre à jour l'état local pour un feedback immédiat (optimistic update)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, isSuspended: !currentSuspendedStatus }
          : user
      )
    );
    try {
      // Appel API pour mettre à jour le statut de suspension
      // const token = localStorage.getItem('authToken');
      // const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/suspend`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ isSuspended: !currentSuspendedStatus })
      // });
      // if (!response.ok) {
      //   // Revenir à l'état précédent en cas d'erreur
      //   setUsers(prevUsers => prevUsers.map(user =>
      //     user.id === userId ? { ...user, isSuspended: currentSuspendedStatus } : user
      //   ));
      //   throw new Error('Erreur lors de la mise à jour du statut de l\'utilisateur.');
      // }
      // const updatedUser = await response.json();
      // Mettre à jour avec les données du serveur si nécessaire (ou juste confirmer)
      // setUsers(prevUsers => prevUsers.map(user => user.id === userId ? updatedUser : user));
      // console.log(
      //   `Utilisateur ${userId} ${
      //     currentSuspendedStatus ? "réactivé" : "suspendu"
      //   } (simulation)`
      // );
    } catch (err) {
      console.error("Erreur de suspension/réactivation:", err);
      alert(`Erreur: ${err.message}`);
      // S'assurer de revenir à l'état précédent si l'API échoue et que l'optimistic update a été fait
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, isSuspended: currentSuspendedStatus }
            : user
        )
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ID: ${userId} ? Cette action est irréversible.`
      )
    ) {
      // console.log(`Action: Supprimer utilisateur ID: ${userId}`);
      // try {
      //   // Appel API pour supprimer l'utilisateur
      //   // ...
      //   setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      //   alert('Utilisateur supprimé avec succès.');
      // } catch (err) {
      //   console.error("Erreur de suppression:", err);
      //   alert(`Erreur lors de la suppression: ${err.message}`);
      // }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Simulation
      alert("Utilisateur supprimé (simulation).");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        {/* <AnimatedInkPadLogo /> ou un spinner simple */}
        <p className="text-gray-500 text-lg">Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 p-4 rounded-lg">
        <p className="text-red-600 text-lg">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Utilisateurs
        </h1>
        <button
          // onClick={() => console.log("Ouvrir modal ajout utilisateur")}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          Ajouter un Utilisateur
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Rechercher par nom, email, rôle..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-700"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Inscrit le
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={`Avatar de ${user.username}`}
                        className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/40x40/cccccc/333333?text=${user.name.charAt(
                            0
                          )}&font=raleway`;
                        }}
                      />
                      <div>
                        <p className="text-gray-900 font-medium whitespace-no-wrap">
                          {user.username}
                        </p>
                        <p className="text-gray-600 text-xs whitespace-no-wrap">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatDate(user.updatedAt)}
                    </p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isSuspended
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isSuspended ? "Suspendu" : "Actif"}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        title="Voir détails"
                        className="text-gray-500 hover:text-indigo-600 transition-colors p-1"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditUserRole(user.id)}
                        title="Modifier le rôle"
                        className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleSuspendUser(user.id, user.isSuspended)
                        }
                        title={
                          user.isSuspended
                            ? "Réactiver le compte"
                            : "Suspendre le compte"
                        }
                        className={`p-1 transition-colors ${
                          user.isSuspended
                            ? "text-green-500 hover:text-green-700"
                            : "text-yellow-500 hover:text-yellow-700"
                        }`}
                      >
                        {user.isSuspended ? (
                          <FiCheckCircle size={18} />
                        ) : (
                          <FiToggleLeft size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Supprimer l'utilisateur"
                        className="text-gray-500 hover:text-red-600 transition-colors p-1"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 px-5 text-gray-500"
                >
                  Aucun utilisateur trouvé correspondant à votre recherche.
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

export default AdminUserManagementPage;
