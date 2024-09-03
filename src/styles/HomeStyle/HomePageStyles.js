import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography } from '@mui/material';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
  textAlign: 'center',
  padding: '20px',
});

export const StyledPaper = styled(Paper)({
  padding: '50px 40px',
  borderRadius: '15px',
  border: 'none',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  color: '#333333',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
});

export const TitleTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#1976d2',
});

export const SubtitleTypography = styled(Typography)({
  color: '#555555',
});

export const ButtonContainer = styled(Box)({
  marginTop: '4rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});

export const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.4)',
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.6)',
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0px 5px 15px rgba(233, 30, 99, 0.4)',
  '&:hover': {
    backgroundColor: '#c2185b',
    boxShadow: '0px 5px 15px rgba(233, 30, 99, 0.6)',
  },
}));