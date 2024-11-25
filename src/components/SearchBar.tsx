import React, { useState } from "react";

import "../styles/SearchBar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  //toggle menu 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.querySelector('.navbar')?.classList.toggle('open', !isMenuOpen);
  };

  return (
    <div className="search__container">
      <div className="input__menu__container">
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
            <img src="img/search.svg" alt="Search icon" />
          </button>
        </div>
        {/* Menu Button */}
        <button className={`button__menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
      </div>
      
      
    </div>
  );
};

export default SearchBar;
