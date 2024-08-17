import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '20px',
  backgroundColor: '#f0f8ff',
  position: 'relative',
  width: '100%',
}));

export const BackButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontFamily: "'Montserrat', sans-serif",
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  textAlign: 'right',
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  fontFamily: "'Roboto', sans-serif",
  color: theme.palette.primary.main,
}));

export const StyledLocationOnIcon = styled(LocationOnIcon)(({ theme }) => ({
  marginRight: '6px',
  color: theme.palette.primary.main,
}));

export const PhoneText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  fontFamily: "'Roboto', sans-serif",
  color: theme.palette.primary.main,
  marginTop: '4px',
}));

export const StyledPhoneIcon = styled(PhoneIcon)(({ theme }) => ({
  marginRight: '6px',
  color: theme.palette.primary.main,
}));