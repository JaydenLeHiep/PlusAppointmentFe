import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import BusinessHomePage from './features/home/BusinessHomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { useAuth } from './hooks/useAuth';
import CustomerDashboard from './features/customerDashboard/CustomerDashboard';
import { AppointmentsProvider } from './features/appointment/AppointmentsContext';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === 'Owner') {
      return '/owner-dashboard';
    }
    if (user?.role === 'Admin') {
      return '/owner-dashboard';
    }
    if (user?.role === '') {
      return '/customer-dashboard';
    }
    return '/'; // Default case, should not happen if roles are properly set
  };

  return (
    <>
      <GlobalStyles />
      <AppointmentsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-home" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <BusinessHomePage />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <RegisterPage />} />
          <Route path="/owner-dashboard" element={isAuthenticated ? <OwnerDashboard /> : <Navigate to="/login" />} />

          {/* <Route path="/admin-dashboard" element={isAuthenticated ? <HelloAdmin /> : <Navigate to="/login" />} /> */}
        </Routes>
      </AppointmentsProvider>
    </>
  );
};

export default App;
