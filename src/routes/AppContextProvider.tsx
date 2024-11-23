import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface AppContextProviderProps {
  children: ReactNode;
  onTrackSelect: (track: { title: string; artist: string; album: string; preview: string }) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
  onLoginClick,
  onRegisterClick,
}) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/tracks?search=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      {children}
    </div>
  );
};

export default AppContextProvider;
