import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// Importing Google Fonts
import '@fontsource/poppins'; // Importing Poppins font
import '@fontsource/roboto'; // Importing Roboto font

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('navbar');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          height: { xs: '55px', sm: '75px' },
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
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleMenuOpen}
                  sx={{
                    color: '#000000',
                    '&:hover': {
                      color: '#007bff',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/register"
                    onClick={handleMenuClose}
                  >
                    {t('register')}
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    {t('login')}
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
