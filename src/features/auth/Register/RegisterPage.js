import React, { useState, useEffect } from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../../lib/apiClient';
import { useTranslation } from 'react-i18next';

const heroImage = require('../../../assets/hero-image.jpg');

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const { t } = useTranslation('registerPage'); // Use the 'registerPage' namespace for translations

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('registerForm'));
    if (savedForm) {
      setUsername(savedForm.username);
      setEmail(savedForm.email);
      setPhone(savedForm.phone);
      setPassword(savedForm.password);
    }
    localStorage.setItem('currentPath', window.location.pathname);
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      const data = await registerUser({ username, password, email, phone });
      setMessage(t('registrationSuccess') + ': ' + data.message); 
      setAlertVariant('success');
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
      localStorage.removeItem('registerForm');
    } catch (error) {
      setMessage(t('registrationFailure'));
      setAlertVariant('danger');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          flex: 1,
          minHeight: '82vh',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '82vh',
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              mt: 0,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                textAlign: 'center',
                color: '#333',
              }}
            >
              {t('registerTitle')}
            </Typography>
            <RegisterForm
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              handleRegister={handleRegister}
              message={message}
              alertVariant={alertVariant}
            />
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default RegisterPage;