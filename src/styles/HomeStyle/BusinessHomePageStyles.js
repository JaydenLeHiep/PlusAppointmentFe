import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const HeroSection = styled(Box)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  textAlign: 'center',
  padding: '2rem',
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${require('../../assets/hero-image.jpg')})`,
}));

export const HeroTitle = styled(Typography)({
  variant: 'h2',
  component: 'h1',
  gutterBottom: true,
});

export const HeroSubtitle = styled(Typography)({
  variant: 'h5',
  component: 'p',
  gutterBottom: true,
});

export const HeroButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: '10px 20px',
  fontSize: '1rem',
}));

export const ServicesContainer = styled(Container)(({ theme }) => ({
  padding: '4rem 0',
  flex: '1',
  backgroundColor: '#white',
}));

export const ServiceGrid = styled(Grid)({
  container: true,
  spacing: 4,
});

export const ServiceItem = styled(Grid)({
  item: true,
  xs: 12,
  md: 4,
});

export const ServiceTitle = styled(Typography)({
  variant: 'h6',
  component: 'h3',
});

export const ServiceDescription = styled(Typography)({
  variant: 'body1',
});