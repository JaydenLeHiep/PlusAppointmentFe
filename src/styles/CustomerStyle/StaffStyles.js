import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Shared styled components
export const ListItem = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(1.2, 3),
  background: selected ? '#ffe0e5' : '#FFFFFF', 
  borderRadius: '12px',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  margin: theme.spacing(1, 1),
  border: selected ? '2.3px solid #ffe0e5' : '1.8px solid #ffe0e5', 
  boxShadow: 'none', 
  '&:hover': {
      borderRadius: '12px',
      boxShadow: 'none', 
  },
  '&:active': {
      borderRadius: '12px',
      boxShadow: 'none',
  },
  [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 3),
      '&:hover': {
          borderRadius: '12px',
          boxShadow: 'none', 
      },
      '&:active': {
          borderRadius: '12px',
          boxShadow: 'none',
      },
  },
}));

export const ItemBoldText = styled(Typography)(({ theme }) => ({
  color: 'black',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(0.5), 
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem', 
  },
}));

export const ItemText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1rem',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));
