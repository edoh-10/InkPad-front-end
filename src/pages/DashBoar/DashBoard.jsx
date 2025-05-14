// DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../../features/Header/Header";
import Footer from "../../features/Footer/Footer";
import AcceuilDashBoard from "../../components/AcceuilDashBoard/AcceuilDashBoard";
// import FilterSortControls from './FilterSortControls';
import { Routes, Route } from "react-router-dom";
import NewNotePage from "../NewNotePage/NewNotePage";
import { useNavigate } from "react-router-dom";
import NoteDetailPage from "../NoteDetailPage/NoteDetail";
import EditNotePage from "../EditNotePage/EditNotePage";
import UserProfileModal from "../../modals/UserProfileModal";
import { useUserProfil } from "../../Context/UserProfileContext";
import { useAuth } from "../../Context/AuthContext";
import ProfilImage from "../../modals/ProfilImage";
import EditProfileModal from "../../modals/ChangeProfilModal";
import DashboardHomePage from "../DashboardHomePage/DashboardHomePage";
import PublicProfilImage from "../../modals/PublicProfilImages";
import PublicUserProfileModal from "../../modals/PublicUserProfileModals";
import PublicNoteDetail from "../publicNoteDetail/PublicNoteDetail";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {

  const {logout} = useAuth();

  const { noteTo, setNoteTo } = useUserProfil();
  // const notes = noteToEdit;

  // déclaration de navigate
  const navigate = useNavigate();
  // const [note, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(noteTo);

  // initialisationt du state qui va contenir les informations de user
  const { setUser } = useUserProfil();

  // const api_base_url = "http://localhost:5000/api";
  const api_base_url = "https://inkpad.onrender.com/api";
  const token = localStorage.getItem("authToken");

  // Simule le chargement des notes (à remplacer par un appel API réel)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_base_url}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.stauts}`);
        }

        if (response.status === 401) {
          // localStorage.removeItem("authToken");
          // localStorage.removeItem("username");
          // navigate("/");
          logout();
          return;
        }

        const data = await response.json();
        // setNotes(data.notes);
        setNoteTo(data.notes);
        const userProfilData = [
          data.username,
          data.email,
          data.avatar,
          data.bio,
          data.createdAt,
          data._id,
        ];
        // console.log(userProfilData);
        // console.log("Données reçues: DATA", data);
        setUser(userProfilData);
      } catch (error) {
        console.error("erreur lors de la requête GET :", error);
      }
    };
    fetchData();
  }, [setUser, api_base_url]);

  const supprimerNote = async (id) => {
    try {
      const response = await fetch(`${api_base_url}/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      const data = await response.json();
      // console.log("data supprimer");
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  const handleCreateNote = () => {
    // console.log("Action: Créer une nouvelle note");
    // Ici, vous naviguerez vers la page de création de note ou ouvrirez un modal
    // Exemple: history.push('/notes/new');
    navigate("/inkpad/create-note");
    // alert("Redirection vers la création de note...");
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    // console.log("Recherche pour:", term);
  };

  const handleEditNote = (noteId) => {
    // console.log("Action: Modifier la note ID:", noteId);
    navigate(`/inkpad/edit-page/${noteId}`);
  };

  const handleDeleteNote = (noteId) => {
    // console.log("Action: Supprimer la note ID:", noteId);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      supprimerNote(noteId);
      setNoteTo((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    }
  };

  // Filtre les notes en fonction du terme de recherche
  const filteredNotes = noteTo.filter(
    (note) =>
      (note.title?.toLowerCase() || "").includes(searchTerm) ||
      (note.contentSnippet?.toLowerCase() || "").includes(searchTerm)
  );


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      <Header /> {/* Devrait utiliser le logo "InkPad" et un état connecté */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[6vh]">
        <Routes>
          <Route path="/" element={<DashboardHomePage />} />
          <Route path="/notes/public/:id" element={<PublicNoteDetail />} />
          <Route
            path="/mes-notes"
            element={
              <AcceuilDashBoard
                handleCreateNote={handleCreateNote}
                handleSearch={handleSearch}
                filteredNotes={filteredNotes}
                handleEditNote={handleEditNote}
                handleDeleteNote={handleDeleteNote}
              />
            }
          />
          <Route
            path="/create-note"
            element={<NewNotePage setNotes={setNoteTo} />}
          />
          <Route
            path="/notes/:noteId"
            element={<NoteDetailPage setNotes={setNoteTo} />}
          />
          <Route
            path="/edit-page/:noteId"
            element={<EditNotePage setNotes={setNoteTo} />}
          />
        </Routes>
        {/* <Outlet/> */}
      </main>
      <Footer />
      <UserProfileModal />
      <ProfilImage />
      <EditProfileModal />
      <PublicUserProfileModal />
      <PublicProfilImage />
    </div>
  );
};

export default DashboardPage;
