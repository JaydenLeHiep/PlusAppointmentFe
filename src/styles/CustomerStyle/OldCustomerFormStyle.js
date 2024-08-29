import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// CustomButton styling for Old Customer Form
export const CustomButton = styled(Button)({
  backgroundColor: '#7b7d7b', // Updated to match the strong pink-red color
  color: '#fff',
  padding: '8px 28px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#514e4c', // Slightly darker shade for hover
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    backgroundColor: '#CCCCCC', // A lighter, muted pink for the disabled state
    color: '#FFFFFF', // White text remains for consistency
    boxShadow: 'none', // No shadow for disabled button
  },
});

// FormContainer styling for Old Customer Form
export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FFF0EE', // Light pinkish background color
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
  marginBottom: '24px',
  maxWidth: '500px',
  margin: 'auto',
});

// StyledTextField styling for Old Customer Form
export const StyledTextField = styled(TextField)({
  backgroundColor: '#FFFFFF', // Keeping the text field background white
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
});

// Title styling for the Old Customer Form
export const FormTitle = styled(Typography)({
  fontSize: '35px',
  fontWeight: 'bold',
  color: 'black', 
  marginBottom: '24px',
  textAlign: 'center',
});

// NewCustomerLink styling for the link to add a new customer
export const NewCustomerLink = styled(Typography)({
  fontSize: '16px',
  color: 'black',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: 'blue',
  },
});