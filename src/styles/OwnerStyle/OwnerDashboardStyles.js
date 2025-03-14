import { Container, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #ffb6c1, #ff69b4)',
  position: 'relative', // Ensure proper layering
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
}));

// Root container style
export const RootContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

// Content container style
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

// Card style
export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.87)', // Add transparency to allow fireworks to show through
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    padding: '2rem',
    marginTop: '30px',
    marginBottom: '30px',
  },
}));

// Loading container style
export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});