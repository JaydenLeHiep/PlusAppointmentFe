import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LoginForm from '../Login/LoginForm';
import '../../../styles/css/LoginPage.css';

const LoginPage = () => {
  return (
    <Box>
      <Navbar />
      <Box className="login-hero">
        <Container 
          className="d-flex align-items-center justify-content-center" 
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "82vh", paddingTop: 0, marginTop: 0 }}
        >
          <LoginForm />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginPage;
