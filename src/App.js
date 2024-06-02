import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/Login/LoginPage';
import RegisterPage from './features/auth/Register/RegisterPage';
import CustomerDashboard from './features/customer/CustomerDashboard';
import OwnerDashboard from './features/ownerDashboard/OwnerDashboard';
import AppProvider from './app-provider';
import GlobalStyles from '../src/styles/GobalStyles';

const App = () => (
  <AppProvider>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
