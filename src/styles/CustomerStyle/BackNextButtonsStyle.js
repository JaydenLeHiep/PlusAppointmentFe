import { styled, keyframes } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

// Ultra-smooth pendulum swing animation
const swingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(25deg); } /* Most right */
  25% { transform: rotate(0deg); } /* Back to center */
  40% { transform: rotate(-25deg); } /* Most left */
  50% { transform: rotate(0deg); } /* Back to center */
  60% { transform: rotate(25deg); } /* Most right */
  75% { transform: rotate(0deg); } /* Back to center */
  90% { transform: rotate(-25deg); } /* Most left */
  100% { transform: rotate(0deg); } /* Back to center */
`;

// Rope container (the pendulum effect happens here)
export const RopeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '30px', // Rope length
  width: '2px', // Rope thickness
  backgroundColor: 'gray', // Rope color
  animation: `${swingAnimation} 6s linear infinite`, // Apply easing for natural motion
  transformOrigin: 'top center', // Rotation occurs at the top (touching the button)
  marginTop: '-17px', // Ensure the rope visually starts from the button
}));

// Icon container (attached to the bottom of the rope)
export const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-30px', // Place the icon below the rope
  left: '50%',
  transform: 'translateX(-50%)', // Center the icon horizontally
  '& img': {
    width: '35px', // Icon size
    height: '35px',
  },
}));

// Rope container (the pendulum effect happens here)
export const RopeManContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '20px', // Rope length
  width: '2px', // Rope thickness
  backgroundColor: 'gray', // Rope color
  animation: `${swingAnimation} 6s linear infinite`, // Apply easing for natural motion
  transformOrigin: 'top center', // Rotation occurs at the top (touching the button)
  marginTop: '-10px', // Ensure the rope visually starts from the button
}));

export const RopeTreeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '30px', // Rope length
  width: '2px', // Rope thickness
  backgroundColor: 'gray', // Rope color
  animation: `${swingAnimation} 6s linear infinite`, // Apply easing for natural motion
  transformOrigin: 'top center', // Rotation occurs at the top (touching the button)
  marginTop: '0', // Ensure the rope visually starts from the button
}));

export const IconTreeContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-40px', // Place the icon below the rope
  left: '50%',
  transform: 'translateX(-50%)', // Center the icon horizontally
  '& img': {
    width: '40px', // Icon size
    height: '40px',
  },
}));

export const RopeBellContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '30px', // Rope length
  width: '2px', // Rope thickness
  backgroundColor: 'gray', // Rope color
  animation: `${swingAnimation} 6s linear infinite`, // Apply easing for natural motion
  transformOrigin: 'top center', // Rotation occurs at the top (touching the button)
  marginTop: '-17px', // Ensure the rope visually starts from the button
}));

export const IconBellContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-25px', // Place the icon below the rope
  left: '50%',
  transform: 'translateX(-50%)', // Center the icon horizontally
  '& img': {
    width: '28px', // Icon size
    height: '28px',
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px', 
  height: '60px', 
  margin: '0 auto', 
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    height: '50px', // Default height for mobile
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

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

  '&:disabled': {
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF', 
    boxShadow: 'none', 
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