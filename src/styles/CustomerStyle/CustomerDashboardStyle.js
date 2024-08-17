import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f0f8ff',
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f8ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '82vh',
  padding: theme.spacing(1.25, 2.5), // padding: { xs: '10px', md: '20px' }
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.25, 1.25),
  },
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2.5), // padding: '20px'
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));