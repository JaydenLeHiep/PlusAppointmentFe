import React from 'react';
import { Typography, Box } from '@mui/material';

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <Box 
      sx={{
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        padding: '32px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        '&:hover': {
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-3px)',  // Subtle hover effect
        },
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '40px',
        marginBottom: '20px',
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")', // Subtle background pattern
      }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '12px' }}>
        {businessInfo.name}
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: '8px', color: '#555' }}>
        Address: {businessInfo.address}
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#555' }}>
        Phone: {businessInfo.phone}
      </Typography>
    </Box>
  );
};

export default CustomerBusinessInfo;