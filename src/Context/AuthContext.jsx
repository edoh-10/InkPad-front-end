import { createContext, useState, useContext, useEffect } from "react";
import React from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const navigate = useNavigate();
  // console.log(
  //   "[AuthProvider1] Le composant AuthProvider est en cours de rendu."
  // );
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    isLoading: true,
    userData: 'Utilisateur',
    user: null,
  });



  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("role", userData.role);
    const userRole = localStorage.getItem("role");
    // console.log("userdata in authState", userData);
    // console.log("token reçu avec succès");
    setAuthState({
      token: token,
      isAuthenticated: true,
      isLoading: false,
      user: userRole,
    });
    // console.log("AuthContext: Utilisateur connecté, état mis à jour.");
  };
// console.log('Ceci est la valeur de user dans authState', authState.user)


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("token reçu pour la redirection");
    if (token) {
      setAuthState({
        token: token,
        isAuthenticated: true,
        isLoading: false,
      });

    } else {
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuthState({
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    console.log("AuthContext: Utilisateur déconnecté.");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    return null;
  }
  return context;
};
