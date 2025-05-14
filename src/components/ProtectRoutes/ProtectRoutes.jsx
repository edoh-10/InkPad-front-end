import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import React from 'react';

function ProtectRoutes({ children }) {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    // console.log("Non authentifié, redirection...");
    return <Navigate to="/login" replace />;
  }


  const userRole = localStorage.getItem("role");
  // console.log("log depuis protectRoutes", userRole);

  // console.log("Utilisateur authentifié, accès autorisé");
  if(userRole === 'user'){
    return children ? children : <Outlet/>;
  }else if(userRole === 'admin'){
    return <Navigate to="/admin" replace />
  }
}

export default ProtectRoutes;
