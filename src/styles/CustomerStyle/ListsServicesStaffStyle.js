import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// CustomerListContainer styling
export const CustomerListContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid
  gap: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Stronger shadow for a more pronounced effect
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', // Slightly stronger hover shadow
    transform: 'translateY(-2px)', // Subtle hover lift effect
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // Single column on small screens
    padding: theme.spacing(2),
  },
}));

// CustomerListHeader styling
export const CustomerListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: `0 ${theme.spacing(2)}px`, 
  width: '100%',
  boxSizing: 'border-box',
  marginLeft: '35px'
}));

// StyledTextField styling
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(2), // Add some space on top for smaller screens
  },
}));