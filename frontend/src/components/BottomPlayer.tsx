import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SkipBack, SkipForward, Shuffle, Repeat, MonitorPlay, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import './BottomPlayer.css';

const BottomPlayer: React.FC = () => {
  const { 
    currentSong, 
    isShuffle, toggleShuffle, 
    isRepeat, toggleRepeat,
    nextSong, prevSong 
  } = usePlayer();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // Parse duration "M:SS" to seconds — derived state, no effect needed
  const duration = useMemo(() => {
    const parts = currentSong.duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }, [currentSong]);
  const currentTimeRef = useRef(0);

  // Playback timer — advances the progress bar and handles end-of-song
  useEffect(() => {
    currentTimeRef.current = 0;
    timerRef.current = window.setInterval(() => {
      currentTimeRef.current += 1;
      if (currentTimeRef.current >= duration) {
        if (isRepeat) {
          currentTimeRef.current = 0;
        } else {
          nextSong();
          currentTimeRef.current = 0;
        }
      }
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, isRepeat, nextSong]);

  const goToVideo = () => navigate('/video');

  return (
    <div className="bottom-player-container">
      <div className="bottom-player">
        <div className="player-left">
          <img src={currentSong.coverUrl} alt="Cover" className="player-cover" />
          <div className="player-info">
            <h4 className="player-title">{currentSong.title}</h4>
            <p className="player-artist">{currentSong.artist}</p>
          </div>
          <button 
            className={`control-btn small like-btn ${isLiked ? 'active' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            title="Yêu thích"
            style={{ marginLeft: '16px' }}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button 
              className={`control-btn small ${isShuffle ? 'active' : ''}`}
              onClick={toggleShuffle}
              title="Trộn bài"
            >
              <Shuffle size={16} />
            </button>
            <button className="control-btn" onClick={prevSong} title="Bài trước">
              <SkipBack size={20} />
            </button>
            
            <button className="control-btn" onClick={nextSong} title="Bài tiếp theo">
              <SkipForward size={20} />
            </button>
            <button 
              className={`control-btn small ${isRepeat ? 'active' : ''}`}
              onClick={toggleRepeat}
              title="Hát lại"
            >
              <Repeat size={16} />
            </button>
          </div>
        </div>

        <div className="player-right">
          <button className="video-btn" onClick={goToVideo} title="Mở Video Karaoke">
            <MonitorPlay size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
