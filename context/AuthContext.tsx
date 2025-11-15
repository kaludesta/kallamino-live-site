
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  changeUsername: (password: string, newUsername: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!sessionStorage.getItem('isAdmin'));
  const [adminUsername, setAdminUsername] = useState<string>(() => localStorage.getItem('adminUsername') || 'Kalebd');
  const [adminPassword, setAdminPassword] = useState<string>(() => localStorage.getItem('adminPassword') || '@Kalebmelat28');
  const navigate = useNavigate();

  const login = (user: string, pass: string): boolean => {
    if (user === adminUsername && pass === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('username', user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('username');
    navigate('/');
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (oldPassword === adminPassword) {
      setAdminPassword(newPassword);
      localStorage.setItem('adminPassword', newPassword);
      return true;
    }
    return false;
  };

  const changeUsername = (password: string, newUsername: string): boolean => {
    if (password === adminPassword) {
        setAdminUsername(newUsername);
        localStorage.setItem('adminUsername', newUsername);
        sessionStorage.setItem('username', newUsername);
        return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username: sessionStorage.getItem('username'), login, logout, changePassword, changeUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
