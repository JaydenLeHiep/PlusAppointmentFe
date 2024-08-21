import React from 'react';

const CalendarEventContent = ({ eventInfo, currentView }) => {
  const {extendedProps } = eventInfo.event;

  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;
  //const staffName = extendedProps.staffName;
  const serviceName = extendedProps.service; // Access the service name from extendedProps
  const customerName = extendedProps.customerName;

  if (!startTime || !endTime) {
    return <div><span>Invalid Time</span></div>;
  }

  const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  if (currentView === 'timeGridDay') {
    return (
      <div>
        <span><strong>{timeText}</strong> {customerName}</span>
      </div>
    );
  } else if (currentView === 'resourceTimeGridDay') {
    return (
      <div>
        <span><strong>{timeText}</strong> {customerName} - {serviceName}</span>
      </div>
    );
  }

  return null;
};

export default CalendarEventContent;
