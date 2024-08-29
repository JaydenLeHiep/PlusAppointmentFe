import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px', // Limit the width to match the content container's max-width
  height: '60px', // Increased height for PC
  margin: '0 auto', // Center the button container within the content
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    height: '50px', // Default height for mobile
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.3, 4), // Default padding for PC
  fontSize: '1rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
  backgroundColor: '#8c8c8c', // A vibrant, more saturated pink for the active state
  color: '#FFFFFF', // White text for contrast

  '&:hover': {
    backgroundColor: '#514e4c', // A darker pink for the hover state
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // A larger shadow for hover
  },

  '&:disabled': {
    backgroundColor: '#CCCCCC', // A lighter, muted pink for the disabled state
    color: '#FFFFFF', // White text remains for consistency
    boxShadow: 'none', // No shadow for disabled button
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.8),
    fontSize: '0.875rem',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledTextFieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    width: 'auto',
    justifyContent: 'center',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
    height: '50px', 
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    textAlign: 'left',
  },
  width: '80%',
  maxWidth: '350px',
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      height: '40px',
    },
    maxWidth: '200px', 
  },
}));