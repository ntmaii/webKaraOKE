import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'frontend', 'public', 'images');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ được phép upload file ảnh!'));
    }
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Vui lòng chọn file ảnh để upload' });
  }
  // Return the public URL for the frontend
  const imageUrl = `/images/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Helper to read data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { songs: [], categories: [] };
  }
}

// Helper to write data
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Routes
app.get('/api/songs', async (req, res) => {
  const data = await readData();
  res.json(data.songs);
});

app.get('/api/categories', async (req, res) => {
  const data = await readData();
  // Map songIds to actual song objects for the frontend
  const categoriesWithSongs = data.categories.map(cat => ({
    ...cat,
    songs: data.songs.filter(song => cat.songIds.includes(song.id))
  }));
  res.json(categoriesWithSongs);
});

// Admin: Add Song
app.post('/api/songs', async (req, res) => {
  const newSong = req.body;
  const data = await readData();
  
  // Simple ID generation
  const maxId = data.songs.reduce((max, s) => Math.max(max, parseInt(s.id) || 0), 0);
  newSong.id = (maxId + 1).toString();
  
  data.songs.push(newSong);
  await writeData(data);
  res.status(201).json(newSong);
});

// Admin: Update Song
app.put('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSong = req.body;
  const data = await readData();
  
  const index = data.songs.findIndex(s => s.id === id);
  if (index !== -1) {
    data.songs[index] = { ...data.songs[index], ...updatedSong };
    await writeData(data);
    res.json(data.songs[index]);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

// Admin: Delete Song
app.delete('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readData();
  
  data.songs = data.songs.filter(s => s.id !== id);
  // Also remove from categories
  data.categories = data.categories.map(cat => ({
    ...cat,
    songIds: cat.songIds.filter(sId => sId !== id)
  }));
  
  await writeData(data);
  res.json({ message: 'Song deleted successfully' });
});

// User Playlists
app.get('/api/playlists', async (req, res) => {
  const data = await readData();
  const playlistsWithSongs = (data.userPlaylists || []).map(pl => ({
    ...pl,
    songs: data.songs.filter(song => pl.songIds.includes(song.id))
  }));
  res.json(playlistsWithSongs);
});

app.post('/api/playlists', async (req, res) => {
  const { name } = req.body;
  const data = await readData();
  if (!data.userPlaylists) data.userPlaylists = [];
  
  const newPlaylist = {
    id: 'up_' + Date.now().toString(),
    name: name || 'Playlist mới',
    coverUrl: '/images/shape.jpg', // Default cover
    songIds: []
  };
  
  data.userPlaylists.push(newPlaylist);
  await writeData(data);
  
  // Return with populated empty songs array
  res.status(201).json({ ...newPlaylist, songs: [] });
});

app.post('/api/playlists/:id/songs', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;
  const data = await readData();
  
  const playlist = (data.userPlaylists || []).find(p => p.id === id);
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  
  if (!playlist.songIds.includes(songId)) {
    playlist.songIds.push(songId);
    await writeData(data);
  }
  res.json(playlist);
});

app.delete('/api/playlists/:id/songs/:songId', async (req, res) => {
  const { id, songId } = req.params;
  const data = await readData();
  
  const playlist = (data.userPlaylists || []).find(p => p.id === id);
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  
  playlist.songIds = playlist.songIds.filter(s => s !== songId);
  await writeData(data);
  res.json(playlist);
});

app.delete('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readData();
  
  if (data.userPlaylists) {
    data.userPlaylists = data.userPlaylists.filter(p => p.id !== id);
    await writeData(data);
  }
  res.json({ message: 'Playlist deleted' });
});

// Simple Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // HARDCODED ADMIN FOR DEMO
  if (username === 'admin' && password === 'admin123') {
    return res.json({
      username: 'Admin',
      email: 'admin@karaoke.com',
      role: 'admin'
    });
  }
  
  // Default user
  res.json({
    username: username || 'User',
    email: `${username || 'user'}@example.com`,
    role: 'user'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
