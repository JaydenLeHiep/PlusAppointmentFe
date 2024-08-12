import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        padding: '2.8rem 0',
        textAlign: 'center',
        backgroundColor: '#fff', // White background
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        fontSize: '1.25rem',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#000', // Black text color
          textDecoration: 'none', // Ensure no underline
        }}
      >
        &copy; {new Date().getFullYear()} Plus Appointment. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;