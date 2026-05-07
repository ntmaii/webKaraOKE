import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        login(data.username, data.role);
        navigate('/');
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Không thể kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
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

      {/* Sign in card */}
      <div className="login-card">
        <h3 className="signin-title">Sign in</h3>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
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
              autoComplete="current-password"
            />
          </div>

          <div className="login-links">
            <p>Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>?</p>
            <p><a href="#" className="forgot-link">Forgot your password?</a></p>
          </div>

          <div className="btn-row">
            <button type="submit" className="signin-btn" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
