import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './PromptModal.css';

interface PromptModalProps {
  title: string;
  placeholder?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ title, placeholder, onClose, onSubmit }) => {
  const [value, setValue] = useState('');

  // Auto focus logic can go here if needed
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="modal-overlay prompt-overlay" onClick={onClose}>
      <div className="modal-content prompt-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="prompt-form">
          <input 
            type="text" 
            className="prompt-input" 
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <div className="prompt-actions">
            <button type="button" className="prompt-cancel-btn" onClick={onClose}>Hủy</button>
            <button type="submit" className="prompt-submit-btn" disabled={!value.trim()}>Tạo mới</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptModal;
