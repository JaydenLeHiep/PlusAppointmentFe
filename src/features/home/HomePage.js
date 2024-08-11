import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Paper
        sx={{
          padding: '50px 40px',
          borderRadius: '15px',
          border: 'none',
          backgroundColor: '#ffffff',
          textAlign: 'center',
          color: '#333333',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Welcome to Plus Appointment
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#555555' }}>
          Are you...?
        </Typography>
        <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              padding: '10px 20px',
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.4)',
              '&:hover': {
                backgroundColor: '#115293',
                boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.6)',
              },
            }}
            onClick={() => navigate('/business-home')}
          >
            Business Owner
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              padding: '10px 20px',
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0px 5px 15px rgba(233, 30, 99, 0.4)',
              '&:hover': {
                backgroundColor: '#c2185b',
                boxShadow: '0px 5px 15px rgba(233, 30, 99, 0.6)',
              },
            }}
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