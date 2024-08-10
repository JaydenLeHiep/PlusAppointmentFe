import React, { useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  passwordValid,
  showPassword,
  toggleShowPassword,
  handleRegister,
  message,
  alertVariant
}) => {

  useEffect(() => {
    localStorage.setItem('registerForm', JSON.stringify({ username, email, phone, password }));
  }, [username, email, phone, password]);

  return (
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
        label="Phone"
        type="tel"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <Button variant="contained" color="primary" type="submit" className="w-100" disabled={!passwordValid} style={{marginTop: '15px'}}>
        Register
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
