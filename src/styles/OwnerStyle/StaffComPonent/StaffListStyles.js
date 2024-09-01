import { styled } from '@mui/material/styles';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';

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

export const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
}));