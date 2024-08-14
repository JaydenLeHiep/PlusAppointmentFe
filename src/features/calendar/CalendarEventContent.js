import React from 'react';

const CalendarEventContent = ({ eventInfo, currentView }) => {
  const { title} = eventInfo.event;
  
  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;

  if (!startTime || !endTime) {
    return <div><span>Invalid Time</span></div>;
  }
  
  const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  if (currentView === 'timeGridDay' || currentView === 'resourceTimeGridDay') {
    return (
      <div>
        <span><strong>{timeText}</strong> {`${title}`}</span>
      </div>
    );
  }
  
  return null;
};

export default CalendarEventContent;