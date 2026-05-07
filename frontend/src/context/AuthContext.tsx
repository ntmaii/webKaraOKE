import React, { createContext, useContext, useState } from 'react';

interface User {
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role?: 'admin' | 'user') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const loggedIn = localStorage.getItem('karaoke_logged_in') === 'true';
    if (loggedIn) {
      const username = localStorage.getItem('karaoke_user_name') || '';
      const email = localStorage.getItem('karaoke_user_email') || '';
      const role = (localStorage.getItem('karaoke_user_role') as 'admin' | 'user') || 'user';
      return { username, email, role };
    }
    return null;
  });

  const login = (username: string, role: 'admin' | 'user' = 'user') => {
    const email = `${username}@example.com`;
    const newUser: User = { username, email, role };
    setUser(newUser);
    localStorage.setItem('karaoke_logged_in', 'true');
    localStorage.setItem('karaoke_user_name', username);
    localStorage.setItem('karaoke_user_email', email);
    localStorage.setItem('karaoke_user_role', role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('karaoke_logged_in');
    localStorage.removeItem('karaoke_user_name');
    localStorage.removeItem('karaoke_user_email');
    localStorage.removeItem('karaoke_user_role');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
