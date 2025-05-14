// AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Adaptez le chemin
import AnimatedInkPadLogo from '../../features/AnimatedInkPadLogo/AnimatedInkPadLogo';

function AdminProtectedRoute({ children }) {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return <AnimatedInkPadLogo />;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirige vers login si pas connecté
  }


  const userRole = localStorage.getItem("role");
  // console.log("log de userRole dans adminProtectedRoute", userRole);
  
  if (userRole !== 'admin') {
    // Redirige vers une page d'accès refusé ou la page d'accueil si l'utilisateur n'est pas admin
    // Vous pouvez créer une page /unauthorized ou simplement rediriger vers le tableau de bord utilisateur
    console.warn("Tentative d'accès admin par un non-admin:", authState.user);
    return <Navigate to="/inkpad" replace />; 
  }

  // Si authentifié ET admin, rend le contenu
  return children ? children : <Outlet />;
}

export default AdminProtectedRoute;