import { styled } from '@mui/material/styles';
import { ListItem, Typography, IconButton } from '@mui/material';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#f0f8ff',
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
}));

export const StyledListItemTextPrimary = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
}));

export const StyledListItemTextSecondary = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: '#555',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#6c757d',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));