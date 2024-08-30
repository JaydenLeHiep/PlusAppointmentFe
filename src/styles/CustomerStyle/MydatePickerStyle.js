import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff', 
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#bbb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aaa',
    },
  },
  '& .MuiInputBase-input': {
    backgroundColor: '#ffffff', 
  },
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#ffffff', 
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
      backgroundColor: '#FF4C4C !important',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FF2B2B', 
      },
    },
    '&.MuiPickersDay-dayOutsideMonth': {
      color: '#B3B3B3',
    },
    '&.MuiPickersDay-today': {
      border: '2px solid #FF4C4C', 
    },
    '&:hover': {
      backgroundColor: '#FFECEC',
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
  border: selected ? '2px solid #FFC0CB' : '1px solid #ccc', 
  backgroundColor: selected ? '#FFC0CB' : '#fff',
  color: selected ? 'black' : '#000',
  minWidth: '75px',
  '&:hover': {
    backgroundColor: selected ? '#FF9AA2' : '#FFECEC', 
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  background: '#FFF8F9', 
  padding: theme.spacing(4),
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '550px',
  margin: 'auto',
  border: '2px solid #FFD7D7', 
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
  backgroundColor: '#8c8c8c', 
  '&:hover': {
    backgroundColor: '#514e4c', 
  },

  '&:disabled': {
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF', 
    boxShadow: 'none', 
  },
}));