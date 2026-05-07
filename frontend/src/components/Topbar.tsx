import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Topbar.css';

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <Link to="/" className="logo">
        <span className="neon-text" style={{ fontSize: '28px' }}>KaraOke</span>
      </Link>
      
      <div className="search-container">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" className="search-input" />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Spacer to balance the logo on the left for true centering of search */}
      <div className="topbar-spacer"></div>
    </header>
  );
};

export default Topbar;
