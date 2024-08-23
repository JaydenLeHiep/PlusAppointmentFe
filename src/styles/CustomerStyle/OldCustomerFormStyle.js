import { Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

// CustomButton styling for Old Customer Form
export const CustomButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '9px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    backgroundColor: '#0e3c71',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)',
  },
});

// FormContainer styling for Old Customer Form
export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
  backgroundColor: '#f9f9f9',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: '24px',
  maxWidth: '500px',
  margin: 'auto',
});

// StyledTextField styling for Old Customer Form
export const StyledTextField = styled(TextField)({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
});

// StyledCheckbox styling for Old Customer Form
export const StyledCheckbox = styled(Checkbox)({
  color: '#007bff',
});

// StyledFormControlLabel styling for Old Customer Form
export const StyledFormControlLabel = styled(FormControlLabel)({
  marginBottom: '16px',
  color: '#1976d2',
  '& .MuiTypography-root': {
    fontWeight: 'bold',
  },
});