import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerCss/CustomerForm.css';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

const CustomerForm = ({ onCustomerIdReceived }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const handleSwitchForm = () => {
    setIsNewCustomer(false);
  };

  return (
    <Box 
      className="customer-form" 
      sx={{ 
        padding: '24px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
        marginBottom: '24px',
        maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold', color: '#1976d2' }}>
        {isNewCustomer ? 'New Customer Form' : 'Existing Customer Form'}
      </Typography>
      <Box sx={{ marginBottom: '16px', textAlign: 'center' }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => setIsNewCustomer(!isNewCustomer)}
          sx={{ marginBottom: '16px' }}
        >
          {isNewCustomer ? 'Switch to Existing Customer' : 'Switch to New Customer'}
        </CustomButton>
      </Box>
      {isNewCustomer ? (
        <NewCustomerForm onCustomerIdReceived={onCustomerIdReceived} onSwitchForm={handleSwitchForm} />
      ) : (
        <OldCustomerForm onCustomerIdReceived={onCustomerIdReceived} />
      )}
    </Box>
  );
};

export default CustomerForm;