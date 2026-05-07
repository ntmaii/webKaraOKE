import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import './Home.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  videoUrl?: string;
}

interface Category {
  id: string;
  title: string;
  songs: Song[];
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="home-page">
      <h2 className="page-title">Trang chủ</h2>
      
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.id} className="category-section">
            <h3 className="category-title">{category.title}</h3>
            <div className="horizontal-scroll">
              {category.songs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
