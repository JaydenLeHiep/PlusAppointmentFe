import React from 'react';

const CalendarEventContent = ({ eventInfo, currentView }) => {
  const { extendedProps, title } = eventInfo.event;
  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;

  if (!startTime || !endTime) {
    return <div><span>Invalid Time</span></div>;
  }

  const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  // Check if the event is a "not available time" event by looking for the title "Unavailable"
  if (title === 'Unavailable') {
    return (
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        <span>{timeText} - {title}</span>
      </div>
    );
  }

  // For regular events, display in the standard format
  if (currentView === 'timeGridDay' || currentView === 'timeGridWeek' || currentView === 'resourceTimeGridDay') {
    const customerName = extendedProps.customerName;
    return (
      <div>
        <span><strong>{timeText}</strong> {customerName}</span>
      </div>
    );
  }

  return null;
};

export default CalendarEventContent;
