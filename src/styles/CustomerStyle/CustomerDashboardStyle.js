import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// DashboardContainer styling
export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f0f8ff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',  
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

// ContentContainer styling
export const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f8ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '82vh',  // Reintroduced minHeight for consistency
  width: '100%',
  maxWidth: '1200px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(1.25),  // Restored some padding for mobile
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
    height: '80vh', // Adjust height for mobile to allow space for other elements
  },
}));

// FormContainer styling
export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(4), // Reduce top margin on mobile
  },
}));

// CustomerListContainer styling
export const CustomerListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid for PC
  gap: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Stronger shadow for a more pronounced effect
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // Single column on small screens
    padding: theme.spacing(2),
    maxHeight: 'calc(100vh - 120px)', // Height adjustment to fit content within screen
  },
}));

// CustomerListHeader styling
export const CustomerListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: `0 ${theme.spacing(2)}px`,
  width: '100%',
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column', // Stack elements vertically on mobile
    alignItems: 'flex-start', // Align to the left on mobile
  },
}));

// StyledTextField styling
export const StyledTextField = styled(Box)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(2),
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
  padding: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));