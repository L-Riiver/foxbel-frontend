import React, { useContext, useEffect, useState } from "react";


import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import "../styles/SearchBar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLoginClick, onRegisterClick}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { user, setUser } = authContext;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Sesión cerrada");
    navigate("/");
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user); // context update user data
          } else {
            console.error("Failed to fetch user data.");
            handleLogout(); // invalid token
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [setUser]);
  
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
        {/* User Menu */}
        <div className="menu__container">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={user.profile_picture || "/img/default-user.png"}
                  alt={user.first_name || "User image"}
                  className="user__image"
                  title="Editar perfil"
                />
              </Link>
              <span className="user__name">
                {user.first_name} {user.last_name ? user.last_name : ""}
              </span>

              <button className="button__logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button className="button__login" onClick={onLoginClick}>
                Iniciar Sesión
              </button>
              <button className="button__register" onClick={onRegisterClick}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
      
      
    </div>
  );
};

export default SearchBar;
