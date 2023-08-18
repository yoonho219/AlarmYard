import { styled } from 'styled-components';
import './App.css';
import React from 'react';
import Header from './screen/header/header';
import Footer from './screen/footer/footer';
import Inquire from './screen/inquire';
import Main from './screen/notification/main';
import Individual from './screen/notification/individual';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Header />
            <Layout />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path="/post/:id" element={<Individual />} />
                <Route path='QnA' element={<Inquire />} />
            </Routes >
            <Footer />
        </>
    );
}

const Layout = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

export default App;
