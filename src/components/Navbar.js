import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import EnglishFlag from '../assets/united-kingdom.png';
import VietnameseFlag from '../assets/vietnam.png';

// Importing Google Fonts
import '@fontsource/poppins'; // Importing Poppins font
import '@fontsource/roboto'; // Importing Roboto font

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('navbar');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      h4: {
        fontSize: '1.6rem',
        fontWeight: '500',
      },
      button: {
        fontSize: '1.0rem',
        fontWeight: '500',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
          height: { xs: '55px', sm: '75px' }, // Reduced heights
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%', // Ensures the Toolbar matches AppBar height
            padding: { xs: '0 16px', sm: '0 24px' },
          }}
        >
          <Typography
            variant="h4"
            component={RouterLink}
            to="/business-home"
            sx={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: '500',
              flexGrow: 1,
              textAlign: 'left',
              '&:hover': {
                color: '#007bff',
              },
              transition: 'color 0.3s ease',
            }}
          >
            Plus Appointment
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>


            {!isAuthenticated && (
              <Button
                color="primary"
                component={RouterLink}
                to="/business-home"
                sx={{
                  color: '#000000',
                  textTransform: 'none',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#007bff',
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('home')}
              </Button>
            )}
            {isAuthenticated ? (
              <Button
                color="primary"
                onClick={handleLogout}
                sx={{
                  color: '#000000',
                  textTransform: 'none',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#007bff',
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('logout')}
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#000000',
                    textTransform: 'none',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#007bff',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {t('register')}
                </Button>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#000000',
                    textTransform: 'none',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#007bff',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {t('login')}
                </Button>
              </>
            )}
            {/* Language Switcher */}
            <IconButton onClick={() => changeLanguage('en')} aria-label="Change language to English">
              <img src={EnglishFlag} alt="English" style={{ width: '32px', height: 'auto' }} />
            </IconButton>
            <IconButton onClick={() => changeLanguage('vi')} aria-label="Change language to Vietnamese">
              <img src={VietnameseFlag} alt="Vietnamese" style={{ width: '32px', height: 'auto' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;