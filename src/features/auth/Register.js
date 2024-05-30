import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, InputAdornment, IconButton, Card, Alert, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/css/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/users/register`;

  useEffect(() => {
    const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    setPasswordValid(strongPassword.test(password));
  }, [password]);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!passwordValid) {
      setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character!');
      setAlertVariant('danger');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message || 'Registration successful!');
      setAlertVariant('success');
      // Clear form data
        setUsername('');
        setPassword('');
        setEmail('');

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
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "80vh", paddingTop: 0, marginTop: 0 }}
        >
          <Card className="register-container" style={{ marginTop: '0 !important' }}>
            <Typography variant="h4" component="h1" gutterBottom className="text-center">
              Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!passwordValid && password.length > 0}
                helperText={!passwordValid && password.length > 0 ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.' : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                required
              />
              <Button variant="contained" color="primary" type="submit" className="w-100" disabled={!passwordValid}>
                Register
              </Button>
            </form>
            {message && (
              <Alert severity={alertVariant} className="mt-3" style={{marginTop: '10px'}}>
                {message}
              </Alert>
            )}
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
