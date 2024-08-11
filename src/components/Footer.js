import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        padding: '2.8rem 0',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #fdf2f4 0%, #fbd1d9 100%)', 
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        fontSize: '1.25rem',
      }}
    >
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
        }}
      >
        &copy; {new Date().getFullYear()} Plus Appointment. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;