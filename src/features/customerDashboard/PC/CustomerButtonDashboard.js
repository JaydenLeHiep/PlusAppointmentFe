import React from 'react';
import { CustomButton, ButtonGroup } from '../../../styles/CustomerStyle/CustomerButtonDashboardStyle';

const CustomerButtonDashboard = ({ view, onViewChange }) => {
  return (
    <ButtonGroup>
      <CustomButton
        variant={view === 'services' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('services')}
      >
        Services
      </CustomButton>
      <CustomButton
        variant={view === 'staffs' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('staffs')}
      >
        Staffs
      </CustomButton>
    </ButtonGroup>
  );
};

export default CustomerButtonDashboard;