import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const FullCalendarWrapper = ({ currentView, events, resources, handleDateClick, handleEventClick, renderEventContent, renderDayCell }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView);
    }
  }, [currentView]);

  return (
    <FullCalendar
      ref={calendarRef}
      schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
      initialView={currentView}
      events={events}
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
  );
};

export default FullCalendarWrapper;