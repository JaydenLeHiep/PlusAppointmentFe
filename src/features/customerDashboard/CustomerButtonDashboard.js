// CustomerButtonDashboard.js
import React from 'react';
import { Box } from '@mui/material';
import CustomButton from './CustomerButton';

const CustomerButtonDashboard = ({ view, onViewChange }) => {
  return (
    <Box className="button-group">
      <CustomButton
        variant={view === 'services' ? 'contained' : 'outlined'}
        color="primary"
        size="large"
        onClick={() => onViewChange('services')}
      >
        Services
      </CustomButton>
      <CustomButton
        variant={view === 'staffs' ? 'contained' : 'outlined'}
        color="primary"
        size="large"
        onClick={() => onViewChange('staffs')}
      >
        Staffs
      </CustomButton>
    </Box>
  );
};

export default CustomerButtonDashboard;
