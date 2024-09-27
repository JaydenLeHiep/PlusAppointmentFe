import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import BusinessHomePage from './features/home/BusinessHomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { useAuth } from './hooks/useAuth';
import PCDashboard from './features/customerDashboard/CustomerDashboard';
import { AppointmentsProvider } from './context/AppointmentsContext';
import { StaffsProvider } from './context/StaffsContext';
import { ServicesProvider } from './context/ServicesContext';
import { CustomersProvider } from './context/CustomerContext';
import { NotAvailableDateProvider } from './context/NotAvailableDateContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { NotAvailableTimeProvider } from './context/NotAvailableTimeContext';
import ChangePasswordForm from './features/ownerDashboard/ChangePasswordForm';
import { OpeningHoursProvider } from './context/OpeningHoursContext';
import DeleteAppointmentCustomer from './features/customerDashboard/DeleteAppointmentCustomer/DeleteAppointmentCustomer';
import './utils/i18n'

const App = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === 'Owner' || user?.role === 'Admin') {
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
      <CustomersProvider>
        <ServicesProvider>
          <StaffsProvider>
            <NotAvailableDateProvider>
              <NotAvailableTimeProvider>
                <AppointmentsProvider>
                  <NotificationsProvider>
                    <OpeningHoursProvider>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/business-home" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <BusinessHomePage />} />
                        <Route path="/customer-dashboard" element={<PCDashboard />} />
                        <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <LoginPage />} />
                        <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardPath()} /> : <RegisterPage />} />
                        <Route path="/owner-dashboard" element={isAuthenticated ? <OwnerDashboard /> : <Navigate to="/login" />} />
                        <Route path="/change-password" element={isAuthenticated ? <ChangePasswordForm /> : <Navigate to="/login" />} />
                        <Route path="/delete-appointment-customer" element={<DeleteAppointmentCustomer />} />
                      </Routes>
                    </OpeningHoursProvider>
                  </NotificationsProvider>
                </AppointmentsProvider>
              </NotAvailableTimeProvider>
            </NotAvailableDateProvider>
          </StaffsProvider>
        </ServicesProvider>
      </CustomersProvider>
    </>
  );
};

export default App; 