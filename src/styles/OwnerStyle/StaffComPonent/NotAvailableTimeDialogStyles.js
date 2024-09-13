import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const dialogTitleStyle = {
  fontWeight: '550',
  fontSize: '1.75rem',
  color: '#1a1a1a',
  textAlign: 'center',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '3px',
};

export const closeIconButtonStyle = {
  color: '#808080',
  fontSize: '1.5rem',
};

export const alertStyle = {
  mt: 2,
};

export const addNewDateTypographyStyle = {
  cursor: 'pointer',
  textDecoration: 'underline',
  color: '#1976d2',
  '&:hover': {
    color: '#115293',
  },
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

export const listItemStyle = {
  borderRadius: '8px',
  backgroundColor: '#f0f8ff',
  mb: 2,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiTypography-body2': {
    display: 'block',
  },
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
};

export const iconButtonStyle = {
  padding: '4px',
  marginRight: '8px',
};

export const editButtonStyle = {
  ...iconButtonStyle,
};

export const deleteButtonStyle = {
  padding: '4px',
};

export const buttonStyle = {
  padding: '8px 16px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100px',
  height: '40px',
  boxSizing: 'border-box',
};

export const addOrUpdateButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745',
};

export const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6c757d',
};

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

// Added new style rules
export const gridBasedTimePickerWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const gridBasedTimePickerContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '16px',
  marginBottom: '16px',
};

export const addButtonContainerStyle = {
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'center',
};

export const formActionButtonsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '16px',
  marginBottom: '16px',
};