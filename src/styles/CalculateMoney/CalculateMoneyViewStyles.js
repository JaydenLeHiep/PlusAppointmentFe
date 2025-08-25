import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 0,
  width: '100%',
  marginTop: 20,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const OverviewSection = styled(Box)(({ theme }) => ({
  flex: 2,
  paddingRight: 12,
  [theme.breakpoints.up('md')]: {
    borderRight: '1px solid #ccc',
  },
}));

export const AssignmentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingLeft: 12,
}));