import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchAvailableTimeSlots } from '../../../lib/apiClientAppointment';

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#4A90E2',
    color: '#fff',
    '& .MuiPickersArrowSwitcher-root button': {
      color: '#fff',
    },
  },
  '& .MuiPickersDay-root': {
    width: '50px',
    height: '50px',
    fontSize: '1.2rem',
    '&.Mui-selected': {
      backgroundColor: '#4A90E2',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#357ABD',
      },
    },
    '&.MuiPickersDay-dayOutsideMonth': {
      color: '#B3B3B3',
    },
    '&.MuiPickersDay-today': {
      border: '2px solid #4A90E2',
    },
    '&:hover': {
      backgroundColor: '#E5F1FB',
    },
  },
  '& .MuiPickersCalendarHeader-switchHeader': {
    '& .MuiTypography-root': {
      fontSize: '1.3rem',
      fontWeight: 'bold',
    },
  },
  '& .MuiPickersArrowSwitcher-root': {
    fontSize: '2rem',
  },
}));

const TimeSlotButton = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  border: selected ? '2px solid #4A90E2' : '1px solid #ccc',
  backgroundColor: selected ? '#4A90E2' : '#fff',
  color: selected ? '#fff' : '#000',
  minWidth: '75px',
  '&:hover': {
    backgroundColor: selected ? '#357ABD' : '#f0f8ff',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
  padding: theme.spacing(4),
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '550px',
  margin: 'auto',
  border: '2px solid #e0e0e0',
}));

const MyDatePicker = ({ staffId, selectedDate, onDateChange, selectedTime, onTimeSelect, onConfirmTime }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);
  const [confirmedTime, setConfirmedTime] = React.useState(null);

  React.useEffect(() => {
    if (staffId && selectedDate) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');

      console.log("Sending request with staffId:", staffId);
      console.log("Sending request with formattedDate:", formattedDate);

      const fetchTimeSlots = async () => {
        try {
          const slots = await fetchAvailableTimeSlots(staffId, formattedDate);
          console.log("Fetched time slots:", slots);

          if (Array.isArray(slots)) {
            setAvailableTimeSlots(slots);
          } else {
            setAvailableTimeSlots([]); // Handle cases where the data is not an array
          }
        } catch (error) {
          console.error('Failed to fetch available time slots:', error);
          setAvailableTimeSlots([]); // Fallback to an empty array
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
    setConfirmedTime(null); // Reset confirmed time if the date is changed
  };

  const handleTimeChangeWrapper = (time) => {
    onTimeSelect(time);
    setConfirmedTime(null); // Reset confirmed time if the time is changed
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
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.2rem'
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.2rem'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem'
            }
          }}
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
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', color: '#555' }}>
              Available Time Slots
            </Typography>
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
              {availableTimeSlots.length === 0 ? (
                <Typography variant="body1" sx={{ marginTop: 2, color: '#f44336' }}>
                  No available time slots
                </Typography>
              ) : (
                availableTimeSlots.map((time) => (
                  <Grid item key={time}>
                    <TimeSlotButton
                      onClick={() => handleTimeChangeWrapper(time)}
                      selected={time === selectedTime}
                    >
                      {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TimeSlotButton>
                  </Grid>
                ))
              )}
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmTime}
              sx={{ marginTop: 4, fontWeight: 'bold' }}
              disabled={!selectedTime}
            >
              Confirm Time
            </Button>
          </>
        )}

        {confirmedTime && (
          <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold', color: '#4A90E2' }}>
            Selected Time: {new Date(confirmedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        )}
      </StyledBox>
    </LocalizationProvider>
  );
};

export default MyDatePicker;