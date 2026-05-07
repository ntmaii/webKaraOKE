import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLAYLISTS } from '../data/mockData';
import { usePlaylists } from '../context/PlaylistsContext';
import { Plus } from 'lucide-react';
import PromptModal from '../components/PromptModal';
import './Playlists.css';

const Playlists: React.FC = () => {
  const navigate = useNavigate();
  const { playlists, createPlaylist } = usePlaylists();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleCreatePlaylist = (name: string) => {
    createPlaylist(name);
    setShowPrompt(false);
  };

  return (
    <div className="playlists-page">
      <div className="playlists-header-flex">
        <h2 className="page-title-visible">Playlist của bạn</h2>
        <button className="create-playlist-btn" onClick={() => setShowPrompt(true)}>
          <Plus size={20} /> Tạo Playlist
        </button>
      </div>

      <div className="playlists-grid">
        {playlists.map(playlist => (
          <div 
            key={playlist.id} 
            className="playlist-card"
            onClick={() => navigate(`/playlists/${playlist.id}`)}
          >
            <div className="playlist-img-container">
              <img src={playlist.coverUrl} alt={playlist.name} className="playlist-img" />
            </div>
            <h5 className="playlist-name">{playlist.name}</h5>
          </div>
        ))}
      </div>

      <h2 className="page-title-visible" style={{ marginTop: '40px' }}>Playlist Gợi ý</h2>
      <div className="playlists-grid">
        {PLAYLISTS.map(playlist => (
          <div 
            key={playlist.id} 
            className="playlist-card"
            onClick={() => navigate(`/playlists/${playlist.id}`)}
          >
            <div className="playlist-img-container">
              <img src={playlist.coverUrl} alt={playlist.name} className="playlist-img" />
            </div>
            <h5 className="playlist-name">{playlist.name}</h5>
          </div>
        ))}
      </div>
      
      {showPrompt && (
        <PromptModal 
          title="Tạo Playlist mới"
          placeholder="Nhập tên Playlist..."
          onClose={() => setShowPrompt(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </div>
  );
};

export default Playlists;
