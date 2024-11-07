import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import { useNotAvailableTimeContext } from '../../../context/NotAvailableTimeContext';

const FullCalendarWrapper = ({
  currentView,
  events,
  resources,
  handleDateClick,
  handleEventClick,
  renderEventContent,
  renderDayCell,
  afterUpdate,
}) => {
  const calendarRef = useRef(null);
  const { updateAppointmentAndRefresh } = useAppointmentsContext();
  const { updateNotAvailableTime } = useNotAvailableTimeContext();

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView);
    }
  }, [currentView]);

  const handleEventDrop = async (info) => {
    const { event, revert } = info;
    const utcStartTime = new Date(event.start).toISOString();
    const utcEndTime = new Date(event.end).toISOString();
    const date = utcStartTime.split('T')[0];

    const currentDate = new Date();
    if (event.start < currentDate) {
      revert(); // Revert the event back to its original position
      return;
    }

    if (currentView !== 'timeGridWeek') {
      alert("Drag and drop is only allowed in the week view.");
      revert();
      return;
    }

    if (event.extendedProps.isNotAvailable) {
      const updateData = {
        ...event.extendedProps,
        date: `${date}T00:00:00.000Z`,
        from: utcStartTime,
        to: utcEndTime,
      };

      try {
        await updateNotAvailableTime(
          event.extendedProps.businessId,
          event.extendedProps.staffId,
          event.extendedProps.notAvailableTimeId,
          updateData
        );
        afterUpdate();
      } catch (error) {
        revert(); // Revert the event back on failure
      }
    } else {
      const updateData = {
        ...event.extendedProps,
        appointmentTime: utcStartTime,
      };

      try {
        await updateAppointmentAndRefresh(event.extendedProps.appointmentId, updateData, event.extendedProps.businessId);
        afterUpdate();
      } catch (error) {
        revert(); // Revert the event back on failure
      }
    }
  };

  return (
    <FullCalendar
      ref={calendarRef}
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
      initialView={currentView || 'resourceTimeGridDay'}
      events={events}
      resources={resources}
      height="auto"
      contentHeight="auto"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventContent={renderEventContent}
      dayCellContent={renderDayCell}
      businessHours={{
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: '08:00',
        endTime: '21:30',
      }}
      slotMinTime="07:00:00"
      slotMaxTime="21:30:00"
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,next today',
      }}
      views={{
        resourceTimeGridDay: {
          type: 'resourceTimeGrid',
          duration: { days: 1 },
          slotDuration: '00:10:00',
          buttonText: 'Vertical Staff',
        },
      }}
      slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false }}
      slotEventOverlap={false}
      eventOrder="start,-duration,appointmentId"
      eventBackgroundColor="transparent"
      eventBorderColor="transparent"
      editable={currentView === 'timeGridWeek'} // Enable drag-and-drop only in week view
      eventStartEditable={currentView === 'timeGridWeek'}
      eventDurationEditable={false}
      eventDrop={handleEventDrop}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
        margin: '0',
      }}
    />
  );
};

export default FullCalendarWrapper;