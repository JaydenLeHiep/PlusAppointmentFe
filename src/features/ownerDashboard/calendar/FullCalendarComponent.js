import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal';
import CalendarViewControls from './CalendarViewControlls';
import CalendarEventContent from './CalendarEventContent';
import CalendarDayCell from './CalendarDayCell';
import FullCalendarWrapper from './FullCalendarWrapper';
import { useTranslation } from 'react-i18next';

const views = ['dayGridMonth', 'timeGridDay', 'resourceTimeGridDay'];

const FullCalendarComponent = ({ events, staff, services }) => {
  const { t } = useTranslation('fullCalendarComponent');
  const [currentView, setCurrentView] = useState(views[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const staffPerPage = 4; // Number of staff to display per view

  const handleDateClick = () => {
    setCurrentView('timeGridDay');
  };

  const handleEventClick = (clickInfo) => {
    const appointmentData = clickInfo.event.extendedProps; // Get all the event data
    console.log(appointmentData)
    setSelectedAppointment(appointmentData); // Store the appointment data
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
    setSelectedAppointment(null); // Clear the selected appointment
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

  const updatedEvents = currentView === 'resourceTimeGridDay'
    ? events.map(event => {
      const resource = resources.find(res => res.title === event.staffName);
      return {
        ...event,
        resourceIds: [resource?.id],
      };
    })
    : events.reduce((acc, event) => {
      const existingEvent = acc.find(e => e.appointmentId === event.appointmentId);
      if (existingEvent && currentView === 'timeGridDay') {
        existingEvent.end = new Date(Math.max(new Date(existingEvent.end), new Date(event.end))).toISOString();
      } else {
        acc.push({ ...event, resourceIds: [] });
      }
      return acc;
    }, []);

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
        viewLabels={[t('viewLabels.month'), t('viewLabels.day'), t('viewLabels.staff')]} // Using translations for labels
        onPrevClick={() => handleViewChange(-1)}
        onNextClick={() => handleViewChange(1)}
      />

      {currentView === 'resourceTimeGridDay' && (
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
            {t('buttons.previous')}
          </Button>
          <Button onClick={() => handlePageChange(1)} disabled={endIndex >= staff.length}>
            {t('buttons.next')}
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
      {selectedAppointment && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointment={selectedAppointment} // Pass the full appointment data
          onClose={handleCloseModal}
          staff={staff}
          services={services}
        />
      )}
    </Box>
  );
};

export default FullCalendarComponent;
