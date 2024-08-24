import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row', // Ensure row direction on mobile as well
    alignItems: 'center', // Center items vertically
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: 0, // Remove bottom margin on mobile
    width: 'auto', // Keep auto width for buttons
    padding: theme.spacing(1.5, 2), // Adjust padding for smaller screens
  },
}));

export const StyledTextFieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    marginTop: 0, // Remove top margin on mobile
    width: 'auto', // Keep auto width for search bar
    justifyContent: 'center', // Keep centered
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
    height: '44px', // Reduce height for mobile
    paddingRight: theme.spacing(1), 
    paddingLeft: theme.spacing(1), 
  },
  '& .MuiInputBase-input': {
    textAlign: 'left',
  },
  width: '100%', // Full width for search bar on mobile
  maxWidth: '300px', // Restrict max-width for better fit
  [theme.breakpoints.down('sm')]: {
    marginTop: 0, // Remove top margin on mobile
    width: 'auto', // Keep auto width
  },
}));