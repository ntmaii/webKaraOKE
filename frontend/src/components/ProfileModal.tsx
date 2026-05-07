import React, { useState } from 'react';
import { X, User, Mail, Calendar, ShieldCheck, Camera } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';
import './ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, email }) => {
  const joinDate = localStorage.getItem('karaoke_join_date') || '06/05/2026';
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem('karaoke_user_avatar'));
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('karaoke_user_name') || 'Người dùng');
  const [currentPack, setCurrentPack] = useState<string>(() => localStorage.getItem('karaoke_user_pack') || 'Gói Miễn Phí');
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        localStorage.setItem('karaoke_user_avatar', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserName(newName);
    localStorage.setItem('karaoke_user_name', newName);
  };

  const handleSubscriptionSuccess = (packName: string) => {
    setCurrentPack(packName);
    localStorage.setItem('karaoke_user_pack', packName);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="profile-modal-overlay" onClick={onClose}>
        <div className="profile-modal" onClick={e => e.stopPropagation()}>
          <button className="profile-close-btn" onClick={onClose}>
            <X size={18} />
          </button>

          <div className="profile-header">
            <div className="profile-avatar-container">
              <input 
                type="file" 
                id="avatar-input" 
                hidden 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
              <label htmlFor="avatar-input" className="profile-avatar-large">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="profile-avatar-img" />
                ) : (
                  <User size={36} />
                )}
                <div className="avatar-overlay">
                  <Camera size={20} color="#white" />
                </div>
              </label>
            </div>
            <input 
              type="text" 
              className="profile-name-input"
              value={userName} 
              onChange={handleNameChange}
              placeholder="Nhập tên người dùng"
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '20px',
                fontWeight: 700,
                textAlign: 'center',
                padding: '4px',
                width: '100%',
                marginTop: '8px',
                outline: 'none'
              }}
            />
            <span className="profile-badge">{currentPack === 'Gói Miễn Phí' ? 'Thành viên mới' : 'Thành viên Premium'}</span>
          </div>

          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} className="text-pink-500" />
                <span className="info-value">{email}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-label">Ngày gia nhập</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} className="text-pink-500" />
                <span className="info-value">{joinDate}</span>
              </div>
            </div>

            <div className="info-item" style={{ position: 'relative' }}>
              <span className="info-label">Gói dịch vụ</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={14} className="text-pink-500" />
                  <span className="info-value">{currentPack}</span>
                </div>
                <button 
                  className="upgrade-text-btn" 
                  onClick={() => setIsSubModalOpen(true)}
                  style={{ 
                    fontSize: '11px', 
                    color: 'var(--accent-pink)', 
                    fontWeight: 600, 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(236, 72, 153, 0.1)'
                  }}
                >
                  Nâng cấp
                </button>
              </div>
            </div>
          </div>

          <div className="profile-footer">
            <button className="profile-edit-btn" onClick={onClose}>Hoàn tất</button>
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isSubModalOpen} 
        onClose={() => setIsSubModalOpen(false)} 
        onSuccess={handleSubscriptionSuccess}
      />
    </>
  );
};

export default ProfileModal;
