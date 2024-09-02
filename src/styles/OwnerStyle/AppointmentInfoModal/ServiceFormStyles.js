import { styled } from '@mui/material/styles';
import { FormControl, Select, TextField } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
}));