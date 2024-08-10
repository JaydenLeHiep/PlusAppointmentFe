import React, { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import {jwtDecode} from 'jwt-decode';
import { refreshToken as fetchNewToken } from '../lib/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const refreshTimeout = useRef(null); // Use useRef to keep track of the timeout

  const setAuthTimeout = useCallback((expirationTime) => {
    const currentTime = Date.now();
    const delay = expirationTime - currentTime - 30 * 1000; // Refresh 30 seconds before expiration

    if (delay > 0) {
      refreshTimeout.current = setTimeout(async () => {
        try {
          
          const data = await fetchNewToken();
          localStorage.setItem('token', data.token); // Ensure 'token' matches the key in your response
          const newDecodedToken = jwtDecode(data.token); // Ensure 'token' matches the key in your response
          
          setIsAuthenticated(true);
          setUser({ username: newDecodedToken.name, role: newDecodedToken.role });
          setAuthTimeout(newDecodedToken.exp * 1000);
        } catch (error) {
          console.error('Token refresh failed', error);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('username');
          setIsAuthenticated(false);
          setUser(null);
        }
      }, delay);
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        console.log('Token expired');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');
        setIsAuthenticated(true);
        setUser({ username, role });
        setAuthTimeout(decodedToken.exp * 1000);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [setAuthTimeout]);

  useEffect(() => {
    checkTokenExpiration();

    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, [checkTokenExpiration]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    setIsAuthenticated(true);
    setUser(user);
    const decodedToken = jwtDecode(token);
    setAuthTimeout(decodedToken.exp * 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);