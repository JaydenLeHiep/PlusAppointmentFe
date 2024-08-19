import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import BusinessHomePage from './features/home/BusinessHomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { useAuth } from './hooks/useAuth';
import ResponsiveDashboard from './features/customerDashboard/ResponsiveDashboard'; 
import { AppointmentsProvider } from './features/appointment/AppointmentsContext';
import { StaffsProvider } from './features/staff/StaffsContext';
import { ServicesProvider } from './features/servicecomponent/ServicesContext';

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
      <ServicesProvider>
        <StaffsProvider>
          <AppointmentsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/business-home" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <BusinessHomePage />} />
              <Route path="/customer-dashboard" element={<ResponsiveDashboard />} /> {/* Use ResponsiveDashboard */}
              <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <LoginPage />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <RegisterPage />} />
              <Route path="/owner-dashboard" element={isAuthenticated ? <OwnerDashboard /> : <Navigate to="/login" />} />
            </Routes>
          </AppointmentsProvider>
        </StaffsProvider>
      </ServicesProvider>
    </>
  );
};

export default App;