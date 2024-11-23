import React, { useState } from "react";

import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLoginClick, onRegisterClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search__container">
      <div className="search__input__container">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search__input"
        />
        {/* Search Button */}
        <button className="button__search" onClick={handleSearch} >
          <img src="../../public/img/search.svg" alt="Search icon" />
        </button>
      </div>
      {/* Login and Register Buttons */}
      <button className="button__login" onClick={onLoginClick}>
        Login
      </button>
      <button className="button__register" onClick={onRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default SearchBar;
