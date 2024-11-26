import React, { useContext, useState } from "react";
import "../styles/Results.scss";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  album_cover: string;
  preview: string;
}

interface ResultsProps {
  tracks: Track[];
  onTrackSelect: (track: { title: string; artist: string; album: string; album_cover: string; preview: string }) => void;
  title?: string;
}

const Results: React.FC<ResultsProps> = ({ tracks, onTrackSelect, title }) => {
  const { user } = useContext(AuthContext);
  const [menuTrackId, setMenuTrackId] = useState<number | null>(null);

  const handleAddFavorite = async (track: Track) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(track),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Track added to favorites");
      } else {
        toast.error(data.message || "Error adding to favorites");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites");
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Track removed from favorites");
      } else {
        toast.error(data.message || "Error removing from favorites");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error removing from favorites");
    }
  };

  return (
    <div className="results">
      {title && <h2 className="results__title">{title}</h2>}
      <div className="results__container">
        {tracks.map((track) => (
          <div key={track.id} className="results__item">
            <img
              className="results__img"
              src={track.album_cover}
              alt={track.title}
              onClick={() =>
                onTrackSelect({
                  title: track.title,
                  artist: track.artist,
                  album: track.album,
                  album_cover: track.album_cover,
                  preview: track.preview,
                })
              }
            />
            <strong className="results__track-title">{track.title}</strong>
            <span className="results__track-artist">{track.artist}</span>

            {user && (
              <div className="results__menu">
                <span onClick={() => setMenuTrackId(menuTrackId === track.id ? null : track.id)}>
                  &#x22EE;
                </span>
                {menuTrackId === track.id && (
                  <div className="results__menu-options">
                    <button onClick={() => handleAddFavorite(track)}>Add to Favorites</button>
                    <button onClick={() => handleRemoveFavorite(track.id)}>Remove from Favorites</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
