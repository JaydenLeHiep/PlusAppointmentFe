import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
}));

export const StyledIconButton = styled(IconButton)({
    position: 'absolute',
    top: '8px',
    right: '8px',
    color: '#6c757d',
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
}));

export const ActionButton = styled(Button)(({ theme, buttonColor }) => ({
    width: '150px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: buttonColor,
    color: '#fff',
    '&:hover': {
        backgroundColor: buttonColor === '#007bff' ? '#0056b3' : '#218838',
    },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '#6c757d',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#5a6268',
    },
}));