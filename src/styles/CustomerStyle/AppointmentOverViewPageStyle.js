import { styled } from '@mui/material/styles';
import { Box, Typography, Button, ListItem, ListItemText } from '@mui/material';

// Overview Container
export const OverviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'transparent',
  maxWidth: '1200px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Overview Item
export const OverviewItem = styled(ListItem)(({ theme }) => ({
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

// Overview Text
export const OverviewText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

// Overview Button
export const OverviewButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1.5, 4),
  borderRadius: '8px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    backgroundColor: theme.palette.primary.darker,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)',
  },
}));

// Styled ListItemText
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.primary,
  },
}));