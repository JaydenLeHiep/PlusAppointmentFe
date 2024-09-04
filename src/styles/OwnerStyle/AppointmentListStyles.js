import { styled } from '@mui/material/styles';
import { Paper, ButtonBase, Box, Typography, List } from '@mui/material';

export const AppointmentPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: '16px',
  marginBottom: '8px',
  borderRadius: '12px',
  backgroundColor: '#f0f8ff',
  border: '1px solid #1976d2',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e6f1ff',
  },
}));

export const AppointmentButtonBase = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
}));

export const AppointmentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const AppointmentInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexGrow: 1,
}));

export const TimeInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minWidth: '120px',
  textAlign: 'center',
}));

export const TimeText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
}));

export const CustomerInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexGrow: 1,
}));

export const BadgeContent = (status) => ({
  '& .MuiBadge-badge': {
    fontSize: '0.75rem',
    padding: '0 8px',
    borderRadius: '8px',
    height: '24px',
    lineHeight: '24px',
    minWidth: '60px',
    textAlign: 'center',
    backgroundColor: status === 'confirmed' ? '#4caf50' : status === 'pending' ? '#ff9800' : '#f44336',
    color: '#fff',
  },
});

export const ScrollableAppointmentList = styled(List)(({ theme }) => ({
    maxHeight: '250px',  
    overflowY: 'auto',
    paddingRight: theme.spacing(2),  
  }));