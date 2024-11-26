import React, { useEffect, useState } from "react";
import axios from "axios";
import Results from "../components/Results";
import "../styles/home.scss";

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
            artist_img: firstTrack.artist_img,
            preview: firstTrack.preview,
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
    <div className="home">
      <h1 className="home__h1 offscreen"><strong>Foxbel Music</strong></h1>

      {artistInfo && (
        <div className="artist__infocard">
          <img src={artistInfo.artist_img} alt="artistInfo.title" className="infocard_background" />
          <div className="play__infocard__container">
            <div
              className="play__infocard"
              onClick={() =>
                onTrackSelect({
                  title: artistInfo.title,
                  artist: artistInfo.artist,
                  album: artistInfo.album,
                  preview: artistInfo.preview,
                })
              }
            >
              <img className="infocard__img" src={artistInfo.albumCover} alt={artistInfo.title} />
            </div>
          </div>
          <div className="infocard__info">
            <h2>{artistInfo.artist}</h2>
            <p>
              Álbum
              <br />
              <strong>{artistInfo.album}</strong>
            </p>
          </div>
        </div>
      )}

      <h2>Grandes Éxitos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Results tracks={tracks} onTrackSelect={onTrackSelect} />
    </div>
  );
};

export default Home;
