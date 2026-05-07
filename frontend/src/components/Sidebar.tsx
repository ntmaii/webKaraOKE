import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ListMusic, Music, User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userName = user?.username || 'Người dùng';
  const userEmail = user?.email || '';
  const userAvatar = localStorage.getItem('karaoke_user_avatar');

  // The user info is now handled by AuthContext and derived directly.
  // userAvatar is read directly from localStorage above.

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise(res => setTimeout(res, 800));
    logout();
    setLoggingOut(false);
    setSettingsOpen(false);
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>
          <Home size={20} />
          <span>Trang chủ</span>
        </NavLink>
        <NavLink to="/playlists" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <ListMusic size={20} />
          <span>Playlist</span>
        </NavLink>
        <NavLink to="/songs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Music size={20} />
          <span>Yêu thích</span>
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-item active admin-nav-link' : 'nav-item admin-nav-link'}>
            <Shield size={20} />
            <span>Quản lý</span>
          </NavLink>
        )}
      </nav>

      <div className="sidebar-bottom">
        <button className="icon-btn" onClick={() => setProfileOpen(true)} title="Thông tin cá nhân">
          <User size={24} />
        </button>

        {/* Settings Gear with Dropdown */}
        <div className="settings-wrapper" ref={dropdownRef}>
          <button
            id="settings-gear-btn"
            className={`icon-btn gear-btn ${settingsOpen ? 'gear-active' : ''}`}
            onClick={() => setSettingsOpen(prev => !prev)}
            aria-label="Cài đặt & Đăng xuất"
            title="Cài đặt"
          >
            <Settings size={24} className={settingsOpen ? 'gear-spin' : ''} />
          </button>

          {settingsOpen && (
            <div className="settings-dropdown" role="menu">
              {/* Header */}
              <div className="settings-dropdown-header">
                <div 
                  className="settings-user-info" 
                  onClick={() => { setProfileOpen(true); setSettingsOpen(false); }}
                  style={{ cursor: 'pointer' }}
                  title="Xem hồ sơ"
                >
                  <div className="settings-avatar">
                    {userAvatar ? (
                      <img src={userAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div>
                    <p className="settings-username">{userName}</p>
                    <p className="settings-email">{userEmail}</p>
                  </div>
                </div>
                <button className="settings-close-btn" onClick={() => setSettingsOpen(false)}>
                  <X size={14} />
                </button>
              </div>

              <div className="settings-divider" />

              {/* Menu items */}
              <div className="settings-menu">
                <button className="settings-menu-item" role="menuitem">
                  <Bell size={16} />
                  <span>Thông báo</span>
                  <ChevronRight size={14} className="settings-chevron" />
                </button>
                <button className="settings-menu-item" role="menuitem">
                  <Shield size={16} />
                  <span>Bảo mật</span>
                  <ChevronRight size={14} className="settings-chevron" />
                </button>
                <button className="settings-menu-item" role="menuitem">
                  <HelpCircle size={16} />
                  <span>Trợ giúp</span>
                  <ChevronRight size={14} className="settings-chevron" />
                </button>
              </div>

              <div className="settings-divider" />

              {/* Logout */}
              <div className="settings-logout-section">
                <button
                  id="logout-btn"
                  className={`logout-btn ${loggingOut ? 'logging-out' : ''}`}
                  onClick={handleLogout}
                  disabled={loggingOut}
                  role="menuitem"
                >
                  {loggingOut ? (
                    <>
                      <span className="logout-spinner" />
                      <span>Đang đăng xuất...</span>
                    </>
                  ) : (
                    <>
                      <LogOut size={16} />
                      <span>Đăng xuất</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProfileModal 
        isOpen={profileOpen} 
        onClose={() => setProfileOpen(false)} 
        email={userEmail} 
      />
    </aside>
  );
};

export default Sidebar;
