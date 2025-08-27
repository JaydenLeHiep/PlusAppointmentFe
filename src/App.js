// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import { useAuth } from './hooks/useAuth';

// ⬇️ Staff auth (Option B)
import { StaffAuthProvider, useAuthStaff } from './hooks/useAuthStaff';

// react components
import HomePage from './features/home/HomePage';
import BusinessHomePage from './features/home/BusinessHomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';

import CustomerDashboard from './features/customerDashboard/CustomerDashboard';
import ChangePasswordForm from './features/ownerDashboard/ChangePasswordForm';
import DeleteAppointmentCustomer from './features/customerDashboard/DeleteAppointmentCustomer/DeleteAppointmentCustomer';
import CheckInDashboard from './features/customerDashboard/checkIn/CheckInDashboard';
import CustomerInfo from './features/customerInfo/CustomerInfo';

// ⬇️ Staff pages
import LoginStaffPage from './features/staffDashboard/authStaff/LoginStaffPage';
import StaffDashboard from './features/staffDashboard/StaffDashboard';

// contexts
import { AppointmentsProvider } from './context/AppointmentsContext';
import { StaffsProvider } from './context/StaffsContext';
import { ServicesProvider } from './context/ServicesContext';
import { CustomersProvider } from './context/CustomerContext';
import { NotAvailableDateProvider } from './context/NotAvailableDateContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { NotAvailableTimeProvider } from './context/NotAvailableTimeContext';
import { OpeningHoursProvider } from './context/OpeningHoursContext';
import { WorkSessionsProvider } from './context/WorkSessionsContext';
import { CalculateMoneyProvider } from './context/CalculateMoneyContext';

// utils
import './utils/i18n';

// --- Guards ---

// Normal users (owner/admin/customer) guard – uses main Auth
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Staff-only guard – uses StaffAuth
const RequireStaffAuth = ({ children }) => {
  const { isAuthenticated, user } = useAuthStaff();
  return isAuthenticated && user?.role === 'Staff'
    ? children
    : <Navigate to="/staff-login" replace />;
};

// Staff login route that redirects if already logged in as staff
const StaffLoginRoute = () => {
  const { isAuthenticated } = useAuthStaff();
  return isAuthenticated ? <Navigate to="/staff-dashboard" replace /> : <LoginStaffPage />;
};

const App = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === 'Owner' || user?.role === 'Admin') return '/owner-dashboard';
    if (user?.role === '') return '/customer-dashboard';
    return '/';
  };

  return (
    <>
      <GlobalStyles />
      {/* Staff auth provider must wrap routes that use useAuthStaff */}
      <StaffAuthProvider>
        <WorkSessionsProvider>
          <CalculateMoneyProvider>
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

                              <Route
                                path="/business-home"
                                element={
                                  isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <BusinessHomePage />
                                }
                              />

                              {/* Public / customer routes */}
                              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                              <Route path="/customer-checkin-dashboard" element={<CheckInDashboard />} />
                              <Route path="/delete-appointment-customer" element={<DeleteAppointmentCustomer />} />

                              {/* Normal auth (owners/admin/customers) */}
                              <Route
                                path="/login"
                                element={
                                  isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <LoginPage />
                                }
                              />
                              <Route
                                path="/register"
                                element={
                                  isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <RegisterPage />
                                }
                              />
                              <Route
                                path="/owner-dashboard"
                                element={
                                  <RequireAuth>
                                    <OwnerDashboard />
                                  </RequireAuth>
                                }
                              />
                              <Route
                                path="/change-password"
                                element={
                                  <RequireAuth>
                                    <ChangePasswordForm />
                                  </RequireAuth>
                                }
                              />
                              <Route
                                path="/customer-info"
                                element={
                                  <RequireAuth>
                                    <CustomerInfo />
                                  </RequireAuth>
                                }
                              />

                              {/* Staff auth routes (separate context) */}
                              <Route path="/staff-login" element={<StaffLoginRoute />} />
                              <Route
                                path="/staff-dashboard"
                                element={
                                  <RequireStaffAuth>
                                    <StaffDashboard />
                                  </RequireStaffAuth>
                                }
                              />
                            </Routes>

                          </OpeningHoursProvider>
                        </NotificationsProvider>
                      </AppointmentsProvider>
                    </NotAvailableTimeProvider>
                  </NotAvailableDateProvider>
                </StaffsProvider>
              </ServicesProvider>
            </CustomersProvider>
          </CalculateMoneyProvider>
        </WorkSessionsProvider>
      </StaffAuthProvider>
    </>
  );
};

export default App;
