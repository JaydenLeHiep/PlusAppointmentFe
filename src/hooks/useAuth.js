import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        // If the token has expired, remove it and update the authentication state
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        // Token is not expired, ensure user is marked as authenticated
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');
        setIsAuthenticated(true);
        setUser({ username, role });
      }
    } else {
      // No token, user is not authenticated
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // Immediate check on load
    checkTokenExpiration();

    // Set up an interval for periodic checks
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [checkTokenExpiration]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
