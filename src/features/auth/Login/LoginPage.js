import React, { useEffect } from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoginForm from './LoginForm';
import '../../../styles/css/OwnerCss/LoginPage.css';

const LoginPage = () => {
  useEffect(() => {
    localStorage.setItem('currentPath', window.location.pathname);
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box className="login-hero" flex="1">
        <Container 
          className="d-flex align-items-center justify-content-center" 
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', paddingTop: 0, marginTop: 0 }}
        >
          <Card className="login-container">
            <Typography variant="h4" component="h1" gutterBottom className="text-center">
              Login
            </Typography>
            <LoginForm />
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginPage;
