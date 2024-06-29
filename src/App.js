import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated, user } = useAuth();
  
  const getDashboardPath = () => {
    if (user?.role === 'Owner') {
      return '/owner-dashboard';
    }
    if (user?.role === 'Admin') {
      return '/admin-dashboard';
    }
    return '/'; // Default case, should not happen if roles are properly set
  };

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> :<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <RegisterPage />} />
        <Route path="/owner-dashboard" element={isAuthenticated ? <OwnerDashboard /> : <Navigate to="/login" />} />
        {/* <Route path="/admin-dashboard" element={isAuthenticated ? <HelloAdmin /> : <Navigate to="/login" />} /> */}
      </Routes>
    </>
  );
};

export default App;
