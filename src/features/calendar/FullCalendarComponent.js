import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Box } from '@mui/material';

const FullCalendarComponent = ({ events }) => {
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.on('datesSet', () => {
        setCurrentView(calendarApi.view.type);
      });
    }
  }, []);

  const handleDateClick = (arg) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView('timeGridDay', arg.dateStr);
      setCurrentView('timeGridDay');
    }
  };

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { service, staff, status } = extendedProps;
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;
    const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (currentView === 'timeGridDay') {
      return (
        <div>
          <strong>{timeText}</strong>
          <br />
          <span>{`${title} - ${service} - ${staff} - ${status}`}</span>
        </div>
      );
    }

    return (
      <div>
        <strong>{timeText}</strong>
        <br />
        <span>{title}</span>
      </div>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" onClick={() => handleViewChange('dayGridMonth')}>Month</Button>
        <Button variant="contained" onClick={() => handleViewChange('timeGridWeek')} sx={{ mx: 1 }}>Week</Button>
        <Button variant="contained" onClick={() => handleViewChange('timeGridDay')}>Day</Button>
      </Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        events={events}
        height="auto"
        dateClick={handleDateClick}
        eventContent={renderEventContent} // Custom rendering
      />
    </Box>
  );
};

export default FullCalendarComponent;
