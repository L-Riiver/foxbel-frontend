import React from "react";
import "../styles/Player.scss";

interface PlayerProps {
  track: {
    title: string;
    artist: string;
    album: string;
    preview: string;
  } | null;
}

const Player: React.FC<PlayerProps> = ({ track }) => {
  if (!track) return null;

  return (
    <div className="player">
      <div className="track-info">
        <span className="title">{track.title}</span>
        <span className="artist">{track.artist} - {track.album}</span>
      </div>
      <audio controls autoPlay src={track.preview} />
    </div>
  );
};

export default Player;
