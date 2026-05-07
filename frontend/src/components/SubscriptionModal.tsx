import React, { useState } from 'react';
import { X, Check, CreditCard, Wallet, Smartphone } from 'lucide-react';
import './SubscriptionModal.css';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (packName: string) => void;
}

const packs = [
  { id: 'personal', name: 'Gói Cá Nhân', price: '99.000', features: ['1 người dùng', 'Âm thanh chất lượng cao', 'Không quảng cáo'] },
  { id: 'family', name: 'Gói Gia Đình', price: '199.000', features: ['Đến 6 người dùng', 'Tính năng Karaoke nhóm', 'Quản lý thành viên'] }
];

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedPack, setSelectedPack] = useState(packs[0]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Simulate success delay
      setTimeout(() => {
        onSuccess(selectedPack.name);
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="sub-modal-overlay" onClick={onClose}>
      <div className="sub-modal" onClick={e => e.stopPropagation()}>
        {!isSuccess && (
          <button className="profile-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        )}

        {isSuccess ? (
          <div className="success-overlay">
            <div className="success-icon">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="sub-title">Thanh toán thành công!</h2>
            <p className="sub-subtitle">Chào mừng bạn đến với {selectedPack.name}</p>
          </div>
        ) : (
          <>
            <div className="sub-header">
              <h2 className="sub-title">Nâng cấp trải nghiệm</h2>
              <p className="sub-subtitle">Chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
            </div>

            <div className="pricing-grid">
              {packs.map(pack => (
                <div 
                  key={pack.id} 
                  className={`price-card ${selectedPack.id === pack.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPack(pack)}
                >
                  <span className="card-name">{pack.name}</span>
                  <div className="card-price">{pack.price}<span>₫/tháng</span></div>
                  <ul className="card-features">
                    {pack.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="payment-section">
              <p className="payment-method-title">Phương thức thanh toán</p>
              <div className="methods-grid">
                <div 
                  className={`method-item ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={20} />
                  <span className="method-name">Thẻ ATM</span>
                </div>
                <div 
                  className={`method-item ${paymentMethod === 'momo' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('momo')}
                >
                  <Wallet size={20} />
                  <span className="method-name">MoMo</span>
                </div>
                <div 
                  className={`method-item ${paymentMethod === 'banking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('banking')}
                >
                  <Smartphone size={20} />
                  <span className="method-name">Banking</span>
                </div>
              </div>
            </div>

            <button 
              className="pay-btn" 
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : `Thanh toán ${selectedPack.price}₫`}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
