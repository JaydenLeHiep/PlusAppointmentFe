import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal';
import CalendarViewControls from './CalendarViewControlls';
import CalendarEventContent from './CalendarEventContent';
import CalendarDayCell from './CalendarDayCell';
import FullCalendarWrapper from './FullCalendarWrapper';

const views = ['dayGridMonth', 'timeGridDay', 'resourceTimeGridDay'];
const viewLabels = ['Month', 'Day', 'Staff'];

const FullCalendarComponent = ({ events, staff }) => {
  const [currentView, setCurrentView] = useState(views[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const staffPerPage = 4; // Number of staff to display per view

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

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const maxPage = Math.ceil(staff.length / staffPerPage) - 1;
      const newPage = prevPage + direction;
      if (newPage < 0) return 0;
      if (newPage > maxPage) return maxPage;
      return newPage;
    });
  };

  const startIndex = currentPage * staffPerPage;
  const endIndex = startIndex + staffPerPage;
  const currentStaff = staff.slice(startIndex, endIndex);

  const resources = currentStaff.map((staffMember, index) => ({
    id: (startIndex + index).toString(),
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

      {currentView === 'resourceTimeGridDay' && (
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button onClick={() => handlePageChange(1)} disabled={endIndex >= staff.length}>
            Next
          </Button>
        </ButtonGroup>
      )}

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
