import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  maxWidth: '100%', // Full width
  backgroundColor: '#ffffff',
  padding: theme.spacing(2, 3), // Default padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    padding: theme.spacing(2, 3), // Slightly reduced padding for larger screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2), // Reduced padding for mobile
  },
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem', // Font size adjusted for better readability
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    marginBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem', // Adjust font size for mobile
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end', // Ensure alignment to the right side
  justifyContent: 'center',
  gap: theme.spacing(0.5), // Reduced gap to bring items closer together
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-end',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center', // Center align for mobile
  },
}));

export const AddressWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5), // Reduced gap between icon and text
  marginBottom: theme.spacing(0.5), // Reduced space between address and phone
  flexWrap: 'wrap', // Ensure that content wraps if it's too long
}));

export const PhoneWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5), // Reduced gap between icon and text
  flexWrap: 'wrap', // Ensure that content wraps if it's too long
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem', // Font size adjusted for better readability
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Adjust font size for mobile
  },
}));