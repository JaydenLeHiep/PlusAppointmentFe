import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { loginUser } from '../../../lib/apiClient';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation('loginForm'); // Use the 'loginForm' namespace for translations
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser({ usernameOrEmail, password });

      setMessage(data.message || t('loginSuccessful'));
      setAlertVariant('success');
      
      // Store token in localStorage and update auth state
      login(data.token, { username: data.username, role: data.role });

      // Set a flag indicating a new login
      localStorage.setItem('isNewLogin', 'true');

      // Redirect based on user role or other criteria
      navigate('/owner-dashboard');
    } catch (error) {
      setMessage(error.message || t('loginFailed'));
      setAlertVariant('danger');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label={t('usernameOrEmail')}
        variant="outlined"
        fullWidth
        margin="normal"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        required
      />
      <TextField
        label={t('password')}
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
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }} disabled={!usernameOrEmail || !password}>
        {t('login')}
      </Button>
      {message && (
        <Alert severity={alertVariant} sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
