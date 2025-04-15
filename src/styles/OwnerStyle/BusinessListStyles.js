import { styled } from '@mui/material/styles';
import { Typography, ListItem } from '@mui/material';

export const ContainerTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: '20px',
}));

export const CustomListItem = styled(ListItem)(({ theme }) => ({
  width: '100%',
  padding: '16px',
  marginBottom: '8px',
  borderRadius: '12px',
  backgroundColor: '#eff8ff', 
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  '&:hover': {
    backgroundColor: '#e6f1ff',
    boxShadow: '0px 8px 16px rgba(33, 150, 243, 0.2)',
    border: '1px solid #64b5f6',
  },
}));

export const BusinessNameTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#555',
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