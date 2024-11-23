import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import AppContextProvider from "./AppContextProvider"; 

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

  return (
    <Router>
      <AppContextProvider
        onTrackSelect={handleTrackSelect}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home onTrackSelect={handleTrackSelect} />} />
          <Route path="/tracks" element={<SearchResults onTrackSelect={handleTrackSelect} />} />
        </Routes>
        <Player track={currentTrack} />

        {/* Login Modal */}
        {showLoginModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)" }}>
            <div
              style={{
                margin: "100px auto",
                padding: "20px",
                background: "white",
                width: "400px",
                borderRadius: "10px",
              }}
            >
              <h2>Login</h2>
              <button onClick={() => setShowLoginModal(false)} style={{ marginTop: "10px" }}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Register Modal */}
        {showRegisterModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)" }}>
            <div
              style={{
                margin: "100px auto",
                padding: "20px",
                background: "white",
                width: "400px",
                borderRadius: "10px",
              }}
            >
              <h2>Register</h2>
              <button onClick={() => setShowRegisterModal(false)} style={{ marginTop: "10px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </AppContextProvider>
    </Router>
  );
};

export default AppRoutes;
