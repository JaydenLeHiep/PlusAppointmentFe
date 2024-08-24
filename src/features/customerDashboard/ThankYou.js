import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ThankYou = () => {
  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
      <Box
        sx={{
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for booking an appointment with us! We have sent you an email to confirm your reservation.
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYou;