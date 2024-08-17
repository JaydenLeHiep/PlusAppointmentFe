import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Shared styled components
export const ListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  textAlign: 'left',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  border: '1px solid #e0e0e0',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

export const ItemBoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(1),
}));

export const ItemText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1.1rem',
  marginBottom: theme.spacing(0.5),
}));