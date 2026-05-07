import React, { createContext, useState, useContext, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
  isFavorite?: boolean;
}

interface PlayerContextType {
  currentSong: Song;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Default placeholder song
const DEFAULT_SONG: Song = {
  id: '0',
  title: 'Chưa có bài hát',
  artist: '',
  duration: '0:00',
  coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80'
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song>(DEFAULT_SONG);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/songs');
        const data = await response.json();
        setSongs(data);
        if (data.length > 0 && currentSong.id === '0') {
          setCurrentSong(data[0]);
        }
      } catch (error) {
        console.error('Error fetching songs for player:', error);
      }
    };

    fetchSongs();
  }, [currentSong.id]);

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const nextSong = () => {
    if (songs.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const setSong = (song: Song) => {
    const index = songs.findIndex(s => s.id === song.id);
    if (index !== -1) setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      setCurrentSong: setSong,
      isPlaying,
      setIsPlaying,
      isShuffle,
      toggleShuffle,
      isRepeat,
      toggleRepeat,
      nextSong,
      prevSong
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
