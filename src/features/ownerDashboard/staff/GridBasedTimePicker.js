import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gridBoxStyle, timeSlotStyle, selectedSlotStyle, timeLabelStyle, firstClickStyle, disabledSlotStyle, containerStyle }
    from '../../../styles/OwnerStyle/StaffComPonent/GridBasedTimePickerStyles';

    const timeSlots = [
        '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
        '20:00', '20:15', '20:30', '20:45', '21:00'
    ];

const GridBasedTimePicker = ({ selectedIntervals, setSelectedIntervals, disabledTimeSlots = [] }) => {
    const [firstClick, setFirstClick] = useState(null);
    const [lastClick, setLastClick] = useState(null);

    useEffect(() => {
        if (selectedIntervals.length === 2) {
            setFirstClick(selectedIntervals[0]);
            setLastClick(selectedIntervals[1]);
        } else {
            setFirstClick(null);
            setLastClick(null);
        }
    }, [selectedIntervals]);

    const handleSlotClick = (timeSlot) => {
        if (disabledTimeSlots.includes(timeSlot)) return;
    
        // Reset on third click to begin a new interval
        if (firstClick && lastClick) {
            setFirstClick(timeSlot);
            setLastClick(null);
            setSelectedIntervals([timeSlot]);
        } else if (!firstClick) {
            // Set first click if no initial selection
            setFirstClick(timeSlot);
            setLastClick(null);
        } else {
            // Set second click for end interval and determine the range
            setLastClick(timeSlot);
    
            const startIndex = timeSlots.indexOf(firstClick);
            const endIndex = timeSlots.indexOf(timeSlot);
            const [start, end] = startIndex <= endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
    
            setSelectedIntervals([timeSlots[start], timeSlots[end]]);
        }
    };

    return (
        <Box sx={containerStyle}>
            <Box sx={gridBoxStyle}>
                {timeSlots.map((time, index) => (
                    <Box
                        key={index}
                        onClick={() => handleSlotClick(time)}
                        sx={{
                            ...timeSlotStyle,
                            ...(disabledTimeSlots.includes(time) ? disabledSlotStyle : {}),
                            ...(firstClick && lastClick && timeSlots.indexOf(time) >= timeSlots.indexOf(firstClick) && timeSlots.indexOf(time) <= timeSlots.indexOf(lastClick) ? selectedSlotStyle : {}),
                            ...(firstClick === time ? firstClickStyle : {}),
                        }}
                    >
                        <Typography sx={timeLabelStyle}>{time}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default GridBasedTimePicker;