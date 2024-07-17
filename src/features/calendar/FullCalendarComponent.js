import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import '../../styles/css/FullCalendarComponent.css';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal';

const views = ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'resourceTimelineDay'];
const viewLabels = ['Month', 'Week', 'Day', 'Staff'];

const FullCalendarComponent = ({ events, staff }) => {
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

  const handleDateClick = () => {
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

  // const handleDateNav = (direction) => {
  //   const calendarApi = calendarRef.current.getApi();
  //   if (direction === -1) {
  //     calendarApi.prev();
  //   } else {
  //     calendarApi.next();
  //   }
  // };

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const { service, staffName, status } = extendedProps;
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;
    const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (currentView === 'timeGridDay' || currentView === 'timeGridWeek' || currentView === 'resourceTimelineDay') {
      return (
        <div>
          <span><strong>{timeText}</strong> {`${title} - ${service} - ${staffName} - ${status}`}</span>
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

  // Create resources from staff names
  const resources = staff.map((staffMember, index) => ({
    id: index.toString(),
    title: staffMember.name
  }));

  // Add resourceIds to events
  const updatedEvents = events.map(event => {
    const resource = resources.find(res => res.title === event.staffName);
    return {
      ...event,
      resourceIds: [resource?.id]
    };
  });

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
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        initialView={currentView}
        events={updatedEvents}
        resources={resources}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        dayCellContent={renderDayCell}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        views={{
          timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 },
            buttonText: 'day',
            slotDuration: '00:30:00',
            resources: true, // Ensures resources are displayed in timeGridDay view
          },
          resourceTimelineDay: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            buttonText: 'staff',
          }
        }}
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
