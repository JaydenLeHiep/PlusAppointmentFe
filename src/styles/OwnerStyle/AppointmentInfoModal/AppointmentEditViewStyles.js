import { styled } from '@mui/material/styles';
import { Typography, FormControl, Select, TextField, Box } from '@mui/material';

export const CenteredContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
});

export const CustomerNameWrapper = styled(Box)(({ theme }) => ({
    display: 'inline-block',  
    padding: theme.spacing(1, 3),
    backgroundColor: '#a6d4fa',  
    borderRadius: '8px',
    textAlign: 'center',
    margin: '0 auto',  
    marginBottom: theme.spacing(2.5),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const CustomerNameTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'center',
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2.5),
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(2.5),
}));

export const AddServiceTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#1976d2',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: theme.spacing(2),
    '&:hover': {
        color: '#115293',
    },
}));