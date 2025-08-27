import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { refreshToken as fetchNewToken } from '../lib/apiClientStaff';

const StaffAuthContext = createContext(null);

export const StaffAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const refreshTimeout = useRef(null);

  const setAuthTimeout = useCallback((expMs) => {
    const delay = expMs - Date.now() - 30_000; // refresh 30s early
    if (delay > 0) {
      refreshTimeout.current = setTimeout(async () => {
        try {
          const data = await fetchNewToken();
          localStorage.setItem('staffToken', data.token);
          const decoded = jwtDecode(data.token);
          setIsAuthenticated(true);
          setUser({ username: decoded.name, role: decoded.role, userId: decoded.userId });
          setAuthTimeout(decoded.exp * 1000);
        } catch (e) {
          console.error('Staff token refresh failed', e);
          localStorage.removeItem('staffToken');
          localStorage.removeItem('staffRole');
          localStorage.removeItem('staffUsername');
          localStorage.removeItem('staffUserId');
          setIsAuthenticated(false);
          setUser(null);
        }
      }, delay);
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('staffToken');
    if (!token) { setIsAuthenticated(false); setUser(null); return; }
    const decoded = jwtDecode(token);
    const expired = decoded.exp * 1000 < Date.now();
    if (expired) {
      localStorage.removeItem('staffToken');
      localStorage.removeItem('staffRole');
      localStorage.removeItem('staffUsername');
      localStorage.removeItem('staffUserId');
      setIsAuthenticated(false);
      setUser(null);
    } else {
      const role = localStorage.getItem('staffRole');
      const username = localStorage.getItem('staffUsername');
      const userId = localStorage.getItem('staffUserId');
      setIsAuthenticated(true);
      setUser({ username, role, userId });
      setAuthTimeout(decoded.exp * 1000);
    }
  }, [setAuthTimeout]);

  useEffect(() => {
    checkTokenExpiration();
    return () => { if (refreshTimeout.current) clearTimeout(refreshTimeout.current); };
  }, [checkTokenExpiration]);

  const login = (token, profile) => {
    localStorage.setItem('staffToken', token);
    localStorage.setItem('staffRole', profile.role);
    localStorage.setItem('staffUsername', profile.username);
    localStorage.setItem('staffUserId', profile.userId);
    setIsAuthenticated(true);
    setUser(profile);
    const decoded = jwtDecode(token);
    setAuthTimeout(decoded.exp * 1000);
  };

  const logout = () => {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('staffRole');
    localStorage.removeItem('staffUsername');
    localStorage.removeItem('staffUserId');
    setIsAuthenticated(false);
    setUser(null);
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
  };

  return (
    <StaffAuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export const useAuthStaff = () => useContext(StaffAuthContext);
