import { Container, Card, Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Keyframes for snow animation
const snowFall = keyframes`
  0% { 
    transform: translateY(-30vh) translateX(0); /* Start well above the viewport */
    opacity: 1; 
  }
  25% {
    transform: translateY(25vh) translateX(-5px); /* Drift left */
  }
  50% {
    transform: translateY(50vh) translateX(5px); /* Drift right */
    opacity: 0.9;
  }
  75% {
    transform: translateY(75vh) translateX(-3px); /* Drift left again */
  }
  100% { 
    transform: translateY(150vh) translateX(0); /* Fall far below the viewport */
    opacity: 0.8; 
  }
`;

// SnowLayer for falling snowflakes
export const SnowLayer = styled('div')({
  position: 'absolute',
  top: '-30vh', // Start above the visible viewport
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none', // Snowflakes shouldn't block interactions
  zIndex: 0, // Behind the text and content
  overflow: 'hidden',
  '& .snowflake': {
    position: 'absolute',
    width: '10px', // Snowflake size
    height: '10px',
    backgroundColor: '#ffffff', // Snowflake color
    borderRadius: '50%', // Circular snowflake
    animation: `${snowFall} 15s linear infinite`, // Extend duration for a slower, more realistic fall
    animationDelay: `${Math.random() * 4}s`, // Staggered start for each snowflake
    opacity: 0.9,
  },
});

export const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FF0000', // Red color for Christmas theme
  position: 'relative', // Position relative to contain snowflakes
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 1rem',
  flex: 1,
  overflow: 'hidden',
  zIndex: 1, // Keep content above Fireworks
  [theme.breakpoints.up('md')]: {
    padding: '0 2rem',
  },
  // Snowflake layer
  '& .snowflake': {
    position: 'absolute',
    width: '10px', // Snowflake size
    height: '10px',
    backgroundColor: '#ffffff', // Snowflake color
    borderRadius: '50%', // Circular snowflake
    animation: `${snowFall} 5s linear infinite`, // Continuous animation
    animationDelay: 'calc(var(--index) * 0.2s)', // Staggered start for each snowflake
    opacity: 0.9,
  },
}));

// Root container style
export const RootContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const ContentContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '82vh',
  paddingTop: 0,
  marginTop: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '100%',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginTop: '20px',
  marginBottom: '10px',
  textAlign: 'left',
  position: 'relative', 
  overflow: 'hidden', 
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    padding: '2rem',
    marginBottom: '30px',
  },
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const CarouselIndicatorContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'red',
  paddingTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const CarouselDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  width: 50,
  height: 8,
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: active ? '#ffff3dff' : '#ffffffff',
  '&:hover': {
    backgroundColor: '#fbff83ff',
  },
}));