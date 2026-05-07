import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      // Store registration date if not exists
      if (!localStorage.getItem('karaoke_join_date')) {
        localStorage.setItem('karaoke_join_date', new Date().toLocaleDateString('vi-VN'));
      }
      navigate('/login');
    }
  };

  return (
    <div className="login-page">
      {/* Header text */}
      <div className="login-header">
        <h1 className="welcome-text">Welcome to</h1>
        <h2 className="karaoke-text">
          <span className="karaoke-highlight">KaraOke</span>
        </h2>
      </div>

      {/* Sign up card */}
      <div className="login-card">
        <h3 className="signin-title">Sign up</h3>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">EMAIL OR USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="name@example.com"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="btn-row btn-row-center">
            <button type="submit" className="signin-btn">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
