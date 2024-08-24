import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoginHero from './LoginHero';

const LoginPage = () => {
  useEffect(() => {
    localStorage.setItem('currentPath', window.location.pathname);
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <LoginHero />
      <Footer />
    </Box>
  );
};

export default LoginPage;