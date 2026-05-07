import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  songs?: any[];
  songIds?: string[];
}

interface PlaylistsContextType {
  playlists: Playlist[];
  createPlaylist: (name: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  refreshPlaylists: () => Promise<void>;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/playlists');
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const createPlaylist = async (name: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        await fetchPlaylists();
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId })
      });
      if (response.ok) {
        await fetchPlaylists();
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchPlaylists();
      }
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  const deletePlaylist = async (playlistId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchPlaylists();
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <PlaylistsContext.Provider value={{
      playlists,
      createPlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      deletePlaylist,
      refreshPlaylists: fetchPlaylists
    }}>
      {children}
    </PlaylistsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlaylists = () => {
  const context = useContext(PlaylistsContext);
  if (context === undefined) {
    throw new Error('usePlaylists must be used within a PlaylistsProvider');
  }
  return context;
};
