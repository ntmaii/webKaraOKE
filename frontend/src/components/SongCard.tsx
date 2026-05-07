import React, { useState } from 'react';
import { Play, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Song } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';
import AddToPlaylistModal from './AddToPlaylistModal';
import './SongCard.css';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { setCurrentSong, setIsPlaying } = usePlayer();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const handlePlay = () => {
    setCurrentSong(song);
    setIsPlaying(true);
    navigate('/video');
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  return (
    <>
      <div className="song-card" onClick={handlePlay}>
        <div className="song-card-img-container">
          <img src={song.coverUrl} alt={song.title} className="song-card-img" />
          <button className="play-overlay">
            <Play fill="currentColor" size={24} />
          </button>
          <button className="add-overlay" onClick={handleAddClick} title="Thêm vào Playlist">
            <Plus fill="currentColor" size={20} />
          </button>
        </div>
        <h5 className="song-card-title">{song.title}</h5>
        <p className="song-card-artist">{song.artist}</p>
      </div>

      {showAddModal && (
        <AddToPlaylistModal 
          songId={song.id} 
          onClose={() => setShowAddModal(false)} 
        />
      )}
    </>
  );
};

export default SongCard;
