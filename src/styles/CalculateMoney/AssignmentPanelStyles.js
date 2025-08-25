import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StaffListOuterContainer = styled(Box)({
    maxHeight: '60vh',
    overflowY: 'auto',
    paddingRight: 10,
});

export const AssignmentPanelTitleBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    justifyContent: 'center',
});

export const AssignmentPanelTitle = styled(Typography)({
    fontWeight: 700,
    fontSize: '1.4rem',
    color: '#1976d2',
    letterSpacing: 1,
});