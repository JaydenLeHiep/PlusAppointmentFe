import { styled } from '@mui/material/styles';
import { Typography, ListItem } from '@mui/material';

export const ContainerTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: '20px',
}));

export const CustomListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 0, 0, 0.7)',
  marginBottom: theme.spacing(3),
  padding: '20px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 0, 0, 1)', // Lighter red border
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 0, 0, 0.9)', // Slightly darker on hover
  },
}));

export const BusinessNameTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
}));

export const BusinessAddressTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: 'white',
  marginTop: '8px',
}));

export const NoBusinessesFoundTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#999',
  fontStyle: 'italic',
  marginTop: theme.spacing(3),
}));