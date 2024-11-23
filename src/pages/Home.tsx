import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/GlobalStyles";

interface HomeProps {
  onTrackSelect: (track: { title: string; artist: string; album: string; preview: string }) => void;
}

const Home: React.FC<HomeProps> = ({ onTrackSelect }) => {
  const [artistInfo, setArtistInfo] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/deezer/search?q=Michael Jackson`)
      .then((response) => {
        const data = response.data.tracks || [];
        if (data.length > 0) {
          const firstTrack = data[0];
          setArtistInfo({
            artist: firstTrack.artist,
            album: firstTrack.album,
            albumCover: firstTrack.albumCover,
          });
          setTracks(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching artist info:", err);
        setError("Failed to fetch artist info.");
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="home__h1 offscreen">Foxbel Music</h1>

      {/* InfoCard */}
      {artistInfo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            background: `url(${artistInfo.albumCover}) no-repeat center center / cover`,
            color: "white",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2>{artistInfo.artist}</h2>
            <p>Album: {artistInfo.album}</p>
          </div>
        </div>
      )}

      {/* Tracks */}
      <h2>Top Songs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tracks.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tracks.map((track: any) => (
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
              <strong>{track.title}</strong> by {track.artist}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default Home;
