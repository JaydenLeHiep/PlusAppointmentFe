import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff', // White background for a clean, crisp look
  padding: theme.spacing(4, 6),
  borderRadius: '12px', // Soft rounded corners
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
  },
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    marginBottom: 0,
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-end',
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
  fontSize: '1.125rem', 
  fontFamily: theme.typography.fontFamily,
}));