import { useContext, createContext, useEffect, useState } from "react";
import React from "react";

export const UserProfilContext = createContext();

export const UserProfilProvider = ({ children }) => {
  // state pour le UserProfil modals
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState("");
  const [profilImage, setProfilImage] = useState(false);
  const [changeProfil, setChangeProfil] = useState(false);
  const [profilExistData, setProfilExistData] = useState([]);
  const [noteTo, setNoteTo] = useState([]);
//   const [userDat, setUserDat] = useState([]);
//   console.log("je suis dans useUserContext", userDat);

  return (
    <UserProfilContext.Provider
      value={{
        isOpen,
        setIsOpen,
        user,
        setUser,
        profilImage,
        setProfilImage,
        changeProfil,
        setChangeProfil,
        profilExistData,
        setProfilExistData,
        noteTo,
        setNoteTo,
        // userDat, 
        // setUserDat
      }}
    >
      {children}
    </UserProfilContext.Provider>
  );
};

export const useUserProfil = () => {
  const context = useContext(UserProfilContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    return null;
  }
  return context;
};
