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
import { useNotAvailableDateContext } from '../../context/NotAvailableDateContext';
import { useNotAvailableTimeContext } from '../../context/NotAvailableTimeContext';

const MyDatePicker = ({ businessId, staffId, selectedDate, onDateChange, selectedTime, onTimeSelect, onConfirmTime, totalDuration, openingHours }) => {
  const { t } = useTranslation('myDatePicker');
  const [notAvailableTimeSlots, setNotAvailableTimeSlots] = useState([]);
  const { notAvailableDates, fetchAllNotAvailableDatesByStaff } = useNotAvailableDateContext();
  const { fetchAllNotAvailableTimesByStaff, notAvailableTimes } = useNotAvailableTimeContext();

  useEffect(() => {
    if (staffId && selectedDate) {
      fetchAllNotAvailableTimesByStaff(businessId, staffId);
    }
  }, [businessId, staffId, selectedDate, fetchAllNotAvailableTimesByStaff]);

  useEffect(() => {
    if (staffId) {
      fetchAllNotAvailableDatesByStaff(businessId, staffId);
    }
  }, [businessId, staffId, fetchAllNotAvailableDatesByStaff]);


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
    if (!selectedDate || !openingHours) return [];

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

  // Function to get the opening and closing times for the selected day
  const getOpeningAndClosingTimes = () => {
    if (!selectedDate || !openingHours) return { openingTime: null, closingTime: null };

    const dayOfWeek = selectedDate.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    switch (dayOfWeek) {
      case 0:
        return { openingTime: openingHours.sundayOpeningTime, closingTime: openingHours.sundayClosingTime };
      case 1:
        return { openingTime: openingHours.mondayOpeningTime, closingTime: openingHours.mondayClosingTime };
      case 2:
        return { openingTime: openingHours.tuesdayOpeningTime, closingTime: openingHours.tuesdayClosingTime };
      case 3:
        return { openingTime: openingHours.wednesdayOpeningTime, closingTime: openingHours.wednesdayClosingTime };
      case 4:
        return { openingTime: openingHours.thursdayOpeningTime, closingTime: openingHours.thursdayClosingTime };
      case 5:
        return { openingTime: openingHours.fridayOpeningTime, closingTime: openingHours.fridayClosingTime };
      case 6:
        return { openingTime: openingHours.saturdayOpeningTime, closingTime: openingHours.saturdayClosingTime };
      default:
        return { openingTime: null, closingTime: null };
    }
  };

  // Retrieve the opening and closing times for the selected day
  const { openingTime, closingTime } = getOpeningAndClosingTimes();

  // Convert openingTime and closingTime to hours
  const openingHour = openingTime ? parseInt(openingTime.split(':')[0], 10) : 0;
  const closingHour = closingTime ? parseInt(closingTime.split(':')[0], 10) : 0;

  // Generate time slots for AM and PM based on the opening and closing times
  const amTimeSlots = generateAllTimeSlots(openingHour, Math.min(12, closingHour));
  const pmTimeSlots = generateAllTimeSlots(Math.max(12, openingHour), closingHour);

  const isWithinNextThreeHours = (timeSlot) => {
    const now = moment();
    const slotMoment = moment(timeSlot);
    // Check if the slot is on today's date and within the next 3 hours
    return selectedDate.isSame(now, 'day') && slotMoment.isBetween(now, now.clone().add(openingHours.minimumAdvanceBookingHours / 60, 'hours'));
  };

  // Determine if a time slot is available
  const isNotAvailableTimeSlot = (timeSlot) => {
    const now = moment();
    const slotMoment = moment(timeSlot);

    // Check if the time slot is within the next 3 hours
    if (isWithinNextThreeHours(timeSlot)) return true;

    // Check if the slot is today and before the current time
    if (selectedDate.isSame(now, 'day') && slotMoment.isBefore(now)) return true;

    return notAvailableTimes.some(({ from, to }) => {
      const fromTime = moment(from);
      const toTime = moment(to);
      return slotMoment.isBetween(fromTime, toTime, null, '[)');
    });
  };

  // Check if the selected time slot is valid considering the total duration
  const isValidTimeSlot = (timeSlot) => {
    const slotMoment = moment(timeSlot);
    const slotEnd = slotMoment.clone().add(totalDuration, 'minutes');

    // Check if the time slot is within the next 3 hours
    if (isWithinNextThreeHours(timeSlot)) return false;

    // Check if the end of the slot overlaps with any "not available" times
    return !notAvailableTimeSlots.some(notAvailableSlot => {
      const notAvailableStart = moment(notAvailableSlot);
      const notAvailableEnd = notAvailableStart.clone().add(15, 'minutes');

      // Return true if there is any overlap
      return slotEnd.isAfter(notAvailableStart) && slotMoment.isBefore(notAvailableEnd);
    });
  };

  // Disable dates that are not available based on intervals
  const shouldDisableDate = (date) => {
    const isInUnavailableRange = notAvailableDates.some(({ startDate, endDate }) => {
      const start = moment(startDate);
      const end = moment(endDate);
      return date.isBetween(start, end, null, '[]'); // Inclusive of start and end date
    });

    return isInUnavailableRange; // Disable Sundays and dates within unavailable intervals
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
          shouldDisableDate={shouldDisableDate}
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
            {/* Check if there are any morning slots to display */}
            {amTimeSlots.length > 0 && (
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
                          {time.substring(11, 16)} {/* Display time in HH:mm format */}
                        </TimeSlotButton>
                      </Grid>
                    );
                  })}
                </TimeSlotsGrid>
              </>
            )}
            {/* Check if there are any afternoon slots to display */}
            {pmTimeSlots.length > 0 && (
              <>
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
                          {time.substring(11, 16)} {/* Display time in HH:mm format */}
                        </TimeSlotButton>
                      </Grid>
                    );
                  })}
                </TimeSlotsGrid>
              </>
            )}
            {/* In case there are no time slots available at all */}
            {amTimeSlots.length === 0 && pmTimeSlots.length === 0 && (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '1rem' }}>
                {t('noAvailableTimeSlots')}
              </Typography>
            )}
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