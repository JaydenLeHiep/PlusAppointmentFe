import React, { useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const RegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  handleRegister,
  message,
  alertVariant
}) => {
  const { t } = useTranslation('registerForm'); // Use the 'registerForm' namespace for translations

  useEffect(() => {
    localStorage.setItem('registerForm', JSON.stringify({ username, email, phone, password }));
  }, [username, email, phone, password]);

  return (
    <form onSubmit={handleRegister}>
      <TextField
        label={t('username')}
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label={t('email')}
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label={t('phone')}
        type="tel"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <Button variant="contained" color="primary" type="submit" className="w-100" style={{marginTop: '15px'}}>
        {t('register')}
      </Button>
      {message && (
        <Alert severity={alertVariant} className="mt-3" style={{marginTop: '10px'}}>
          {message}
        </Alert>
      )}
    </form>
  );
};

export default RegisterForm;