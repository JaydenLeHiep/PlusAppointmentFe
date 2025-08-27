// components/NavbarStaff.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// ⬇️ Staff auth
import { useAuthStaff } from '../hooks/useAuthStaff';

// Importing Google Fonts
import '@fontsource/poppins';
import '@fontsource/roboto';

const NavbarStaff = () => {
  const { isAuthenticated, logout } = useAuthStaff();
  const navigate = useNavigate();
  const { t } = useTranslation('navbar');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/staff-login');
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
        position="fixed"
        sx={{
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
          height: { xs: '55px', sm: '75px' },
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1100,
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
          {/* Left: Brand */}
          <Typography
            variant="h4"
            component={RouterLink}
            to="/staff-dashboard"
            sx={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': { color: '#007bff' },
              transition: 'color 0.3s ease',
            }}
          >
            Staff Portal
          </Typography>

          {/* Right: Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
              sx={{
                color: '#000000',
                '&:hover': { color: '#007bff' },
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
              {!isAuthenticated ? (
                <MenuItem
                  component={RouterLink}
                  to="/staff-login"
                  onClick={handleMenuClose}
                >
                  {t('login')}
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key="dashboard"
                    component={RouterLink}
                    to="/staff-dashboard"
                    onClick={handleMenuClose}
                  >
                    {t('home')}
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    {t('logout')}
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavbarStaff;
