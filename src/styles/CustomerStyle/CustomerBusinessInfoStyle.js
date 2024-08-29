import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  backgroundColor: '#ffffff',
  padding: theme.spacing(2, 3), 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    padding: theme.spacing(2, 3), 
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2), 
    maxHeight: '20%',
  },
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem', 
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    marginBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem', 
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end', 
  justifyContent: 'center',
  gap: theme.spacing(0.5), 
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-end',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center', 
  },
}));

export const AddressWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5), 
  marginBottom: theme.spacing(0.5), 
  flexWrap: 'wrap', 
}));

export const PhoneWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5), 
  flexWrap: 'wrap',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem', 
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', 
  },
}));