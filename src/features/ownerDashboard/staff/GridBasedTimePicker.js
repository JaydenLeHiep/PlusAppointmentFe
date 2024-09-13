import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gridBoxStyle, timeSlotStyle, selectedSlotStyle, timeLabelStyle, firstClickStyle, disabledSlotStyle, containerStyle } 
from '../../../styles/OwnerStyle/StaffComPonent/GridBasedTimePickerStyles';

const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
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

        if (!firstClick) {
            setFirstClick(timeSlot);
            setLastClick(null);
        } else {
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