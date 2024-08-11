import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Importing Google Font
import '@fontsource/lobster'; // or whichever script font you prefer

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Lobster", cursive', 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #fdf2f4 0%, #fbd1d9 100%)', 
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
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
              flexGrow: 1,
              textAlign: 'left',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
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
                sx={{ color: '#fff', textTransform: 'none', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Stronger black shadow for better readability
              >
                Home
              </Button>
            )}
            {isAuthenticated ? (
              <Button
                color="primary"
                onClick={handleLogout}
                sx={{ color: '#fff', textTransform: 'none', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Stronger black shadow for better readability
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/register"
                  sx={{ color: '#fff', textTransform: 'none', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Stronger black shadow for better readability
                >
                  Register
                </Button>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  sx={{ color: '#fff', textTransform: 'none', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Stronger black shadow for better readability
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