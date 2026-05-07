import React, { useState } from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Song } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import AddToPlaylistModal from './AddToPlaylistModal';
import './SongListItem.css';

interface SongListItemProps {
  song: Song;
  index?: number;
  onRemove?: () => void;
}

const SongListItem: React.FC<SongListItemProps> = ({ song, onRemove }) => {
  const { setCurrentSong, setIsPlaying } = usePlayer();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const isFav = favoriteIds.includes(song.id);

  const handlePlay = () => {
    setCurrentSong(song);
    setIsPlaying(true);
    navigate('/video');
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering handlePlay
    toggleFavorite(song.id);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  return (
    <>
      <div className="song-list-item" onClick={handlePlay} style={{ cursor: 'pointer' }}>
        <div className="song-info-col">
          <img src={song.coverUrl} alt={song.title} className="song-list-img" />
          <span className="song-list-title">{song.title}</span>
        </div>
        <div className="song-artist-col">
          <span className="song-list-artist">{song.artist}</span>
        </div>
        <div className="song-time-col">
          <span className="song-list-time">{song.duration}</span>
          
          <button className="heart-btn" onClick={handleAddClick} title="Thêm vào Playlist">
            <Plus size={18} />
          </button>
          
          <button className={`heart-btn ${isFav ? 'active' : ''}`} onClick={handleToggleFavorite}>
            <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
          </button>
          
          {onRemove && (
            <button className="heart-btn" onClick={handleRemoveClick} title="Xóa khỏi Playlist">
              <Trash2 size={18} />
            </button>
          )}
        </div>
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

export default SongListItem;
