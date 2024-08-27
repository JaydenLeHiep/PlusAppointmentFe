import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
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

export const TimeSlotButton = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid #ccc',
  backgroundColor: selected ? theme.palette.primary.main : '#fff',
  color: selected ? '#fff' : '#000',
  minWidth: '75px',
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : '#f0f8ff',
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
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

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  color: '#555',
}));

export const TimeSlotsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ConfirmButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontWeight: 'bold',
}));
