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
  backgroundColor: '#FFF2F4', 
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid black', 
}));

// Overview Text
export const OverviewText = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

// Overview Button
export const OverviewButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#8c8c8c', 
  padding: theme.spacing(1.5, 4),
  borderRadius: '8px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#514e4c',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    backgroundColor: '#CCCCCC', 
    color: '#FFFFFF', 
    boxShadow: 'none', 
  },
}));

// Styled ListItemText
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: '#555', 
  },
  '& .MuiTypography-body2': {
    color: '#333', 
  },
}));

export const ServiceNameText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#D32F2F', 
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const TotalPriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'Black',
  textAlign: 'center',
  marginTop: theme.spacing(4),
})); 