import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Error404 from './components/Error404';
import Nota from './components/NotaManage';
import SignOut from './components/SignOut';
import { AuthProvider } from './components/AuthContext';
import './scss/App.scss';

function App() {
  return (
    <Router>
      <div id='App'>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/header" element={<Header />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/mainmenu" element={<MainMenu />} />
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/nota" element={<Nota />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App;
