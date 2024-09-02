import { styled } from '@mui/material/styles';
import { DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.75rem',
    color: '#333',
    textAlign: 'center',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'capitalize',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginLeft: '7px',
}));

export const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
    color: '#808080',
    fontSize: '1.5rem',
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '24px',
    backgroundColor: '#f4f6f8',
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: '16px 24px',
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#d32f2f',
    color: '#fff',
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '&:hover': {
        backgroundColor: '#9a0007',
    },
}));

export const StyledUpdateButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#1976d2',
    color: '#fff',
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '&:hover': {
        backgroundColor: '#115293',
    },
}));

export const StyledConfirmButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#28a745',
    color: '#fff',
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '&:hover': {
        backgroundColor: '#218838',
    },
}));