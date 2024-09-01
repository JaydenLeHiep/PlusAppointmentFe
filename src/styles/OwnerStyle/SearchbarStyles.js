import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  boxSizing: 'border-box',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    width: 'auto',
    justifyContent: 'center',
  },
}));

export const StyledSearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
    height: '50px', 
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    textAlign: 'left',
  },
  width: '80%',
  maxWidth: '350px',
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      height: '40px',
    },
    maxWidth: '200px', 
  },
}));