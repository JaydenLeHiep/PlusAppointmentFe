import { Box, TextField, Typography, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// DashboardContainer styling for mobile
export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: '#f0f8ff',
}));

// CustomContainer styling for mobile
export const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
}));

// ErrorContainer styling for mobile
export const ErrorContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

// ErrorTypography styling for mobile
export const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: '#ff1744',
  fontWeight: 'bold',
}));

// LoadingContainer styling for mobile
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

// CustomCircularProgress styling for mobile
export const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

// CustomerListContainer styling for mobile
export const CustomerListContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr', // Single column for mobile screens
  gap: theme.spacing(2),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

// StyledTextField styling for mobile
export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
  },
}));

// FormContainer styling for mobile
export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

// ServiceListHeader styling for mobile
export const ServiceListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: `0 ${theme.spacing(2)}px`,
  width: '100%',
  boxSizing: 'border-box',
}));