import React, { useState } from 'react';
import { usePlaylists } from '../context/PlaylistsContext';
import { X, Plus } from 'lucide-react';
import PromptModal from './PromptModal';
import './AddToPlaylistModal.css';

interface AddToPlaylistModalProps {
  songId: string;
  onClose: () => void;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({ songId, onClose }) => {
  const { playlists, createPlaylist, addSongToPlaylist } = usePlaylists();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleCreate = (name: string) => {
    createPlaylist(name);
    setShowPrompt(false);
  };

  const handleAdd = (playlistId: string) => {
    addSongToPlaylist(playlistId, songId);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content add-playlist-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Thêm vào Playlist</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="add-playlist-list">
            <button className="create-new-playlist-item" onClick={() => setShowPrompt(true)}>
              <div className="icon-wrapper">
                <Plus size={24} />
              </div>
              <span>Tạo Playlist mới</span>
            </button>

            {playlists.map(playlist => {
              const isAdded = playlist.songIds?.includes(songId);
              return (
                <button 
                  key={playlist.id} 
                  className="playlist-select-item"
                  onClick={() => !isAdded && handleAdd(playlist.id)}
                  disabled={isAdded}
                >
                  <img src={playlist.coverUrl} alt="" className="playlist-mini-img" />
                  <span className="playlist-mini-name">{playlist.name}</span>
                  {isAdded && <span className="added-badge">Đã thêm</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showPrompt && (
        <PromptModal 
          title="Tạo Playlist mới"
          placeholder="Nhập tên Playlist..."
          onClose={() => setShowPrompt(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
};

export default AddToPlaylistModal;

