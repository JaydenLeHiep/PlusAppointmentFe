import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  
  export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF2F4',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
    maxWidth: '500px',
    margin: 'auto',
  });
  
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
  