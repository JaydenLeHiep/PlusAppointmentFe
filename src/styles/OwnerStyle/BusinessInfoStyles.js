import { styled } from '@mui/material/styles';
import { Box, Badge, Typography } from '@mui/material';

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

export const BusinessInfoHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const IconButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const CustomBadge = styled(Badge)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: '500',
  marginBottom: theme.spacing(1.25),
  fontFamily: '"Poppins", "Roboto", sans-serif',
}));

export const IconStyle = {
  cursor: 'pointer',
  fontSize: 30,
};