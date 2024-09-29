import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Container for the main content
export const MainContainer = styled(Box)({
    maxWidth: '85%',
    margin: '0 auto', 
    textAlign: 'center',
    marginTop: '50px'
});

// Styling for the Welcome text
export const WelcomeText = styled(Typography)(({ theme }) => ({
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#2c3e50',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
    marginTop: '50px',
    
    // Mobile Styles
    [theme.breakpoints.down('sm')]: {
        fontSize: '28px',
        marginTop: '30px', 
        marginBottom: '15px',
        textAlign: 'center' 
    }
}));

// Styling for the buttons
export const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
  padding: theme.spacing(1.3, 4), 
  fontSize: '1rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
  backgroundColor: '#8c8c8c', 
  color: '#FFFFFF', 

  '&:hover': {
    backgroundColor: '#514e4c',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', 
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 1.8),
    fontSize: '0.875rem',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
}));

// Button container styling
export const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
});