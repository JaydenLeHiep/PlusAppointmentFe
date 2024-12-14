import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Background from'../../assets/christmas-composition-with-gifts-fir-tree-branches-red-decorations-white-background-christmas-winter-new-year-concept-top-view-copy-space.jpg'; 

export const BusinessInfoContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${Background})`,
  backgroundSize: '100% 100%', // Ensures the image covers the entire container
  backgroundRepeat: 'no-repeat', // Prevents tiling
  backgroundPosition: 'center', // Centers the image
  maxWidth: '100%',
  backgroundColor: '#ffffff',
  padding: theme.spacing(2, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    padding: theme.spacing(2, 3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    maxHeight: '20%',
  },
}));

export const BusinessName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  fontFamily: "'Dancing Script', cursive",
  fontSize: '2.5rem',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    marginBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
    marginTop: theme.spacing(2),
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}));

export const AddressWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const PhoneWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

export const LanguageSwitcherContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const LanguageText = styled(({ isActive, ...other }) => (
  <Typography {...other} />
))(({ theme, isActive }) => ({
  cursor: 'pointer',
  fontSize: '0.875rem',
  color: isActive ? theme.palette.text.primary : 'gray',
}));

export const DividerText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
}));