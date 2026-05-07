import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import SongListItem from '../components/SongListItem';
import './Songs.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
}

const Songs: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/songs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const favoriteSongs = songs.filter(song => favoriteIds.includes(song.id));

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="songs-page">
      <h2 className="page-title-visible">Yêu thích</h2>
      
      {favoriteSongs.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '3rem 0', fontSize: '1.1rem' }}>
          Chưa có bài hát yêu thích nào. Hãy nhấn vào biểu tượng ❤️ để thêm!
        </div>
      ) : (
        <div className="song-list-container">
          <div className="song-list-header">
            <div className="col col-info">Tên</div>
            <div className="col col-artist">Nghệ sĩ</div>
            <div className="col col-time">Thời gian</div>
          </div>
          
          {favoriteSongs.map(song => (
            <SongListItem key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Songs;
