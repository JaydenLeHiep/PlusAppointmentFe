import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// DashboardContainer styling
export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',  
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

// CustomerListContainer styling
export const CustomerListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', 
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', 
    padding: theme.spacing(2),
    maxHeight: '70%', 
  },
}));


// ErrorContainer styling
export const ErrorContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2.5),
}));

// LoadingContainer styling
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    height: '80vh',
  },
}));

// ErrorTypography styling
export const ErrorTypography = styled(Box)(({ theme }) => ({
  color: '#ff1744',
}));

// CustomCircularProgress styling
export const CustomCircularProgress = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

// CustomContainer styling
export const CustomContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledCarouselContainer = styled(Box)(({ theme }) => ({
  width: '100%', 
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    width: '870px',
    height: '550px',
  },
  [theme.breakpoints.down('md')]: {
    width: '398px',
    height: '252px',
  },
}));