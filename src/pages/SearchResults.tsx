import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface SearchResultsProps {
  onTrackSelect: (track: { title: string; artist: string; album: string; preview: string }) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onTrackSelect }) => {
  const location = useLocation();
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const query = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    if (!query.trim()) return;

    axios
      .get(`/api/deezer/search?q=${query}`)
      .then((response) => {
        setResults(response.data.tracks || []);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results.");
      });
  }, [query]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Search Results for "{query}"</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((track: any) => (
            <li
              key={track.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() =>
                onTrackSelect({
                  title: track.title,
                  artist: track.artist,
                  album: track.album,
                  preview: track.preview,
                })
              }
            >
              <strong>{track.title}</strong> by {track.artist} (Album: {track.album})
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
