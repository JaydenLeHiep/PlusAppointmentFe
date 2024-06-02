import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you could decode the token to get user info
      setIsAuthenticated(true);
      setUser({ username: 'Owner' }); // replace with actual user data from token
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
