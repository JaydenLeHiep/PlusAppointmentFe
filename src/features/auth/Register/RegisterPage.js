import React, { useState, useEffect } from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import RegisterForm from './RegisterForm';
import usePasswordValidation from '../../../hooks/usePasswordValidation';
import { registerUser } from '../../../lib/apiClient';
import '../../../styles/css/Register.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const passwordValid = usePasswordValidation(password);

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
    if (!passwordValid) {
      setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character!');
      setAlertVariant('danger');
      return;
    }

    try {
      const data = await registerUser({ username, password, email, phone });
      setMessage(data.message || 'Registration successful!');
      setAlertVariant('success');
      // Clear form data
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
      localStorage.removeItem('registerForm');
    } catch (error) {
      setMessage(error.message);
      setAlertVariant('danger');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box>
      <Navbar />
      <Box className="register-hero">
        <Container 
          className="d-flex align-items-center justify-content-center" 
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "82vh", paddingTop: 0, marginTop: 0 }}
        >
          <Card className="register-container" style={{ marginTop: '0 !important' }}>
            <Typography variant="h4" component="h1" gutterBottom className="text-center">
              Register
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
              passwordValid={passwordValid}
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
