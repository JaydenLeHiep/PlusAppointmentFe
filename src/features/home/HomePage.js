import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/css/OwnerDashboardCss/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box className="background-box">
      <Paper className="content-box">
        <Typography variant="h3" gutterBottom>
          Welcome to Plus Appointment
        </Typography>
        <Typography variant="h5" gutterBottom>
          Are you...?
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginRight: 2 }}
            onClick={() => navigate('/business-home')}
          >
            Business Owner
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/customer-dashboard')}
          >
            Customer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
