import React from 'react';
import { Typography, Box } from '@mui/material';

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <Box 
      sx={{
        borderRadius: '12px',
        backgroundColor: '#f0f8ff',
        padding: '24px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #1976d2',
        '&:hover': {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#e6f1ff',
        },
        maxWidth: '600px',
        margin: 'auto',
        marginBottom: '24px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '16px' }}>
        {businessInfo.name}
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: '8px' }}>
        Address: {businessInfo.address}
      </Typography>
      <Typography variant="body1" component="p">
        Phone: {businessInfo.phone}
      </Typography>
    </Box>
  );
};

export default CustomerBusinessInfo;