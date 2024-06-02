import React, { useState } from 'react';
import { TextField, Button, Typography, InputAdornment, IconButton, Card, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../../../lib/apiClient';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser({ usernameOrEmail, password });
      setMessage(data.message || 'Login successful!');
      setAlertVariant('success');
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect based on user role or other criteria
      navigate('/owner-dashboard'); // Or '/owner-dashboard' based on the role
    } catch (error) {
      setMessage(error.message);
      setAlertVariant('danger');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Card className="login-container">
      <Typography variant="h4" component="h1" gutterBottom className="text-center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username or Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
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
        <Button variant="contained" color="primary" type="submit" className="w-100" style={{marginTop: '15px'}} disabled={!usernameOrEmail || !password}>
          Login
        </Button>
      </form>
      {message && (
        <Alert severity={alertVariant} className="mt-3">
          {message}
        </Alert>
      )}
    </Card>
  );
};

export default LoginForm;
