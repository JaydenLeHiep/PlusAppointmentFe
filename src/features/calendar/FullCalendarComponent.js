// src/components/FullCalendarComponent.js

import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Box } from '@mui/material';

const FullCalendarComponent = ({ events }) => {
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView('timeGridDay', arg.dateStr);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView);
    }
  }, [currentView]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" onClick={() => setCurrentView('dayGridMonth')}>Month</Button>
        <Button variant="contained" onClick={() => setCurrentView('timeGridWeek')} sx={{ mx: 1 }}>Week</Button>
        <Button variant="contained" onClick={() => setCurrentView('timeGridDay')}>Day</Button>
      </Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        events={events}
        height="auto"
        dateClick={handleDateClick}
      />
    </Box>
  );
};

export default FullCalendarComponent;
