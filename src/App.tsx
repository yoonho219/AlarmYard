import "./App.css";
import React from "react";
import Header from "./pages/header/header";
import Footer from "./pages/footer/footer";
import LoginPage from "./pages/login-page";
import Inquire from "./pages/inquire";
import Main from "./pages/notification/main";
import Individual from "./pages/notification/individual";
import { Route, Routes } from "react-router-dom";
import KakaoLogin from "./components/auth/kakaologin";
import { AuthProvider } from "./components/auth/provider";
import NaverLogin from "./components/auth/naverlogin";
import Chatting from "./pages/used-trade/chat";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/kakao" element={<KakaoLogin />} />
        <Route path="/oauth/naver" element={<NaverLogin />} />
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Individual />} />
        <Route path="QnA" element={<Inquire />} />
        <Route path="/chatting" element={<Chatting />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
