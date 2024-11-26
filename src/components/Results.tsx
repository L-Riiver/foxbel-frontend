import React from "react";
import "../styles/Results.scss";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  preview: string;
}

interface ResultsProps {
  tracks: Track[];
  onTrackSelect: (track: { title: string; artist: string; album: string; preview: string }) => void;
  title?: string;
}

const Results: React.FC<ResultsProps> = ({ tracks, onTrackSelect, title }) => {
  return (
    <div className="results">
      {title && <h2 className="results__title">{title}</h2>}
      <div className="results__container">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="results__item"
            onClick={() =>
              onTrackSelect({
                title: track.title,
                artist: track.artist,
                album: track.album,
                preview: track.preview,
              })
            }
          >
            <img className="results__img" src={track.albumCover} alt={track.title} />
            <strong className="results__track-title">{track.title}</strong>
            <span className="results__track-artist">{track.artist}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
