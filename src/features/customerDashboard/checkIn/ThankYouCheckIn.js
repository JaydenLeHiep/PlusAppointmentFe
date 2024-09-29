import React from 'react';
import { Typography, Container } from '@mui/material';

const ThankYouCheckIn = ({ customerName }) => {
  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Thank you for checking in, {customerName}!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please wait a moment while we prepare your service.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginTop: 5,
          fontSize: '15px',
          textDecoration: 'underline',
          cursor: 'pointer',
          color: '#1976d2',
          '&:hover': {
            color: '#1565c0',
          },
        }}
        onClick={() => window.location.reload()}
      >
        Come back anytime!
      </Typography>
    </Container>
  );
};

export default ThankYouCheckIn;
