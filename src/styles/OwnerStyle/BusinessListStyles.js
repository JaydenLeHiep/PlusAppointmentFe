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
  backgroundColor: '#f0f8ff',
  marginBottom: theme.spacing(3),
  padding: '20px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
}));

export const BusinessNameTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
}));

export const BusinessAddressTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: '#555',
  marginTop: '8px',
}));

export const NoBusinessesFoundTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#999',
  fontStyle: 'italic',
  marginTop: theme.spacing(3),
}));