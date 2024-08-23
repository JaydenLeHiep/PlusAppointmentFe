import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// CustomButton styling
export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginBottom: theme.spacing(4),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    backgroundColor: theme.palette.primary.darker,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)',
  },
}));

// Typography styling for the form title
export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
  fontSize: '24px',
  textAlign: 'center',
}));

// Inner form container styling
export const InnerFormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  margin: 'auto',
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));