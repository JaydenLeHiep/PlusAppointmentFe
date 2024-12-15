import { styled, keyframes } from '@mui/material/styles';
import { Box } from '@mui/material';

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

// RopeTreeContainer for Left Icon
export const RopeTreeContainer = styled(Box)(({ theme }) => ({
    position: 'absolute', // Positioned relative to the main container
    top: 'calc(100% - 35px)', // Align the rope just below the navigation
    height: '35px', // Rope length
    width: '2px', // Rope thickness
    backgroundColor: 'gray', // Rope color
    animation: `${swingAnimation} 6s linear infinite`, // Apply easing for natural motion
    transformOrigin: 'top center', // Rotation occurs at the top
  }));
  
  // IconTreeContainer for Left Icon
  export const IconTreeContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '-40px', // Place the icon slightly below the rope
    left: '50%',
    transform: 'translateX(-50%)', // Center the icon horizontally
    '& img': {
      width: '40px', // Icon size
      height: '40px',
    },
  }));
  
  // RopeManContainer for Cookies Icon
  export const RopeManContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 'calc(100% - 35px)', // Align the rope just below the navigation
    height: '35px',
    width: '2px',
    backgroundColor: 'gray',
    animation: `${swingAnimation} 6s linear infinite`,
    transformOrigin: 'top center',
  }));
  
  // IconContainer for Cookies Icon
  export const IconContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '-25px', // Adjusted placement for the icon
    left: '50%',
    transform: 'translateX(-50%)',
    '& img': {
      width: '35px',
      height: '35px',
    },
  }));
  
  // RopeBellContainer for Bell Icon
  export const RopeBellContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 'calc(100% - 35px)', // Align the rope just below the navigation
    height: '35px',
    width: '2px',
    backgroundColor: 'gray',
    animation: `${swingAnimation} 6s linear infinite`,
    transformOrigin: 'top center',
  }));
  
  // IconBellContainer for Bell Icon
  export const IconBellContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '-35px', // Adjusted placement for the icon
    left: '50%',
    transform: 'translateX(-50%)',
    '& img': {
      width: '35px',
      height: '35px',
    },
  }));