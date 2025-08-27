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
  zIndex: 1,
  [theme.breakpoints.up('md')]: {
    padding: '0 2rem',
  },
}));

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
  backgroundColor: 'rgba(255, 255, 255, 0.87)',
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
  backgroundColor: '#ffb6c1',
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
  backgroundColor: active ? '#ff3d3dff' : '#ffffffff',
  '&:hover': {
    backgroundColor: '#ff8181ff',
  },
}));