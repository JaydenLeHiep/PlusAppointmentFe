import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomerBusinessInfo = ({ businessInfo, view, onBackClick }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingTop: '20px',
        backgroundColor: '#f0f8ff',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Back Button */}
      {view !== 'services' && (
        <Box sx={{ position: 'absolute' }}>
          <IconButton onClick={onBackClick} sx={{ color: '#1976d2' }}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
      )}

      {/* Business Name Centered */}
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#1976d2', 
          fontFamily: "'Montserrat', sans-serif", 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
          margin: '0 auto', 
        }}
      >
        {businessInfo.name}
      </Typography>

      {/* Address and Phone */}
      <Box sx={{ position: 'absolute', right: 0, textAlign: 'right' }}>
        <Typography 
          variant="body2" 
          component="div" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: '1rem',
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
            fontSize: '1 rem',
            fontFamily: "'Roboto', sans-serif",
            color: '#1976d2',
            marginTop: '4px',
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