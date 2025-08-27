import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStaff } from '../../../hooks/useAuthStaff';
import { loginStaff } from '../../../lib/apiClientStaff';
import { useTranslation } from 'react-i18next';

const LoginStaffForm = () => {
  const { t } = useTranslation('loginForm');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const { login } = useAuthStaff();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedUsername) {
      setUsernameOrEmail(savedUsername);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginStaff({ usernameOrEmail, password });

      setMessage(data.message || t('loginSuccessful'));
      setAlertVariant('success');

      login(data.token, { username: data.username, role: data.role, userId: data.userId });

      if (rememberMe) {
        localStorage.setItem('savedUsername', usernameOrEmail);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('rememberMe');
      }

      navigate('/staff-dashboard');
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
      <FormControlLabel
        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
        label={t('rememberMe')}
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

export default LoginStaffForm;
