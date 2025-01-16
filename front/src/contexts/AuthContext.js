import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(authService.getToken());

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    authService.setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authService.removeToken();
  };

  // Vérifier le token au chargement
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Optionnel : Vérifier la validité du token avec le backend
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 