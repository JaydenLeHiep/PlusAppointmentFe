import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Category header styles
export const CategoryHeader = styled(Paper)(({ theme, selected }) => ({
    padding: theme.spacing(1.2, 3),
    margin: theme.spacing(0, 1),
    background: '#ffd2d9', 
    borderRadius: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1.8px solid #7b7d7b',
    boxShadow: 'none',
    '&:hover': {
        borderRadius: '12px',
    },
    '&:active': {
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