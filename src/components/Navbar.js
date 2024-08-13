import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Importing Google Fonts
import '@fontsource/poppins'; // Importing Poppins font
import '@fontsource/roboto'; // Importing Roboto font

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      h4: {
        fontSize: '1.8rem',
        fontWeight: '500',
      },
      button: {
        fontSize: '1.2rem',
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
          height: { xs: '65px', sm: '85px' },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
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
          <Box sx={{ display: 'flex', gap: 3 }}>
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
                Home
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
                Logout
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
                  Register
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
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;