import React from 'react';
import { Typography, Container } from '@mui/material';

const ThankYou = () => {
  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
     
        <Typography variant="h3" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for booking an appointment with us! We have sent you an email to confirm your reservation.
        </Typography>
      
    </Container>
  );
};

export default ThankYou;