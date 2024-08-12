import React from 'react';
import { Box } from '@mui/material';

const CalendarDayCell = ({ dayCellInfo, events, currentView }) => {
  const date = dayCellInfo.date;
  const dayEvents = events.filter(event => new Date(event.start).toDateString() === date.toDateString());
  const eventCount = dayEvents.length;

  if (currentView === 'dayGridMonth') {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {eventCount > 0 && (
          <Box
            sx={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '0.2rem 0.5rem',
              position: 'absolute',
              top: '20px',
              fontSize: '0.75rem',
            }}
          >
            {eventCount}
          </Box>
        )}
        <div>{date.getDate()}</div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>{date.getDate()}</div>
    </Box>
  );
};

export default CalendarDayCell;