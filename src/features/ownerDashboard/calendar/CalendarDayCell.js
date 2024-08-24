import React from 'react';
import { Box } from '@mui/material';

const CalendarDayCell = ({ dayCellInfo, events, currentView }) => {
  const date = dayCellInfo.date;

  // Filter events that match the specific date
  const dayEvents = events.filter(event => new Date(event.start).toDateString() === date.toDateString());

  // Use a Set to track unique appointment IDs
  const uniqueAppointmentIds = new Set(dayEvents.map(event => event.appointmentId));
  const uniqueAppointmentCount = uniqueAppointmentIds.size;

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
        {uniqueAppointmentCount > 0 && (
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
            {uniqueAppointmentCount}
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
