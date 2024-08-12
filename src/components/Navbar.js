import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Importing Google Font
import '@fontsource/josefin-sans'; // Importing Josefin Sans font

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Josefin Sans", sans-serif',
      h4: {
        fontSize: '2.2rem',
        fontWeight: '700',
      },
      button: {
        fontSize: '1.3rem',
        fontWeight: '700',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#fff', // White background
          color: '#000', // Black text
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
              color: '#000', // Ensure the text is black
              textDecoration: 'none', // Remove underline from link
              fontWeight: 'bold',
              flexGrow: 1,
              textAlign: 'left',
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
                  color: '#000', // Ensure button text is black
                  textTransform: 'none',
                  textDecoration: 'none', // Ensure no underline
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
                  color: '#000', // Ensure button text is black
                  textTransform: 'none',
                  textDecoration: 'none', // Ensure no underline
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
                    color: '#000', // Ensure button text is black
                    textTransform: 'none',
                    textDecoration: 'none', // Ensure no underline
                  }}
                >
                  Register
                </Button>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#000', // Ensure button text is black
                    textTransform: 'none',
                    textDecoration: 'none', // Ensure no underline
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