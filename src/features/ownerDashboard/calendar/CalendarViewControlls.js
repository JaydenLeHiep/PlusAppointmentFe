import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { motion } from 'framer-motion';
import Icon from '../../../assets/Gold.png'

const NavigationWithImageIcon = ({ onPrevClick, onNextClick, views, currentView, viewLabels }) => {
  return (
    <Box
      sx={{
        position: 'relative', // Enable positioning for the parent container
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightblue',
        backgroundColor: 'red',
        padding: '8px',
        borderRadius: '8px',
        marginBottom: '16px',
        marginTop: '15px'
      }}
    >
      {/* Floating image icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '-58px', // Adjust to place the image above the navigation
          left: '50%',
          transform: 'translateX(7%)', // Center the image horizontally
        }}
      >
        <img
          src={Icon}
          alt="Icon"
          style={{
            width: '80px', // Adjust size as needed
            height: '80px',
            borderRadius: '50%', // Make it circular
          }}
        />
      </Box>

      {/* Main Navigation */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton onClick={onPrevClick}>
            <ArrowBackIosTwoToneIcon sx={{ color: 'white' }} />
          </IconButton>
        </motion.div>
        <Typography variant="h6" sx={{ margin: '0 16px', color: 'white' }}>
          {viewLabels[views.indexOf(currentView)]}
        </Typography>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton onClick={onNextClick}>
            <ArrowForwardIosTwoToneIcon sx={{ color: 'white' }} />
          </IconButton>
        </motion.div>
      </Box>
    </Box>
  );
};

export default NavigationWithImageIcon;