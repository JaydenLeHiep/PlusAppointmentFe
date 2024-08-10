import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomButton from './CustomerButton';

const ButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '24px',
  marginBottom: '24px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const CustomerButtonDashboard = ({ view, onViewChange }) => {
  return (
    <ButtonGroup>
      <CustomButton
        variant={view === 'services' ? 'contained' : 'outlined'}
        size="large"
        onClick={() => onViewChange('services')}
        sx={{
          borderColor: view === 'services' ? 'transparent' : '#1976d2',
          color: view === 'services' ? 'white' : '#1976d2',
          flex: 1,
        }}
      >
        Services
      </CustomButton>
      <CustomButton
        variant={view === 'staffs' ? 'contained' : 'outlined'}
        size="large"
        onClick={() => onViewChange('staffs')}
        sx={{
          borderColor: view === 'staffs' ? 'transparent' : '#1976d2',
          color: view === 'staffs' ? 'white' : '#1976d2',
          flex: 1,
        }}
      >
        Staffs
      </CustomButton>
    </ButtonGroup>
  );
};

export default CustomerButtonDashboard;