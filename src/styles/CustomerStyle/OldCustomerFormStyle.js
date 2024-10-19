import { Box, Button, TextField, Typography, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

// CustomButton styling for Old Customer Form
export const CustomButton = styled(Button)({
  backgroundColor: '#999999',
  color: '#fff',
  padding: '8px 28px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#514e4c',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF',
    boxShadow: 'none',
  },
});

// FormContainer styling for Old Customer Form
export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FFF2F4',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(5), 
  marginTop: theme.spacing(3), 
  maxWidth: '500px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4), 
    marginTop: theme.spacing(2), 
  },
}));

// StyledTextField styling for Old Customer Form
export const StyledTextField = styled(TextField)({
  backgroundColor: '#FFFFFF',
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

// Custom styling for the Backdrop
export const StyledBackdrop = styled(Box)({
  zIndex: 9999,
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

// DialogContent Container
export const DialogContentContainer = styled(Box)({
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderTop: '1px solid #e0e0e0',
});

// BoldTypography styling
export const BoldTypography = styled(Typography)({
  fontWeight: 'bold',
});

// Styled DialogActions for the buttons
export const StyledDialogActions = styled(DialogActions)({
  padding: '8px 24px',
  display: 'flex',
  justifyContent: 'space-between',
});

// Cancel Button styling
export const CancelButton = styled(Button)({
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: '8px',
  fontSize: '0.95rem',
  borderColor: '#f44336',
  color: '#f44336',
  flexGrow: 1,
  maxWidth: '100px',
  '&:hover': {
    backgroundColor: '#ffe6e6',
    borderColor: '#f44336',
  },
});

// Proceed Button styling
export const ProceedButton = styled(Button)({
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: '8px',
  fontSize: '0.95rem',
  backgroundColor: '#4caf50',
  flexGrow: 1,
  maxWidth: '100px',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});