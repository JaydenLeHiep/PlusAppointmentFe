import React from 'react';
import { Typography, Box } from '@mui/material';

const CustomerDashboard = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4">
        Hello, Hi customer
      </Typography>
    </Box>
  );
};

export default CustomerDashboard;
