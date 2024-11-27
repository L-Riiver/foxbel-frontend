import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

interface SearchBarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<SearchBarProps> = ({ onLoginClick, onRegisterClick }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    console.error("AuthContext is undefined. Did you forget to wrap your app in an AuthProvider?");
    return null;
  }

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

  return (
    <nav className="navbar" >
      <div className="logo">
        <Link to="/">
          <img className="navbar__logo" src="img/logo.png" alt="Foxbel Logo" />
        </Link>
      </div>
      {user ? (
        <>
          <h2>Mi librería</h2>
          <ul className="menu">
            <li><Link to="/favorites">❤️ Favoritos</Link></li>
          </ul>
        </>
      ) : (
        ""
      )}

      <h2>Descubre</h2>
      <ul className="menu">
        <li><Link to="/">🎸Artistas</Link></li>
        <li><Link to="/">💿Álbumes</Link></li>
        <li><Link to="/">🎤Podcast</Link></li>
      </ul>

      <div className="button__container">
        <h2>Usuario</h2>
        {user ? (
          <div className="user__info">
            <Link to="/profile">
              <img
                src={user.profile_picture || "/img/default-user.png"}
                alt={user.first_name || "User image"}
                className="user__image"
                title="Editar perfil"
              />
            </Link>
            <span className="user__name">
              Bienvenido <br /> {user.first_name} {user.last_name ? user.last_name.charAt(0) : ""}.
            </span>

            <button className="button__logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
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
    </nav>
  );
};

export default Navbar;
