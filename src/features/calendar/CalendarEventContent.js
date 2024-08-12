import React from 'react';

const CalendarEventContent = ({ eventInfo, currentView }) => {
  const { title, extendedProps } = eventInfo.event;
  const { staffName } = extendedProps;
  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;

  if (!startTime || !endTime) {
    return <div><span>Invalid Time</span></div>;
  }
  
  const timeText = `${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  if (currentView === 'timeGridDay' || currentView === 'resourceTimelineDay') {
    return (
      <div>
        <span><strong>{timeText}</strong> {`${title} - ${staffName}`}</span>
      </div>
    );
  }
  
  return null;
};

export default CalendarEventContent;