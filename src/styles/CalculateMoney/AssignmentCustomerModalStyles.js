import { styled } from '@mui/material/styles';
import { IconButton, TextField } from '@mui/material';

export const DialogTitleStyled = styled('div')(({ theme }) => ({
  fontWeight: 550,
  fontSize: '1.5rem',
  color: '#1a1a1a',
  textAlign: 'center',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '3px',
}));

export const CloseIconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#808080',
  fontSize: '1.5rem',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': {
      border: '1.5px solid #e3e3e3',
    },
    '&:hover fieldset': {
      border: '1.5px solid #1976d2',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #1976d2',
    },
  },
}));