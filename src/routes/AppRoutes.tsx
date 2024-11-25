import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import Profile from "../pages/Profile";

//components
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import AppContextProvider from "./AppContextProvider";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AppRoutes: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    album: string;
    preview: string;
  } | null>(null);

  const handleTrackSelect = (track: {
    title: string;
    artist: string;
    album: string;
    preview: string;
  }) => {
    setCurrentTrack(track);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <Router>
      <AppContextProvider onTrackSelect={handleTrackSelect}>
        <Navbar
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowRegisterModal(true)}
        />
        <Routes>
          <Route path="/" element={<Home onTrackSelect={handleTrackSelect} />} />
          <Route path="/tracks" element={<SearchResults onTrackSelect={handleTrackSelect} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Player track={currentTrack} />

        {/* Login Modal */}
        {showLoginModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModals();
            }}
          >
            <div className="modal-content">
              <LoginForm
                onClose={() => setShowLoginModal(false)}
                onSwitchToRegister={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Register Modal */}
        {showRegisterModal && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModals();
            }}
          >
            <div className="modal-content">
              <RegisterForm
                onClose={() => setShowRegisterModal(false)}
                onSwitchToLogin={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
              />
            </div>
          </div>
        )}
      </AppContextProvider>
    </Router>
  );
};

export default AppRoutes;
