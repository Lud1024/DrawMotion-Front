import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = useCallback((nuevoToken, datosUsuario) => {
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('user', JSON.stringify(datosUsuario));
    setToken(nuevoToken);
    setUser(datosUsuario);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (!token) return;
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= exp * 1000) logout();
    } catch {
      logout();
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
