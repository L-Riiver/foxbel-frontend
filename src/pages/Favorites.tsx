import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Favorites: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirigir si no está autenticado
    }
  }, [user, navigate]);

  return (
    <div className="favorites">
      <h2>Mis Favoritos</h2>
      {/* Contenido de favoritos */}
      <p>Aquí aparecerán tus canciones favoritas.</p>
    </div>
  );
};

export default Favorites;
