import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserNavbar from "../../components/userNavbar/UserNavbar";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

function Header() {
  const { authState } = useAuth();
  return (
    <div className="fixed w-full z-[100]">
      {!authState.isAuthenticated ? <Navbar /> : <UserNavbar />}
    </div>
  );
}

export default Header;
