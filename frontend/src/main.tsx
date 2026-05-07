import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PlayerProvider } from './context/PlayerContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
import { PlaylistsProvider } from './context/PlaylistsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PlaylistsProvider>
        <PlayerProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </PlayerProvider>
      </PlaylistsProvider>
    </AuthProvider>
  </StrictMode>,
)
