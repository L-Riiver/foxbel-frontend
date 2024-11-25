import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface AppContextProviderProps {
  children: ReactNode;
  onTrackSelect: (track: { title: string; artist: string; album: string; preview: string }) => void;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/tracks?search=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}  />
      {children}
    </div>
  );
};

export default AppContextProvider;
