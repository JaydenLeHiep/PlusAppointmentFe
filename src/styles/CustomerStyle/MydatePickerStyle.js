import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff', // White background for the input field
    '& fieldset': {
      borderColor: '#ccc', // Border color of the input
    },
    '&:hover fieldset': {
      borderColor: '#bbb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aaa',
    },
  },
  '& .MuiInputBase-input': {
    backgroundColor: '#ffffff', // Ensure the input area inside is white
  },
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#ffffff', // White background for the calendar header
    color: '#555',
    '& .MuiPickersArrowSwitcher-root button': {
      color: '#555',
    },
  },
  '& .MuiPickersDay-root': {
    width: '50px',
    height: '50px',
    fontSize: '1.2rem',
    '&.Mui-selected': {
      backgroundColor: '#FF4C4C !important', // Pink color for selected days
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FF2B2B', // Slightly darker pink on hover
      },
    },
    '&.MuiPickersDay-dayOutsideMonth': {
      color: '#B3B3B3',
    },
    '&.MuiPickersDay-today': {
      border: '2px solid #FF4C4C', // Pink border for today's date
    },
    '&:hover': {
      backgroundColor: '#FFECEC', // Light pink hover effect
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

export const TimeSlotButton = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  border: selected ? '2px solid #FFC0CB' : '1px solid #ccc', // Pink border when selected
  backgroundColor: selected ? '#FFC0CB' : '#fff', // Pink background when selected
  color: selected ? 'black' : '#000',
  minWidth: '75px',
  '&:hover': {
    backgroundColor: selected ? '#FF9AA2' : '#FFECEC', // Pinker hover for selected, light pink for unselected
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #FFECEC, #ffffff)', // Very light pink gradient
  padding: theme.spacing(4),
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '550px',
  margin: 'auto',
  border: '2px solid #FFD7D7', // Subtle pink border
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  color: 'black',
}));

export const TimeSlotsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ConfirmButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontWeight: 'bold',
  boxShadow: 'none',
  backgroundColor: '#7b7d7b', // Updated pink background for the confirm button
  '&:hover': {
    backgroundColor: '#514e4c', // Slightly darker pink on hover
  },

  '&:disabled': {
    backgroundColor: '#CCCCCC', // A lighter, muted pink for the disabled state
    color: '#FFFFFF', // White text remains for consistency
    boxShadow: 'none', // No shadow for disabled button
  },
}));