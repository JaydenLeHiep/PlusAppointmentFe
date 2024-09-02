import { styled } from '@mui/material/styles';
import { DialogActions, Button } from '@mui/material';

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: '16px 24px',
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0056b3',
    },
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
    width: '125px',
    backgroundColor: '#28a745',
    color: '#fff',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '&:hover': {
        backgroundColor: '#218838',
    },
}));