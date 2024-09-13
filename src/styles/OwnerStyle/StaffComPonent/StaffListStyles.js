import { styled } from '@mui/material/styles';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#f0f8ff',
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #1976d2',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flex: '1 1 auto',
  marginRight: theme.spacing(1), 
  '& .MuiTypography-root': {
    fontWeight: 'bold',
    color: '#1976d2',
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%', // Ensures that long text is truncated with ellipsis
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  marginLeft: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {  // Reduce spacing on smaller screens
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(0.25),
  },
}));