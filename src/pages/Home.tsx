import React, { useEffect, useState } from "react";
import axios from "axios";
import Results from "../components/Results";
import "../styles/home.scss";

interface HomeProps {
  onTrackSelect: (track: { title: string; artist: string; album: string;album_cover:string; preview: string }) => void;
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
            title: firstTrack.title,
            artist: firstTrack.artist,
            album: firstTrack.album,
            album_cover: firstTrack.album_cover,
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
                  album_cover: artistInfo.album_cover,
                  preview: artistInfo.preview,
                })
              }
            >
              <div className="disc__circle"></div>
              <img className="infocard__img" src={artistInfo.album_cover} alt={artistInfo.title} />
            </div>
          </div>
          <div className="infocard__info">
            <h2>{artistInfo.artist}</h2>
            <p>
              <strong>{artistInfo.title}</strong>
              <br />
              {artistInfo.album}
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
