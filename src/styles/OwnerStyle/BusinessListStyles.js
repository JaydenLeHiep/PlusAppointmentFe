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
  backgroundColor: '#ff69b4', // Main hot pink
  marginBottom: theme.spacing(3),
  padding: '20px',
  boxShadow: '0px 4px 12px rgba(255, 20, 147, 0.3)', // Softer pink shadow
  border: '1px solid #d63384', // Deeper magenta-pink border
  cursor: 'pointer',
  
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(255, 20, 147, 0.5)', // Stronger pink shadow on hover
    backgroundColor: '#e05297', // Slightly darker pink
    border: '1px solid #c2185b', // Darker pink-red border
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