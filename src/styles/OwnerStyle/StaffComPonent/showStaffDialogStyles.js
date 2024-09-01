import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Alert } from '@mui/material';

export const DialogTitleStyled = styled('div')(({ theme }) => ({
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

export const CloseIconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#808080',
  fontSize: '1.5rem',
}));

export const AlertStyled = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AddNewStaffTypographyStyled = styled(Typography)(({ theme }) => ({
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

export const BoxStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
}));