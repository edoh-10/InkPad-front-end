import {
  useContext,
  createContext,
  useEffect,
  useState,
  Children,
} from "react";
import React from "react";

export const PublicsNotesContext = createContext();

export const PublicsNotesProvider = ({ children }) => {
  const [publicsNotesData, setPublicNotesData] = useState([]);
  const [publicsNotesState, setPublicNotesState] = useState(false);
  const [publicProfilState, setPublicProfilState] = useState(false);
  const [voirPlusId, setVoirPlusId] = useState([]);

  return (
    <PublicsNotesContext.Provider
      value={{
        publicsNotesData,
        setPublicNotesData,
        publicsNotesState,
        setPublicNotesState,
        publicProfilState,
        setPublicProfilState,
        voirPlusId,
        setVoirPlusId,
      }}
    >
      {children}
    </PublicsNotesContext.Provider>
  );
};

export const UsePublicsNotes = () => {
  const context = useContext(PublicsNotesContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    return null;
  }
  return context;
};
