import { styled } from '@mui/material/styles';
import { ListItem, ListItemText } from '@mui/material';

export const ListItemStyled = styled(ListItem)(({ theme }) => ({
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

export const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-body1': {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.secondary,
  },
}));