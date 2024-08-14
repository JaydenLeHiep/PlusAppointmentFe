import React from 'react';
import { Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <Box 
      sx={{
        marginTop: '40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Business Name Centered */}
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#1976d2', 
          fontFamily: "'Montserrat', sans-serif", 
          margin: '0 auto',
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
        }}
      >
        {businessInfo.name}
      </Typography>

      {/* Address and Phone at Top Right with Icons */}
      <Box 
        sx={{
          position: 'absolute',
          top: '20px',
          right: '0px', 
          textAlign: 'right',
          color: '#555',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          paddingRight: '20px', // Ensures the text doesn't touch the right edge
        }}
      >
        <Typography 
          variant="body2" 
          component="div" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: '0.95rem',
            fontFamily: "'Roboto', sans-serif",
            color: '#1976d2',
          }}
        >
          <LocationOnIcon sx={{ marginRight: '6px', color: '#1976d2' }} />
          {businessInfo.address}
        </Typography>
        <Typography 
          variant="body2" 
          component="div" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '0.95rem',
            fontFamily: "'Roboto', sans-serif",
            color: '#1976d2',
          }}
        >
          <PhoneIcon sx={{ marginRight: '6px', color: '#1976d2' }} />
          {businessInfo.phone}
        </Typography>
      </Box>
    </Box>
  );  
};

export default CustomerBusinessInfo;
