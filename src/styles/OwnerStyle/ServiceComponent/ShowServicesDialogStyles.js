import { styled } from '@mui/material/styles';
import { DialogTitle, Alert, Box, Typography, IconButton } from '@mui/material';

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 550,
  fontSize: '1.75rem',
  color: '#1a1a1a',
  textAlign: 'center',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '3px',
}));

export const AlertStyled = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AddNewServiceTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'underline',
  color: '#1976d2',
  '&:hover': {
    color: '#115293',
  },
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

export const DialogContentBoxStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
}));

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#808080',
  fontSize: '1.5rem',
}));