import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

const NavigationWithImageIcon = ({ onPrevClick, onNextClick, views, currentView, viewLabels }) => {
  return (
    <Box
      sx={{
        position: 'relative', // Enable positioning for the parent container
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightblue',
        backgroundColor: '#ff69b4',
        padding: '8px',
        borderRadius: '8px',
        marginBottom: '16px',
        marginTop: '15px'
      }}
    >
      {/* Main Navigation */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={onPrevClick}>
          <ArrowBackIosTwoToneIcon sx={{ color: 'white' }} />
        </IconButton>
        <Typography variant="h6" sx={{ margin: '0 16px', color: 'white' }}>
          {viewLabels[views.indexOf(currentView)]}
        </Typography>
        <IconButton onClick={onNextClick}>
          <ArrowForwardIosTwoToneIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavigationWithImageIcon;