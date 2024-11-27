import React, { useEffect, useState, useContext } from "react";
import Results from "../components/Results";
import AuthContext from "../context/AuthContext";

const Favorites: React.FC<{ onTrackSelect: any }> = ({ onTrackSelect }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/api/favorites/"+user.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then(setFavorites)
        .catch((error) => setError("Failed to load favorites: " + error));
    }
  }, [user]);

  return (
    <div className="favorites">
      <h1>Your Favorites</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Results tracks={favorites} onTrackSelect={onTrackSelect} />
    </div>
  );
};

export default Favorites;
