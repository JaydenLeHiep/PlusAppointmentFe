import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Shared styled components
export const ListItem = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2.5, 3), // Adjusted padding for less space on top and bottom, more on the sides
  background: selected
    ? 'linear-gradient(145deg, #d0e0ff, #c0d4ff)' // Different background for selected items
    : 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  textAlign: 'left',
  boxShadow: selected 
    ? '0px 8px 20px rgba(0, 0, 0, 0.3)'  // Stronger shadow for selected items
    : '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer', // Allow clicking for both selected and unselected items
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0', // Border color change for selected items
  '&:hover': {
    background: selected 
      ? 'linear-gradient(145deg, #d0e0ff, #c0d4ff)'  // Maintain hover effect for selected items
      : 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: selected ? 'none' : 'translateY(-4px)',
    boxShadow: selected 
      ? '0px 8px 20px rgba(0, 0, 0, 0.3)'  // Maintain shadow for selected items
      : '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2.5), // Reduced padding for mobile, more space on left side
  },
}));

export const ItemBoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(0.5), // Slightly reduced margin on mobile
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem', // Slightly smaller font size on mobile
  },
}));

export const ItemText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1.1rem',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem', // Slightly smaller font size on mobile
  },
}));