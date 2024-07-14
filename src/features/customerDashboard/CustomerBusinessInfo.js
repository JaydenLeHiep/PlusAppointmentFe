// CustomerBusinessInfo.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <Box className="business-info">
      <Typography variant="h5">{businessInfo.name}</Typography>
      <Typography variant="body1">Address: {businessInfo.address}</Typography>
      <Typography variant="body1">Phone: {businessInfo.phone}</Typography>
    </Box>
  );
};

export default CustomerBusinessInfo;
