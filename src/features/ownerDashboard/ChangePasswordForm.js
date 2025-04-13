import React, { useState } from 'react';
import { Box, Container, Card, Typography, TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { changePassword } from '../../lib/apiClient';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const heroImage = require('../../assets/hero-image.jpg'); // Adjust the path as needed

const ChangePasswordForm = () => {
  const { t } = useTranslation('changePasswordForm'); // Use the namespace for translations
  const [oldPassword, setOldPassword] = useState('');
  const [confirmOldPassword, setConfirmOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmOldPassword, setShowConfirmOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const { logout } = useAuth(); // Use the logout method from useAuth
  const navigate = useNavigate(); // Use useNavigate for redirecting

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    // Get userId from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setMessage(t('userNotFound')); // Use translation
      setAlertVariant('error');
      return;
    }

    // Validation: Check if passwords match
    if (oldPassword !== confirmOldPassword) {
      setMessage(t('oldPasswordMismatch')); // Use translation
      setAlertVariant('error');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage(t('newPasswordMismatch')); // Use translation
      setAlertVariant('error');
      return;
    }

    try {
      // Send change password request
      const response = await changePassword({
        userId,
        oldPassword,
        newPassword,
      });

      setMessage(response.message || t('passwordChangeSuccess')); // Use translation
      setAlertVariant('success');

      // Log out and redirect to login after 5 seconds
      setTimeout(() => {
        logout(); // Clear all login info using logout from useAuth
        navigate('/login'); // Redirect to the login page
      }, 5000);
    } catch (error) {
      setMessage(error.message || t('passwordChangeFailed')); // Use translation
      setAlertVariant('error');
    }
  };

  const changeView = (view) => {
    if (view === 'dashboard') {
      navigate('/owner-dashboard'); // or your dashboard route
    } else if (view === 'customersInfo') {
      navigate('/owner-dashboard'); // adjust if you have a separate route
    }
  };

  return (
    <>
      <Navbar changeView={changeView} />
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
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
              {t('title')}
            </Typography>
            <form onSubmit={handlePasswordChange}>
              <TextField
                label={t('oldPassword')}
                type={showOldPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label={t('confirmOldPassword')}
                type={showConfirmOldPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmOldPassword}
                onChange={(e) => setConfirmOldPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmOldPassword(!showConfirmOldPassword)} edge="end">
                        {showConfirmOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label={t('newPassword')}
                type={showNewPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label={t('confirmNewPassword')}
                type={showConfirmNewPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} edge="end">
                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!oldPassword || !confirmOldPassword || !newPassword || !confirmNewPassword}
              >
                {t('changePasswordButton')}
              </Button>
              {message && (
                <Alert severity={alertVariant} sx={{ mt: 3 }}>
                  {message}
                </Alert>
              )}
            </form>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ChangePasswordForm;
