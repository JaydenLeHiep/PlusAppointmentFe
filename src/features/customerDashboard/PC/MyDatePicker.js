import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { fetchAvailableTimeSlots } from '../../../lib/apiClientAppointment';
import {
  StyledDatePicker,
  TimeSlotButton,
  StyledBox,
  SectionTitle,
  TimeSlotsGrid,
  ConfirmButton,
  SelectedTimeMessage,
} from '../../../styles/CustomerStyle/MydatePickerStyle';

const MyDatePicker = ({ staffId, selectedDate, onDateChange, selectedTime, onTimeSelect, onConfirmTime }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);
  const [confirmedTime, setConfirmedTime] = React.useState(null);

  React.useEffect(() => {
    if (staffId && selectedDate) {
      const formattedDate = selectedDate.format('YYYY-MM-DD'); 

      const fetchTimeSlots = async () => {
        try {
          const slots = await fetchAvailableTimeSlots(staffId, formattedDate);
          if (Array.isArray(slots)) {
            setAvailableTimeSlots(slots);
          } else {
            setAvailableTimeSlots([]);
          }
        } catch (error) {
          console.error('Failed to fetch available time slots:', error);
          setAvailableTimeSlots([]);
        }
      };

      fetchTimeSlots();
    }
  }, [staffId, selectedDate]);

  const handleConfirmTime = () => {
    setConfirmedTime(selectedTime);
    onConfirmTime();
  };

  const handleDateChangeWrapper = (date) => {
    onDateChange(date);
    setConfirmedTime(null);
  };

  const handleTimeChangeWrapper = (time) => {
    onTimeSelect(time);
    setConfirmedTime(null);
  };

  // Function to generate all possible time slots within a range of hours
  const generateAllTimeSlots = (startHour, endHour) => {
    if (!selectedDate) return []; // Add guard clause

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

  // Normalize format of availableTimeSlots to match the generated slots
  const normalizedAvailableTimeSlots = availableTimeSlots.map(slot =>
    new Date(slot).toISOString().substring(0, 19)
  );

  const isAvailableTimeSlot = (timeSlot) => {
    return normalizedAvailableTimeSlots.includes(timeSlot);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StyledBox>
        <StyledDatePicker
          value={selectedDate}
          onChange={handleDateChangeWrapper}
          textField={(params) => (
            <TextField {...params} fullWidth sx={{ fontSize: '1.2rem' }} />
          )}
          disablePast
        />

        {selectedDate && (
          <Box mt={2} textAlign="center">
            {confirmedTime ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTimeChangeWrapper(null)}
                sx={{ fontWeight: 'bold' }}
              >
                Choose Time Again
              </Button>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  alignSelf: 'center',
                }}
              >
                Select a Time
              </Typography>
            )}
          </Box>
        )}

        {selectedDate && !confirmedTime && (
          <>
            <SectionTitle variant="body1">Morning</SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {amTimeSlots.map((time) => {
                const isAvailable = isAvailableTimeSlot(time);
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

            <SectionTitle variant="body1">Afternoon</SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {pmTimeSlots.map((time) => {
                const isAvailable = isAvailableTimeSlot(time);
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
              Confirm Time
            </ConfirmButton>
          </>
        )}

        {confirmedTime && (
          <SelectedTimeMessage variant="h6">
            Selected Time: {confirmedTime.substring(11, 16)}
          </SelectedTimeMessage>
        )}
      </StyledBox>
    </LocalizationProvider>
  );
};

export default MyDatePicker;