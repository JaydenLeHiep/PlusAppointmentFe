import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../styles/css/FullCalendarComponent.css';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

const views = ['dayGridMonth', 'timeGridWeek', 'timeGridDay'];
const viewLabels = ['Month', 'Week', 'Day'];

const FullCalendarComponent = ({ events }) => {
  const [currentView, setCurrentView] = useState(views[0]); // Track current view directly
  const calendarRef = useRef(null);

  // Effect to handle view change
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView); // Use currentView directly
    }
  }, [currentView]); // Trigger effect when currentView changes

  const handleDateClick = (arg) => {
    setCurrentView('timeGridDay'); // Update currentView directly
  };

  const handleViewChange = (direction) => {
    setCurrentView((prevView) => {
      const currentIndex = views.indexOf(prevView);
      const newIndex = (currentIndex + direction + views.length) % views.length;
      return views[newIndex];
    });
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

    if (currentView === 'timeGridWeek') {
      return (
        <div>
          <strong>{timeText}</strong>
          <br />
          <span>{title}</span>
        </div>
      );
    }

    // Return null for dayGridMonth view to show nothing
    return null;
  };

  const renderDayCell = (dayCellInfo) => {
    const date = dayCellInfo.date;
    const dayEvents = events.filter(event =>
      new Date(event.start).toDateString() === date.toDateString()
    );
    const eventCount = dayEvents.length;

    if (currentView === 'dayGridMonth') {
      return (
        <div className="day-cell">
          {eventCount > 0 && <span className="badge">{eventCount}</span>}
          <div>{date.getDate()}</div>
        </div>
      );
    }

    return (
      <div className="day-cell">
        <div>{date.getDate()}</div>
      </div>
    );
  };

  return (
    <Box className="carousel-container">
      <Box className="carousel-controls">
        <IconButton onClick={() => handleViewChange(-1)}>
          <ArrowBackIosTwoToneIcon />
        </IconButton>
        <Typography variant="h6" className="carousel-label">{viewLabels[views.indexOf(currentView)]}</Typography>
        <IconButton onClick={() => handleViewChange(1)}>
          <ArrowForwardIosTwoToneIcon />
        </IconButton>
      </Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView} // Use currentView directly
        events={events}
        height="auto"
        dateClick={handleDateClick}
        eventContent={renderEventContent} // Custom rendering
        dayCellContent={renderDayCell} // Custom day cell rendering
      />
    </Box>
  );
};

export default FullCalendarComponent;
