import { styled } from '@mui/material/styles';
import { ListItem, ListItemText, Typography } from '@mui/material';

export const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#f0f8ff',
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  maxWidth: '90%',
  margin: '0 auto 12px auto',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
}));

export const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-body1': {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.secondary,
  },
}));

// Category card styling
export const CategoryCardStyled = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
  border: '1px solid #0288d1',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#bbdefb',
  },
}));

// Styled for no services text
export const NoServicesTextStyled = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  color: 'gray',
}));

export const ServiceNameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
}));