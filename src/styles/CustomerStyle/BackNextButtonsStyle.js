import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
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
    marginBottom: theme.spacing(2),
  },
}));

export const StyledTextFieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
    height: '54px', // Larger height for the search bar
    paddingRight: theme.spacing(4), 
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px', 
    textAlign: 'center', 
  },
  width: '400px', 
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));