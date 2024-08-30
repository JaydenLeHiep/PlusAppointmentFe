import React, { useState, useEffect } from 'react';
import { fetchNotAvailableTimeSlots } from '../../lib/apiClientAppointment'; 
import moment from 'moment-timezone';
import {
  StyledDatePicker,
  TimeSlotButton,
  StyledBox,
  SectionTitle,
  TimeSlotsGrid,
  ConfirmButton,
} from '../../styles/CustomerStyle/MydatePickerStyle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MyDatePicker = ({ staffId, selectedDate, onDateChange, selectedTime, onTimeSelect, onConfirmTime, totalDuration }) => {
  const { t } = useTranslation('myDatePicker');
  const [notAvailableTimeSlots, setNotAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (staffId && selectedDate) {
      const fetchSlots = async () => {
        try {
          const formattedDate = selectedDate.format('YYYY-MM-DD'); 
          const slots = await fetchNotAvailableTimeSlots(staffId, formattedDate);
          if (Array.isArray(slots)) {
            const localNotAvailableTimeSlots = slots.map(slot => moment.utc(slot).tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm:ss'));
            setNotAvailableTimeSlots(localNotAvailableTimeSlots);
          } else {
            setNotAvailableTimeSlots([]);
          }
        } catch (error) {
          console.error('Failed to fetch not available time slots:', error);
          setNotAvailableTimeSlots([]);
        }
      };

      fetchSlots();
    }
  }, [staffId, selectedDate]);

  const handleConfirmTime = () => {
    onConfirmTime(selectedTime);
  };

  const handleDateChangeWrapper = (date) => {
    onDateChange(date);
  };

  const handleTimeChangeWrapper = (time) => {
    onTimeSelect(time);
  };

  // Function to generate all possible time slots within a range of hours
  const generateAllTimeSlots = (startHour, endHour) => {
    if (!selectedDate) return [];

    const slots = [];
    const startTime = selectedDate.clone().set({ hour: startHour, minute: 0, second: 0 });
    const endTime = selectedDate.clone().set({ hour: endHour, minute: 0, second: 0 });

    while (startTime.isBefore(endTime)) {
      const slot = startTime.clone().format('YYYY-MM-DDTHH:mm:ss');
      slots.push(slot);
      startTime.add(15, 'minutes');
    }

    return slots;
  };

  // Generate morning and afternoon time slots
  const amTimeSlots = generateAllTimeSlots(8, 12);
  const pmTimeSlots = generateAllTimeSlots(12, 20);

  // Determine if a time slot is available
  const isNotAvailableTimeSlot = (timeSlot) => {
    return notAvailableTimeSlots.includes(timeSlot);
  };

  // Check if the selected time slot is valid considering the total duration
  const isValidTimeSlot = (timeSlot) => {
    const slotMoment = moment(timeSlot);
    const slotEnd = slotMoment.clone().add(totalDuration, 'minutes');

    // Check if the end of the slot overlaps with any "not available" times
    return !notAvailableTimeSlots.some(notAvailableSlot => {
      const notAvailableStart = moment(notAvailableSlot);
      const notAvailableEnd = notAvailableStart.clone().add(15, 'minutes');

      // Return true if there is any overlap
      return slotEnd.isAfter(notAvailableStart) && slotMoment.isBefore(notAvailableEnd);
    });
  };

  // Disable Sundays
  const shouldDisableDate = (date) => {
    return date.day() === 0; // 0 corresponds to Sunday in moment.js
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StyledBox>
        <StyledDatePicker
          value={selectedDate}
          onChange={handleDateChangeWrapper}
          textField={(params) => (
            <TextField {...params} fullWidth sx={{ fontSize: '1.3rem' }} />
          )}
          disablePast
          shouldDisableDate={shouldDisableDate} // Disable Sundays
        />

        {selectedDate && (
          <Box mt={2} textAlign="center">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
              }}
            >
              {t('selectTimeLabel')}
            </Typography>
          </Box>
        )}

        {selectedDate && (
          <>
            <SectionTitle variant="body1">{t('morningSectionLabel')}</SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {amTimeSlots.map((time) => {
                const isAvailable = !isNotAvailableTimeSlot(time) && isValidTimeSlot(time);
                return (
                  <Grid item key={time}>
                    <TimeSlotButton
                      onClick={isAvailable ? () => handleTimeChangeWrapper(time) : null}
                      selected={time === selectedTime}
                      disabled={!isAvailable}
                    >
                      {time.substring(11, 16)} {/* HH:mm format */}
                    </TimeSlotButton>
                  </Grid>
                );
              })}
            </TimeSlotsGrid>

            <SectionTitle variant="body1">{t('afternoonSectionLabel')}</SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {pmTimeSlots.map((time) => {
                const isAvailable = !isNotAvailableTimeSlot(time) && isValidTimeSlot(time);
                return (
                  <Grid item key={time}>
                    <TimeSlotButton
                      onClick={isAvailable ? () => handleTimeChangeWrapper(time) : null}
                      selected={time === selectedTime}
                      disabled={!isAvailable}
                    >
                      {time.substring(11, 16)} {/* HH:mm format */}
                    </TimeSlotButton>
                  </Grid>
                );
              })}
            </TimeSlotsGrid>

            <ConfirmButton
              variant="contained"
              color="primary"
              onClick={handleConfirmTime}
              disabled={!selectedTime}
            >
              {t('confirmButtonLabel')}
            </ConfirmButton>
          </>
        )}
      </StyledBox>
    </LocalizationProvider>
  );
};

export default MyDatePicker;