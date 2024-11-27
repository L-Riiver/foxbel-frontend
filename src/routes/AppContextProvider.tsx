import React, { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

interface AppContextProviderProps {
  children: ReactNode;
  onTrackSelect: (track: { title: string; artist: string; album: string;album_cover:string; preview: string }) => void;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/tracks?search=${encodeURIComponent(query)}`);
  };

  //login and register
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch}
                onLoginClick={() => setShowLoginModal(true)}
                onRegisterClick={() => setShowRegisterModal(true)}  />
      {children}
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
    </>
  );
};

export default AppContextProvider;
