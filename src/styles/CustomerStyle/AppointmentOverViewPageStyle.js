import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, ListItemText, ListItem } from '@mui/material';

export const OverviewContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor: '#f7f9fc',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

export const OverviewItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const OverviewText = styled(Typography)(({ theme }) => ({
  color: '#1976d2',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
}));

export const OverviewButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: '#1976d2',
  color: '#fff',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
  },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingBottom: theme.spacing(1),
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
  },
  '& .MuiListItemText-secondary': {
    fontSize: '0.875rem',
    color: '#666',
  },
}));