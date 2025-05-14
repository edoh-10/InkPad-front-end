import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashBoar/DashBoard";
import AllPages from "./pages/allPages/AllPages";
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes";
import { useAuth } from "./Context/AuthContext";
import AnimatedInkPadLogo from "./features/AnimatedInkPadLogo/AnimatedInkPadLogo";
import { useState, useEffect } from "react";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage/AdminUserManagementPage";
import AdminNoteManagementPage from "./pages/AdminNoteManagementPage/AdminNoteManagementPage";
import AdminStatsPage from "./pages/AdminStatsPage/AdminStatsPage";
import AdminContactMessagesPage from "./pages/AdminContactMessagesPage/AdminContactMessagesPage";
import HomePage from "./pages/Acceuil/Acceuil";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/Login/Login";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import DashboardHomePage from "./pages/DashboardHomePage/DashboardHomePage";
import PublicNoteDetail from "./pages/publicNoteDetail/PublicNoteDetail";
import AcceuilDashBoard from "./components/AcceuilDashBoard/AcceuilDashBoard";
import NewNotePage from "./pages/NewNotePage/NewNotePage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetail";
import EditNotePage from "./pages/EditNotePage/EditNotePage";

function App() {

  // ----------------------------------------------
  const { authState } = useAuth();
  const [load, setLoad] = useState(authState.isLoading);

  useEffect(() => {
    const timeLoad = () => {
      if (load) {
        const timer = setTimeout(() => {
          return <AnimatedInkPadLogo />;
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    return timeLoad();
  });

  return (
    <Routes>
      {/* <Route path="/*" element={<AllPages />} /> */}
      {/* route landing */}
      <Route path="/" element={<AllPages />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/regiter" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password-reset" element={<ResetPasswordPage />} />
      </Route>
      {/* ----------- */}
      <Route
        path="/inkpad/*"
        element={
          <ProtectRoutes>
            <DashboardPage />
          </ProtectRoutes>
        }
      />
      {/* route user */}
     

      {/* routes admin */}
      {/* Routes Administrateur */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout /> {/* Le layout admin qui contient un <Outlet /> */}
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} /> {/* /admin */}
        <Route path="users" element={<AdminUserManagementPage />} />{" "}
        {/* /admin/users */}
        <Route path="notes" element={<AdminNoteManagementPage />} />{" "}
        {/* /admin/notes */}
        <Route path="stats" element={<AdminStatsPage />} />
        {/* staistiques page */}
        <Route path="message" element={<AdminContactMessagesPage />} />
        {/* Ajoutez d'autres sous-routes admin ici */}
      </Route>
    </Routes>
  );
}

export default App;
