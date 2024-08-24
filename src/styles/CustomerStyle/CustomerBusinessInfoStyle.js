import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  width: '100%', // Full width
  backgroundColor: '#ffffff',
  padding: theme.spacing(2, 3), // Default padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the items
    alignItems: 'center',
    textAlign: 'left',
    padding: theme.spacing(3, 3), // Increased padding for larger screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2), // Reduced padding for mobile
  },
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem', 
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2), 
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    marginBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem', // Increase the font size for small screens
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginRight: theme.spacing(2), // Margin to the right for spacing
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
  gap: theme.spacing(1),
}));

export const PhoneWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem', // Default font size for mobile
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Smaller font size for very small screens
  },
}));