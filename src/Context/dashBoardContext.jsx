import { createContext, useContext, useState, useEffect } from "react";

export const DashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [handleCreateNote, sethandleCreateNote] = useState(null);
  const [handleSearch, sethandleSearch] = useState(null);
  const [filteredNotes, setfilteredNotes] = useState(null);
  const [handleEditNote, sethandleEditNote] = useState(null);
  const [handleDeleteNote, sethandleDeleteNote] = useState(null);
  const [setNoteTo, setSetNoteTo] = useState(null);

  return (
    <DashBoardContext.Provider
      value={{
        handleCreateNote,
        sethandleCreateNote,
        handleSearch,
        sethandleSearch,
        filteredNotes,
        setfilteredNotes,
        handleEditNote,
        sethandleEditNote,
        handleDeleteNote,
        sethandleDeleteNote,
        setNoteTo,
        setSetNoteTo,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

export const useDashBoard = () => {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    return null;
  };
  return context;
};
