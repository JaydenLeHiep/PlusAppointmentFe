import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  backgroundColor: '#f0f8ff',
  position: 'relative',
  width: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(4),
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '1.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'right',
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  fontFamily: "'Roboto', sans-serif",
  color: '#555',
  marginBottom: theme.spacing(1),
}));

export const StyledLocationOnIcon = styled(LocationOnIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#1976d2',
}));

export const PhoneText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  fontFamily: "'Roboto', sans-serif",
  color: '#555',
}));

export const StyledPhoneIcon = styled(PhoneIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#1976d2',
}));