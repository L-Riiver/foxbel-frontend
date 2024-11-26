import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Results from "../components/Results";

interface SearchResultsProps {
  onTrackSelect: (track: { title: string; artist: string; album: string; album_cover: string; preview: string }) => void;
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
    <div className="search-results">
      <h1>Resultados para "{query}"</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Results tracks={results} onTrackSelect={onTrackSelect} />
    </div>
  );
};

export default SearchResults;
