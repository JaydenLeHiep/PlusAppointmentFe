import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

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
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]} // Removed resourceTimelinePlugin
      initialView={currentView || 'resourceTimeGridDay'}  // Default to 'resourceTimeGridDay'
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
      slotMinTime="07:00:00"
      slotMaxTime="21:00:00"
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,next today',
      }}
      views={{
        resourceTimeGridDay: {  // Vertical resource view configuration
          type: 'resourceTimeGrid',
          duration: { days: 1 },
          slotDuration: '00:15:00',
          buttonText: 'Vertical Staff',
        }
      }}
      slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false }}
    />
  );
};

export default FullCalendarWrapper;
