import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gridBoxStyle, timeSlotStyle, selectedSlotStyle, timeLabelStyle, firstClickStyle, disabledSlotStyle, containerStyle }
    from '../../../styles/OwnerStyle/StaffComPonent/GridBasedTimePickerStyles';

    const timeSlots = [
        '08:00', '08:10', '08:20', '08:30', '08:40', '08:50',
        '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
        '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
        '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
        '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
        '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
        '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
        '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
        '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
        '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
        '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
        '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
        '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
        '21:00'
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