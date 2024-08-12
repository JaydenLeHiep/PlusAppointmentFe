import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

const CalendarViewControls = ({ currentView, views, viewLabels, onPrevClick, onNextClick }) => {
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
      }}
    >
      <IconButton onClick={onPrevClick}>
        <ArrowBackIosTwoToneIcon />
      </IconButton>
      <Typography variant="h6" sx={{ margin: '0 16px' }}>
        {viewLabels[views.indexOf(currentView)]}
      </Typography>
      <IconButton onClick={onNextClick}>
        <ArrowForwardIosTwoToneIcon />
      </IconButton>
    </Box>
  );
};

export default CalendarViewControls;