import React, { useState } from 'react';
import { Box } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal';
import CalendarViewControls from './CalendarViewControlls';
import CalendarEventContent from './CalendarEventContent';
import CalendarDayCell from './CalendarDayCell';
import FullCalendarWrapper from './FullCalendarWrapper';

const views = ['dayGridMonth', 'timeGridDay', 'resourceTimelineDay'];
const viewLabels = ['Month', 'Day', 'Staff'];

const FullCalendarComponent = ({ events, staff }) => {
  const [currentView, setCurrentView] = useState(views[0]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <CalendarViewControls
        currentView={currentView}
        views={views}
        viewLabels={viewLabels}
        onPrevClick={() => handleViewChange(-1)}
        onNextClick={() => handleViewChange(1)}
      />
      <FullCalendarWrapper
        currentView={currentView}
        events={updatedEvents}
        resources={resources}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
        renderEventContent={(eventInfo) => <CalendarEventContent eventInfo={eventInfo} currentView={currentView} />}
        renderDayCell={(dayCellInfo) => <CalendarDayCell dayCellInfo={dayCellInfo} events={events} currentView={currentView} />}
      />
      {selectedAppointmentId && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointmentId={selectedAppointmentId}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default FullCalendarComponent;