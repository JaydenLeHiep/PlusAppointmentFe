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
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(views[currentViewIndex]);
    }
  }, [currentViewIndex]);

  const handleDateClick = (arg) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView('timeGridDay', arg.dateStr);
      setCurrentViewIndex(2); // Set to 'Day' view
    }
  };

  const handleViewChange = (direction) => {
    setCurrentViewIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + views.length) % views.length;
      return newIndex;
    });
  };

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { service, staff, status } = extendedProps;
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;
    const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (views[currentViewIndex] === 'timeGridDay') {
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
    <Box className="carousel-container">
      <Box className="carousel-controls">
        <IconButton onClick={() => handleViewChange(-1)}>
          <ArrowBackIosTwoToneIcon />
        </IconButton>
        <Typography variant="h6" className="carousel-label">{viewLabels[currentViewIndex]}</Typography>
        <IconButton onClick={() => handleViewChange(1)}>
          <ArrowForwardIosTwoToneIcon />
        </IconButton>
      </Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={views[currentViewIndex]}
        events={events}
        height="auto"
        dateClick={handleDateClick}
        eventContent={renderEventContent} // Custom rendering
      />
    </Box>
  );
};

export default FullCalendarComponent;