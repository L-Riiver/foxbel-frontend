import React, { useState, useRef } from "react";
import "../styles/Player.scss";

interface PlayerProps {
  track: {
    title: string;
    artist: string;
    album: string;
    album_cover: string;
    preview: string;
  } | null;
}

const Player: React.FC<PlayerProps> = ({ track }) => {
  if (!track) return null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="player">
      <div className={`player__container ${isPlaying ? '' : 'play'}`}>
          <div className="disc__circle"></div>
          <img src={track.album_cover} alt={track.album} className="track__img" />
      </div>
      <div className="track-info">
        <div className="player__info">
          <span className="title"><strong>{track.title}</strong></span>
          <span className="artist">{track.artist} - {track.album}</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? <img src="img/play.svg" alt="play icon" /> : <img src="img/pause.svg" alt="pause icon" />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>

      <audio ref={audioRef} autoPlay src={track.preview} />
    </div>
  );
};

export default Player;
