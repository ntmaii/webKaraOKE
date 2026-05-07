import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PLAYLISTS } from '../data/mockData';
import { usePlaylists } from '../context/PlaylistsContext';
import SongListItem from '../components/SongListItem';
import { ArrowLeft } from 'lucide-react';
import './PlaylistDetail.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
}

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, removeSongFromPlaylist } = usePlaylists();
  
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if it's a user playlist
  const userPlaylist = playlists.find(p => p.id === id);
  // Or a mock playlist
  const mockPlaylist = PLAYLISTS.find(p => p.id === id);
  
  const activePlaylist = userPlaylist || mockPlaylist;

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        if (userPlaylist) {
          // User playlist already has populated songs from Context API
          setSongs(userPlaylist.songs || []);
        } else if (mockPlaylist) {
          // Mock playlist: fetch all songs for demo purposes
          const response = await fetch('http://localhost:5000/api/songs');
          const data = await response.json();
          setSongs(data.slice(0, 5)); // Just take 5 for demo
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [id, userPlaylist, mockPlaylist]);

  const handleRemove = async (songId: string) => {
    if (userPlaylist) {
      await removeSongFromPlaylist(userPlaylist.id, songId);
    }
  };

  if (!activePlaylist) {
    return <div className="playlist-detail-page"><h2>Không tìm thấy Playlist</h2></div>;
  }

  return (
    <div className="playlist-detail-page">
      <button className="back-btn" onClick={() => navigate('/playlists')} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={24} />
      </button>

      <div className="playlist-header">
        <img src={activePlaylist.coverUrl} alt={activePlaylist.name} className="playlist-detail-img" />
        <div className="playlist-info">
          <h2 className="playlist-detail-title">{activePlaylist.name}</h2>
          <button className="play-all-btn">Phát tất cả</button>
        </div>
      </div>

      <div className="song-list-container">
        <div className="song-list-header">
          <div className="col col-info">Tên</div>
          <div className="col col-artist">Nghệ sĩ</div>
          <div className="col col-time">Thời gian</div>
          {userPlaylist && <div className="col" style={{ width: '40px' }}></div>}
        </div>
        
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : songs.length === 0 ? (
          <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Chưa có bài hát nào trong playlist này.</div>
        ) : (
          songs.map(song => (
            <SongListItem 
              key={song.id} 
              song={song} 
              onRemove={userPlaylist ? () => handleRemove(song.id) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
