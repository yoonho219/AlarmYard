import { styled } from "styled-components";
import "./App.css";
import React from "react";
import Header from "./pages/header/header";
import Footer from "./pages/footer/footer";
import Login from "./pages/login";
import Inquire from "./pages/inquire";
import Main from "./pages/notification/main";
import Individual from "./pages/notification/individual";
import { Route, Routes } from "react-router-dom";
import KakaoLogin from "./auth/kakaologin";

function App() {
  return (
    <>
      <Header />
      <Layout />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/kakao" element={<KakaoLogin />} />
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Individual />} />
        <Route path="QnA" element={<Inquire />} />
      </Routes>
      <Footer />
    </>
  );
}

const Layout = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export default App;
