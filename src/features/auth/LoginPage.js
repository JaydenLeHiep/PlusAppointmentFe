import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import '../../styles/css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login
    if (username === 'customer') {
      navigate('/customer-dashboard');
    } else if (username === 'owner') {
      navigate('/owner-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box className="login-box">
        <Typography variant="h4" component="h1" gutterBottom className="login-title">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth className="login-button">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;