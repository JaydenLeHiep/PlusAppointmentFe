import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));