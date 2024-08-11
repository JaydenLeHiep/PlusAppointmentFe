import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
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

    if (!startTime || !endTime) {
      return <div><span>Invalid Time</span></div>;
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(null);
  };

  const resources = staff.map((staffMember, index) => ({
    id: index.toString(),
    title: staffMember.name,
  }));

  const updatedEvents = events.map(event => {
    const resource = resources.find(res => res.title === event.staffName);
    return {
      ...event,
      resourceIds: [resource?.id],
    };
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
        <IconButton onClick={() => handleViewChange(-1)}>
          <ArrowBackIosTwoToneIcon />
        </IconButton>
        <Typography variant="h6" sx={{ margin: '0 16px' }}>
          {viewLabels[views.indexOf(currentView)]}
        </Typography>
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
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '08:00',
          endTime: '19:00',
        }}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today',
        }}
        views={{
          timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 },
            buttonText: 'day',
            slotDuration: '01:00:00',
            resources: true,
          },
          resourceTimelineDay: {
            type: 'resourceTimeline',
            duration: { days: 1 },
            buttonText: 'staff',
          },
        }}
        slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false }}
      />
      {selectedAppointmentId && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointmentId={selectedAppointmentId}
          onClose={handleCloseModal}
          onUpdateStatus={(id, status) => {
            console.log(`Updated appointment ${id} to status ${status}`);
          }}
        />
      )}
    </Box>
  );
};

export default FullCalendarComponent;