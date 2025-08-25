import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { motion } from 'framer-motion';
import {
  IconContainer,
  IconTreeContainer,
  RopeTreeContainer,
  RopeManContainer,
  RopeBellContainer,
  IconBellContainer,
} from '../../../styles/OwnerStyle/ButtonCalendarStyle';

import TreeIcon from '../../../assets/christmas-tree.png';
import Cookies from '../../../assets/gingerbread-man.png 00-30-41-648.png';
import BellIcon from '../../../assets/packard-bell.png';

const CalendarViewControls = ({ currentView, views, viewLabels, onPrevClick, onNextClick }) => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Determine if the screen size is mobile

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightblue',
        backgroundColor: 'lightblue',
        padding: '8px',
        borderRadius: '8px',
        marginBottom: '16px',
        position: 'relative', // For absolute positioning
      }}
    >
      {/* Render Left Icon only if not mobile */}
      {!isMobile && (
        <Box
          sx={{
            position: 'absolute',
            left: '10%', // Adjust the tree position closer to the middle
            bottom: '-35px', // Start the rope slightly below the navigation
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RopeTreeContainer>
            <IconTreeContainer>
              <img src={TreeIcon} alt="Christmas Tree" />
            </IconTreeContainer>
          </RopeTreeContainer>
        </Box>
      )}

      {/* Main Navigation */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton onClick={onPrevClick}>
            <ArrowBackIosTwoToneIcon />
          </IconButton>
        </motion.div>
        <Typography variant="h6" sx={{ margin: '0 16px' }}>
          {viewLabels[views.indexOf(currentView)]}
        </Typography>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton onClick={onNextClick}>
            <ArrowForwardIosTwoToneIcon />
          </IconButton>
        </motion.div>
      </Box>

      {/* Render Right Icons only if not mobile */}
      {!isMobile && (
        <>
          {/* Cookies */}
          <Box
            sx={{
              position: 'absolute',
              right: '25%',
              bottom: '-35px', // Start the rope slightly below the navigation
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RopeManContainer>
              <IconContainer>
                <img src={Cookies} alt="Cookie" />
              </IconContainer>
            </RopeManContainer>
          </Box>

          {/* Bell */}
          <Box
            sx={{
              position: 'absolute',
              right: '5%',
              bottom: '-35px', // Start the rope slightly below the navigation
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RopeBellContainer>
              <IconBellContainer>
                <img src={BellIcon} alt="Bell" />
              </IconBellContainer>
            </RopeBellContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CalendarViewControls;