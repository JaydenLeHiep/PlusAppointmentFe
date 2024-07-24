import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerForm.css';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

const CustomerForm = ({ onCustomerIdReceived }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const handleSwitchForm = () => {
    setIsNewCustomer(false);
  };

  return (
    <Box className="customer-form">
      <CustomButton
        variant="contained"
        color="primary"
        onClick={() => setIsNewCustomer(!isNewCustomer)}
      >
        {isNewCustomer ? 'Switch to Existing Customer' : 'Switch to New Customer'}
      </CustomButton>
      {isNewCustomer ? (
        <NewCustomerForm onCustomerIdReceived={onCustomerIdReceived} onSwitchForm={handleSwitchForm} />
      ) : (
        <OldCustomerForm onCustomerIdReceived={onCustomerIdReceived} />
      )}
    </Box>
  );
};

export default CustomerForm;
