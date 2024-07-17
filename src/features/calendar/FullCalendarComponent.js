import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../styles/css/FullCalendarComponent.css';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal';

const views = ['dayGridMonth', 'timeGridWeek', 'timeGridDay'];
const viewLabels = ['Month', 'Week', 'Day'];

const FullCalendarComponent = ({ events }) => {
  const [currentView, setCurrentView] = useState(views[0]);
  const calendarRef = useRef(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView);
    }
  }, [currentView]);

  const handleDateClick = (arg) => {
    setCurrentView('timeGridDay');
  };

  const handleEventClick = (clickInfo) => {
    setSelectedAppointment(clickInfo.event.extendedProps);
    setIsModalOpen(true);
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

    if (currentView === 'timeGridDay' || currentView === 'timeGridWeek') {
      return (
        <div>
          <span><strong>{timeText}</strong> {`${title} - ${service} - ${staff} - ${status}`}</span>
        </div>
      );
    }

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
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
        initialView={currentView}
        events={events}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick} // Handle event click
        eventContent={renderEventContent}
        dayCellContent={renderDayCell}
      />
      {selectedAppointment && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onUpdateStatus={(id, status) => {
            // Update event status logic here if needed
            console.log(`Updated appointment ${id} to status ${status}`);
          }}
        />
      )}
    </Box>
  );
};

export default FullCalendarComponent;
