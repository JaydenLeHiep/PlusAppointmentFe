import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal';
import CalendarViewControls from './CalendarViewControlls';
import CalendarDayCell from './CalendarDayCell';
import FullCalendarWrapper from './FullCalendarWrapper';
import { useTranslation } from 'react-i18next';

// Commented out 'timeGridDay' view
const views = ['dayGridMonth', /* 'timeGridDay', */ 'timeGridWeek', 'resourceTimeGridDay'];

const FullCalendarComponent = ({ events, staff, services, notAvailableDates, notAvailableTimes }) => {
  const { t } = useTranslation('fullCalendarComponent');
  const [currentView, setCurrentView] = useState(views[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const staffPerPage = 4;

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.date).getTime();
    const isUnavailable = notAvailableDates.some(date => {
      const start = new Date(date.start).getTime();
      const end = new Date(date.end).getTime();
      return clickedDate >= start && clickedDate <= end;
    });
    if (isUnavailable) {
      console.log('Date is unavailable');
      return;
    }
    const calendarApi = info.view.calendar;
    calendarApi.gotoDate(info.date);
  };

  const handleEventClick = (clickInfo) => {
    const { isNotAvailable } = clickInfo.event.extendedProps;
    if (isNotAvailable) {
      return;
    }

    const eventProps = clickInfo.event.extendedProps;
    if (eventProps.start && !isNaN(new Date(eventProps.start))) {
      eventProps.start = new Date(eventProps.start).toISOString();
    }
    if (eventProps.end && !isNaN(new Date(eventProps.end))) {
      eventProps.end = new Date(eventProps.end).toISOString();
    }
    setSelectedAppointment(eventProps);
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
    setSelectedAppointment(null);
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

  // Logic for appointment events
  const appointmentEvents = currentView === 'resourceTimeGridDay'
    ? events.map(event => {
      const resource = resources.find(res => res.title === event.staffName);
      return {
        ...event,
        resourceIds: [resource?.id],
      };
    })
    : currentView === 'timeGridWeek'
      ? events.reduce((acc, event) => {
        const existingEvent = acc.find(e => e.appointmentId === event.appointmentId);
        if (existingEvent) {
          existingEvent.end = new Date(Math.max(new Date(existingEvent.end), new Date(event.end))).toISOString();
        } else {
          acc.push({ ...event, resourceIds: [] });
        }
        return acc;
      }, [])
      : events;

  // Logic for not available dates
  const notAvailableEvents = currentView === 'resourceTimeGridDay'
    ? notAvailableDates.map(date => {
      const resource = resources.find(res => res.title === date.staffName);
      if (!resource) return null;
      return {
        start: new Date(date.start).toISOString(),
        end: date.end ? new Date(date.end).toISOString() : new Date(new Date(date.start).setHours(new Date(date.start).getHours() + 1)).toISOString(),
        resourceIds: [resource.id],
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        display: 'auto',
        isNotAvailable: true, // Indicate that this is a "not available" event
        title: date.title || 'Unavailable', // Display the title
      };
    }).filter(event => event !== null)
    : [];

  // Logic for not available times
  const notAvailableTimeEvents = (currentView === 'resourceTimeGridDay' || currentView === 'timeGridWeek')
    ? notAvailableTimes.map(time => {
      const resource = currentView === 'resourceTimeGridDay' ? resources.find(res => res.title === time.staffName) : null;
      const event = {
        start: new Date(time.start).toISOString(),
        end: new Date(time.end).toISOString(),
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        display: 'auto',
        isNotAvailable: true,
        title: time.title || 'Unavailable',
      };
      if (resource) {
        event.resourceIds = [resource.id];
      }
      return event;
    }).filter(event => event !== null)
    : [];

  // Render Event Content Logic
  const renderEventContent = (eventInfo) => {
    if (eventInfo.event.extendedProps.isNotAvailable) {
      return (
        <div style={{
          fontSize: '14px',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px',
          borderRadius: '4px',
        }}>
          {eventInfo.event.title}
        </div>
      );
    }
    // Check if current view is the week, day, or month view
    const isWeekView = eventInfo.view.type === 'timeGridWeek';
    const isDayView = eventInfo.view.type === 'resourceTimeGridDay';
    const isMonthView = eventInfo.view.type === 'dayGridMonth';
    const { customerName } = eventInfo.event.extendedProps;

    if (isWeekView) {
      // Customized layout for the week view with 75%/25% split and color blocks
      const colors = eventInfo.event.extendedProps.categoryColors || [];
      const rowHeight = colors.length ? `${100 / colors.length}%` : '100%';

      return (
        <Box sx={{ 
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        borderRadius: '3px', // Rounded corners
        overflow: 'hidden', // Ensures corners apply to internal elements
        backgroundColor: '#f0f8ff', // Wrapper background color
        border: '1px solid lightgray', // Wrapper border
      }}>
          {/* 75% Column for Event Title with very light blue background and black text */}
          <Box sx={{
            width: '70%',
            backgroundColor: '#f0f8ff',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
          }}>
            <span>{customerName}</span>
          </Box>

          {/* 25% Column for Color Rows */}
          <Box sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch',
            borderLeft: '1px solid lightgray',
          }}>
            {colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  height: rowHeight,
                  backgroundColor: color,
                  borderBottom: index < colors.length - 1 ? '1px solid lightgray' : 'none',
                }}
              />
            ))}
          </Box>
        </Box>
      );
    } else if (isDayView) {
      return (
        <Box sx={{
          backgroundColor: '#1e90ff', // Blue background
          color: 'white', // White text color
          padding: '4px',
          borderRadius: '4px',
          fontSize: '14px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <span>{eventInfo.event.title}</span>
        </Box>
      );
    } else if (isMonthView) {
      // No content rendered for the month view
      return null;
    }
    return null;
  };

  // Custom eventOverlap function
  const eventOverlap = (stillEvent, movingEvent) => {
    if (stillEvent.extendedProps.isNotAvailable && movingEvent.display !== 'background') {
      return false; // Prevent appointments from overlapping with unavailable times
    }
    return true;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CalendarViewControls
        currentView={currentView}
        views={views}
        viewLabels={[t('viewLabels.month'), t('viewLabels.week'), t('viewLabels.staff')]}
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
        events={
          currentView === 'resourceTimeGridDay' || currentView === 'timeGridWeek'
            ? [...appointmentEvents, ...notAvailableEvents, ...notAvailableTimeEvents]
            : appointmentEvents
        }
        resources={currentView === 'resourceTimeGridDay' ? resources : []}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
        renderEventContent={renderEventContent}
        renderDayCell={(dayCellInfo) => <CalendarDayCell dayCellInfo={dayCellInfo} events={events} currentView={currentView} />}
        eventOverlap={eventOverlap}
      />

      {selectedAppointment && selectedAppointment.display !== 'background' && (
        <AppointmentInfoModal
          open={isModalOpen}
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          staff={staff}
          services={services}
        />
      )}
    </Box>
  );
};

export default FullCalendarComponent;
