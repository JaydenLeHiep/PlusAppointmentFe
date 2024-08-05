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

const views = ['dayGridMonth', 'timeGridDay', 'resourceTimelineDay'];
const viewLabels = ['Month', 'Day', 'Staff'];

const FullCalendarComponent = ({ events, staff }) => {
  const [currentView, setCurrentView] = useState(views[0]);
  const calendarRef = useRef(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
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
    console.log(clickInfo.event.extendedProps);
    setSelectedAppointmentId(clickInfo.event.extendedProps.appointmentId);
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
    const { staffName } = extendedProps;
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;
    const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (currentView === 'timeGridDay' || currentView === 'resourceTimelineDay') {
      return (
        <div>
          <span><strong>{timeText}</strong> {`${title} - ${staffName}`}</span>
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
    setSelectedAppointmentId(null);
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
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
          startTime: '08:00', // Start time
          endTime: '19:00' // End time
        }}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today'
        }}
        views={{
          timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 },
            buttonText: 'day',
            slotDuration: '01:00:00', // Set slot duration to 1 hour
            resources: true, // Ensures resources are displayed in timeGridDay view
          },
          resourceTimelineDay: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            buttonText: 'staff',
          }
        }}
        slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false }}
      />
      {selectedAppointmentId && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointmentId={selectedAppointmentId}
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
