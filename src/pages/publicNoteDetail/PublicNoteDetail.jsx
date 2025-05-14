import React, { useEffect, useState } from "react";
import { FiCalendar, FiEdit2, FiUser } from "react-icons/fi"; // Icônes
import { useNavigate, Link } from "react-router-dom";
import { UsePublicsNotes } from "../../Context/PublicsNotesContext";
import { FaArrowLeftLong } from "react-icons/fa6";

function PublicNoteDetail() {
  const { publicsNotesState, setPublicNotesState } = UsePublicsNotes();
  const { publicsNotesData, setPublicNotesData } = UsePublicsNotes();
  const { publicProfilState, setPublicProfilState } = UsePublicsNotes();
  const { voirPlusId, setVoirPlusId } = UsePublicsNotes();
  const [donne, setDonne] = useState([]);
  //console.log("NotePublics Items", note);
  //console.log("Id de chaque note", note._id)

  const id = voirPlusId;
  // const api_base = "http://localhost:5000/api";
  const api_base = "https://inkpad.onrender.com/api";
  const navigate = useNavigate();

  useEffect(() => {

    

    const getONnotePublic = async () => {
      try {
        const response = await fetch(`${api_base}/public/note/${id}`);

        if (!response.ok) {
          throw new Error("Erreur de connexion", Error.message);
        }

        const data = await response.json();
        setDonne(data);
        // console.log("donné voir plus", data);
        // console.log("donné voir plus", data.content);
        // console.log(JSON.stringify(data.content))
      } catch (error) {
        // console.log(error.message);
      }
    };

    getONnotePublic();
  }, [api_base, id]);

  // fonction pour ovrir le modal de profil
  const handleNotesSate = (note_id) => {
    setPublicNotesState(true);
  };

  // fonction pour ouvrir le modal des donnée du profil
  const handleNotesUser = (note_id) => {
    setPublicProfilState(true);
  };

  const dataContent = donne;

  // Fonction pour formater les dates
  const formatDate = (dataContent) => {
    if (!dataContent) return "Date inconnue";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    try {
      return new Date(dataContent).toLocaleDateString("fr-FR", options);
    } catch (e) {
      return dataContent; // Retourne la date originale si le formatage échoue
    }
  };

  return (
    <div className="flex mt-12 mx-auto w-[80%] lg:w-[60%] bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between h-auto">
      <div className="">
        <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex text-sm text-blue-700 items-center">
               <FaArrowLeftLong  className="mr-2"/>
 aller aux notes
            </button>
        </div>
        {/* Informations de l'auteur */}
        <div className="flex items-center mb-3">
          <button onClick={handleNotesSate}>
            <img
              src={publicsNotesData.user.avatar}
              alt={`Avatar de ${publicsNotesData.user.username}`}
              className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-indigo-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/40x40/cccccc/333333?text=${publicsNotesData.user.username.charAt(
                  0
                )}&font=raleway`;
              }}
            />
          </button>
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              <button onClick={handleNotesUser}>
                {publicsNotesData.user.username}
              </button>
            </p>
            <div className="text-xs text-gray-400 flex items-center mt-0.5">
              <FiCalendar className="mr-1 h-3 w-3" />
              <span>Publié le : {formatDate(dataContent.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Titre et extrait de la note */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2  group-hover:text-indigo-700 transition-colors">
          {dataContent.title}
        </h3>
        <div className="text-gray-600 text-sm mb-3" style={{ whiteSpace: 'pre-wrap' }}>
          {dataContent.content}
        </div>
      </div>

      {/* Date de dernière modification */}
      <div className="text-xs text-gray-400 mt-2 flex items-center">
        <FiEdit2 className="mr-1 h-3 w-3" />
        <span>
          Dernière modif. : {formatDate(dataContent.updatedAt || dataContent.lastModified)}
        </span>
      </div>
    </div>
  );
}

export default PublicNoteDetail;
