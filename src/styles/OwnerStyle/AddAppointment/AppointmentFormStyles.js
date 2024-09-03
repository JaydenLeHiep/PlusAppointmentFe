import { styled } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#1976d2',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '&:hover': {
        color: '#115293',
    },
}));