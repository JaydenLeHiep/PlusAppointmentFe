import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Category header styles
export const CategoryHeader = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(1.2, 3),
  margin: theme.spacing(0, 1),
  background: selected
  ? 'linear-gradient(145deg, #b3e5fc, #81d4fa)' 
  : 'linear-gradient(145deg, #e1f5fe, #b3e5fc)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  textAlign: 'left',
  boxShadow: selected 
    ? '0px 8px 20px rgba(0, 0, 0, 0.3)'
    : '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
  '&:hover': {
    background: selected 
    ? 'linear-gradient(145deg, #81d4fa, #4fc3f7)' 
    : 'linear-gradient(145deg, #b3e5fc, #81d4fa)',
    transform: selected ? 'none' : 'translateY(-4px)',
    boxShadow: selected 
      ? '0px 8px 20px rgba(0, 0, 0, 0.3)'
      : '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 3),
  },
}));

export const ServiceItem = styled(Paper)(({ theme, selected }) => ({
    padding: theme.spacing(1.2, 3),
    background: selected
      ? 'linear-gradient(145deg, #d0e0ff, #c0d4ff)'
      : 'linear-gradient(145deg, #f0f0f0, #ffffff)',
    borderRadius: '12px',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'left',
    boxShadow: selected 
      ? '0px 8px 20px rgba(0, 0, 0, 0.3)'
      : '0px 4px 12px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    margin: theme.spacing(2, 1),
    border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
    '&:hover': {
      background: selected 
        ? 'linear-gradient(145deg, #d0e0ff, #c0d4ff)'
        : 'linear-gradient(145deg, #ffffff, #f0f8ff)',
      transform: selected ? 'none' : 'translateY(-4px)',
      boxShadow: selected 
        ? '0px 8px 20px rgba(0, 0, 0, 0.3)'
        : '0px 8px 20px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.2, 3),
    },
  }));

export const CategoryText = styled(Typography)(({ theme }) => ({
  color: 'black',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

export const ServiceText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1.1rem',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
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
    backgroundColor: expanded ? '#1976d2' : '#e0e0e0',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    color: expanded ? '#ffffff' : '#555555',
    boxShadow: expanded ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    '&:hover': {
      backgroundColor: expanded ? '#1565c0' : '#bdbdbd',
      transform: 'scale(1.1)',
    },
  }));