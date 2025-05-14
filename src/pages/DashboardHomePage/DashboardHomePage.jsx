// DashboardHomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Supposons que Header et Footer sont gérés par un layout parent ou importés ici si nécessaire
// import Header from './Header';
// import Footer from './Footer';
import PublicNoteList from "../../components/PublicNoteList/PublicNoteList"; // Assurez-vous que le chemin est correct
import { useAuth } from "../../Context/AuthContext"; // Pour saluer l'utilisateur
// import { useUserProfil } from "../../Context/UserProfileContext";
import { UsePublicsNotes } from "../../Context/PublicsNotesContext";
// import PublicProfilImage from "../../modals/PublicProfilImages";

// URL de base de votre API.
const API_BASE_URL = "https://inkpad.onrender.com/api"; // À ADAPTER

// Données de démonstration pour les notes publiques (simulant un appel API)

const DashboardHomePage = () => {
  const navigate = useNavigate();
  const [publicNotes, setPublicNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { publicsNotesData, setPublicNotesData } = UsePublicsNotes();
  const {logout} = useAuth();
  
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPublicNotes = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Remplacer par votre appel API réel
        const response = await fetch(`${API_BASE_URL}/public/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // localStorage.removeItem("authToken");
          // localStorage.removeItem("username");
          // navigate("/");
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Erreur HTTP ${response.status}: Impossible de charger les notes publiques.`
          );
        }
        const data = await response.json();
        setPublicNotes(data);
        // console.log("les données publics", data);

        // console.log("newData");

        // Simulation avec les données de démonstration
        // console.log("Chargement des notes publiques (simulation)...");
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simuler une latence réseau
        // setPublicNotes(demoPublicNotes);
        setPublicNotes(data);
        // setPublicNotesData(data.user);
      } catch (err) {
        console.error("Erreur lors du chargement des notes publiques:", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicNotes();
  }, []);

  const dataUser = localStorage.getItem("username");
  const userName = dataUser || "Utilisateur";

  return (
    // Supposons que Header et Footer sont gérés par un layout parent
    // <div className="flex flex-col min-h-screen bg-gray-100">
    //   <Header /> {/* Si non géré par un layout */}
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section de bienvenue */}
      <div className="mb-10 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bienvenue sur votre tableau de bord, {userName} !
        </h1>
        <p className="text-indigo-100">
          Découvrez les dernières notes partagées par la communauté InkPad.
        </p>
      </div>

      {/* Section des notes publiques */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-indigo-300">
          Notes Publiques Récentes
        </h2>
        {isLoading && (
          <div className="text-center py-10">
            {/* Vous pouvez utiliser votre AnimatedInkPadLogo ici aussi */}
            <p className="text-gray-500 text-lg">
              Chargement des notes publiques...
            </p>
          </div>
        )}
        {error && (
          <div className="text-center py-10 bg-red-50 p-4 rounded-lg">
            <p className="text-red-600 text-lg">Erreur : {error}</p>
          </div>
        )}
        {!isLoading && !error && <PublicNoteList notes={publicNotes} />}
      </div>

      {/* Vous pouvez ajouter d'autres sections ici, comme un accès rapide à "Mes Notes" ou "Créer une Note" */}
      {/* Exemple:
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Vos Notes</h3>
                <p className="text-gray-600 mb-4">Accédez à toutes vos notes personnelles et organisez vos idées.</p>
                <a href="/dashboard/mes-notes" className="text-indigo-600 hover:underline font-medium">Voir mes notes →</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Créer Rapidement</h3>
                <p className="text-gray-600 mb-4">Une nouvelle idée ? N'attendez pas, créez une note instantanément.</p>
                <a href="/dashboard/nouvelle-note" className="text-indigo-600 hover:underline font-medium">Créer une note →</a>
            </div>
        </div>
        */}

      <div className="fixed">{/* <PublicProfilImage /> */}</div>
    </div>
    //   <Footer /> {/* Si non géré par un layout */}
    // </div>
  );
};

export default DashboardHomePage;
