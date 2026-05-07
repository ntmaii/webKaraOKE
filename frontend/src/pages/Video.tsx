import React, { useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import './Video.css';

const Video: React.FC = () => {
  const navigate = useNavigate();
  const { currentSong, isRepeat, nextSong } = usePlayer();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Extract YouTube ID from various URL formats
  const getYoutubeId = (url: string) => {
    if (!url) return '5aXz15E1DQQ'; // Default fallback video
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '5aXz15E1DQQ';
  };

  // Build the embed URL — add loop param when repeat is on
  const getCleanUrl = (url: string) => {
    const videoId = getYoutubeId(url);
    let params = `autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
    if (isRepeat) {
      params += `&loop=1&playlist=${videoId}`;
    }
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  const videoEmbedUrl = getCleanUrl(currentSong?.videoUrl || '');

  // Listen for YouTube player state changes via postMessage
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      // YouTube sends info with playerState: 0 = ended
      if (data?.event === 'onStateChange' && data?.info === 0) {
        if (isRepeat) {
          // Replay: seek to start
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
            '*'
          );
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
            '*'
          );
        } else {
          // Next song (shuffle-aware via PlayerContext)
          nextSong();
        }
      }
    } catch {
      // Ignore non-JSON messages
    }
  }, [isRepeat, nextSong]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="video-page">
      <div className="video-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <div className="video-song-info">
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      
      <div className="video-container">
        <iframe 
          ref={iframeRef}
          src={videoEmbedUrl} 
          title="Karaoke Video Player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="karaoke-iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Video;

