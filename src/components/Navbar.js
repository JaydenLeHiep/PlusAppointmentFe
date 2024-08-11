import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../styles/css/OwnerDashboardCss/Navbar.css';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography
          variant="h6"
          className="navbar-title"
          component={RouterLink}
          to="/business-home"
          style={{ textDecoration: 'none'}}
        >
          Plus Appointment
        </Typography>
        {!isAuthenticated && (
          <Button color="primary" component={RouterLink} to="/business-home">
            Home
          </Button>
        )}
        {isAuthenticated ? (
          <>
            {/* remove this welcome */}

            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="primary" component={RouterLink} to="/register">
              Register
            </Button>
            <Button color="primary" component={RouterLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
