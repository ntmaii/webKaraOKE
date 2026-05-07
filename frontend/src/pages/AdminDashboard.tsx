import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save } from 'lucide-react';
import './AdminDashboard.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
}

const AdminDashboard: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    duration: '',
    coverUrl: '',
    videoUrl: ''
  });

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  useEffect(() => {
    fetchSongs(); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleOpenModal = (song: Song | null = null) => {
    if (song) {
      setEditingSong(song);
      setFormData({
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        coverUrl: song.coverUrl,
        videoUrl: song.videoUrl || ''
      });
      setPreviewUrl(song.coverUrl);
    } else {
      setEditingSong(null);
      setFormData({
        title: '',
        artist: '',
        duration: '',
        coverUrl: '',
        videoUrl: ''
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let currentCoverUrl = formData.coverUrl;

      // 1. Upload file first if selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', selectedFile);
        
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          currentCoverUrl = uploadData.url;
        } else {
          alert('Lỗi khi upload ảnh!');
          return;
        }
      }

      // 2. Save song data
      const url = editingSong 
        ? `http://localhost:5000/api/songs/${editingSong.id}` 
        : 'http://localhost:5000/api/songs';
      const method = editingSong ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, coverUrl: currentCoverUrl })
      });

      if (response.ok) {
        fetchSongs();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSongs();
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSong(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Quản lý bài hát</h1>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          <span>Thêm bài hát</span>
        </button>
      </div>

      <div className="admin-search">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Tìm kiếm bài hát hoặc ca sĩ..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="songs-table-container">
        <table className="songs-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tiêu đề</th>
              <th>Ca sĩ</th>
              <th>Thời lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map(song => (
              <tr key={song.id}>
                <td>
                  <img src={song.coverUrl} alt={song.title} className="table-img" />
                </td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.duration}</td>
                <td>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleOpenModal(song)} title="Sửa">
                      <Edit2 size={18} />
                    </button>
                    <button className="delete-btn" onClick={() => setShowDeleteConfirm(song.id)} title="Xóa">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content admin-modal-content">
            <div className="modal-header">
              <h2>{editingSong ? 'Chỉnh sửa bài hát' : 'Thêm bài hát mới'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="modal-body">
                <div className="form-group">
                  <label>Tiêu đề</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Ca sĩ</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.artist}
                    onChange={e => setFormData({...formData, artist: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Thời lượng (ví dụ: 3:45)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Ảnh bìa</label>
                  <div className="file-input-container">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    {previewUrl && (
                      <div className="image-preview">
                        <img src={previewUrl} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>URL Video (YouTube Embed)</label>
                  <input 
                    type="text" 
                    value={formData.videoUrl}
                    onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Hủy</button>
                <button type="submit" className="save-btn">
                  <Save size={18} />
                  <span>{editingSong ? 'Cập nhật' : 'Lưu bài hát'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content confirm-modal">
            <div className="modal-header">
              <h2>Xác nhận xóa</h2>
              <button className="close-btn" onClick={() => setShowDeleteConfirm(null)}>
                <X size={24} />
              </button>
            </div>
            <p style={{ margin: '1rem 0' }}>Bạn có chắc chắn muốn xóa bài hát này không? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(null)}>Hủy</button>
              <button className="delete-btn-confirm" onClick={() => handleDelete(showDeleteConfirm)}>Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
