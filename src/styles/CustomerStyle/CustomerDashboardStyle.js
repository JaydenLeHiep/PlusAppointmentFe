import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// DashboardContainer styling
export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f0f8ff',
}));

// ContentContainer styling
export const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f8ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '82vh',
  boxShadow: theme.shadows[4], 
  padding: theme.spacing(1.25, 2.5), 
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.25, 1.25),
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
}));

// FormContainer styling
export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

// CustomerListContainer styling
export const CustomerListContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid
  gap: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Stronger shadow for a more pronounced effect
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  boxSizing: 'border-box',  // Ensure padding doesn't affect the size or position of items
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', // Slightly stronger hover shadow
    transform: 'translateY(-2px)', // Subtle hover lift effect
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // Single column on small screens
    padding: theme.spacing(2),
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

}));

// StyledTextField styling
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(2), // Add some space on top for smaller screens
  },
}));