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
  NoSlotsMessage,
  ConfirmButton,
  SelectedTimeMessage,
} from '../../../styles/CustomerStyle/MydatePickerStyle';

const MyDatePicker = ({ staffId, selectedDate, onDateChange, selectedTime, onTimeSelect, onConfirmTime }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);
  const [confirmedTime, setConfirmedTime] = React.useState(null);

  React.useEffect(() => {
    if (staffId && selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
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

  // Separate AM and PM time slots, treating them as plain times without timezone conversion
  const amTimeSlots = availableTimeSlots.filter(time => new Date(time).getUTCHours() < 12);
  const pmTimeSlots = availableTimeSlots.filter(time => new Date(time).getUTCHours() >= 12);

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
            <SectionTitle variant="body1">
              Morning
            </SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {amTimeSlots.length === 0 ? (
                <NoSlotsMessage variant="body1">
                  No available AM time slots
                </NoSlotsMessage>
              ) : (
                amTimeSlots.map((time) => (
                  <Grid item key={time}>
                    <TimeSlotButton
                      onClick={() => handleTimeChangeWrapper(time)}
                      selected={time === selectedTime}
                    >
                      {new Date(time).toISOString().substring(11, 16)} {/* HH:mm format */}
                    </TimeSlotButton>
                  </Grid>
                ))
              )}
            </TimeSlotsGrid>

            <SectionTitle variant="body1">
              Afternoon
            </SectionTitle>
            <TimeSlotsGrid container justifyContent="center">
              {pmTimeSlots.length === 0 ? (
                <NoSlotsMessage variant="body1">
                  No available PM time slots
                </NoSlotsMessage>
              ) : (
                pmTimeSlots.map((time) => (
                  <Grid item key={time}>
                    <TimeSlotButton
                      onClick={() => handleTimeChangeWrapper(time)}
                      selected={time === selectedTime}
                    >
                      {new Date(time).toISOString().substring(11, 16)} {/* HH:mm format */}
                    </TimeSlotButton>
                  </Grid>
                ))
              )}
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
            Selected Time: {confirmedTime.toISOString().substring(11, 16)}
          </SelectedTimeMessage>
        )}
      </StyledBox>
    </LocalizationProvider>
  );
};

export default MyDatePicker;