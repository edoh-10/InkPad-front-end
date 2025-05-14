import React from "react";
import Header from "../../features/Header/Header";
import Main from "../../features/Main/Main";
import HomePage from "../Acceuil/Acceuil";
import Footer from "../../features/Footer/Footer";
import RegisterPage from "../Register/Register";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Login/Login";
import ForgotPasswordPage from "../ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";
import AnimatedInkPadLogo from "../../features/AnimatedInkPadLogo/AnimatedInkPadLogo";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


function AllPages() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  if(isLoading){
    return <AnimatedInkPadLogo/>
  }

  return (
    <div >
      <Header/>
      <Main>
        {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/regiter" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
            <Route path="/password-reset" element={<ResetPasswordPage/>} />
        </Routes> */}
        <Outlet/>
      </Main>
      <Footer />
      {/* <AnimatedInkPadLogo/> */}
    </div>
  );
}

export default AllPages;
