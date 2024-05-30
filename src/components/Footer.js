import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/css/Footer.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Nail Store. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;