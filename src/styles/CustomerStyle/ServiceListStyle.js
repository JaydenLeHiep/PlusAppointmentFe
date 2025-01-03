import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export const CategoryHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2, 3),
  margin: theme.spacing(0, 1),
  background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
  borderRadius: '12px',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  position: 'relative', // Ensure stacking context
  zIndex: 10, // Elevate above the fireworks canvas
  border: '1.5px solid rgba(211, 47, 47, 0.8)', // Transparent red border
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Enhanced shadow for better visibility
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.8)', // Darker on hover
    border: '1.5px solid rgba(183, 28, 28, 0.8)',
  },
  '&:active': {
    background: 'rgba(0, 0, 0, 0.9)', // Darker when active
    borderRadius: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 3),
  },
}));

export const ServiceItem = styled(Paper)(({ theme, selected }) => ({
    padding: theme.spacing(1.2, 3),
    background: selected ? '#ffe0e5' : '#FFFFFF', 
    borderRadius: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    maxWidth: '85%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    margin: theme.spacing(1, 'auto'),
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

export const CategoryText = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF', // Bright white text
  fontSize: '1.4rem',
  fontWeight: 600, // Bold for better visibility
  textShadow: '0px 0px 3px rgba(255, 255, 255, 0.5)', // Subtle glow
  marginBottom: theme.spacing(0.5),
  zIndex: 11, // Ensure the text appears above the fireworks
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

export const ServiceTextBlack = styled(Typography)(({ theme }) => ({
    color: 'black', // Corrected the typo here
    fontSize: '1.4rem',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

export const ServiceText = styled(Typography)(({ theme }) => ({
    color: '#555',
    fontSize: '1rem',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}));

export const ServiceListContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

export const ExpandIcon = styled('div')(({ theme, expanded }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: expanded ? '#FFB3B3' : '#FFD7D7',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
}));