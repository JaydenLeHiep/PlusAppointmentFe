import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

// CustomButton styling
const CustomButton = styled(Button)({
  backgroundColor: '#1976d2', // Primary blue color
  color: '#fff', // Text color
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px', // Increased border-radius for a more modern look
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginTop: '20px', // Applied the margin from CSS
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)', // Slight lift effect on hover
  },
  '&:active': {
    backgroundColor: '#0e3c71',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)', // Reset lift effect
  },
});

// CustomerForm component
const CustomerForm = ({ onCustomerIdReceived }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const handleSwitchForm = () => {
    setIsNewCustomer(false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
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
      <Box 
        component="form"
        sx={{ 
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Box sx={{ marginBottom: '16px', textAlign: 'center' }}>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => setIsNewCustomer(!isNewCustomer)}
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
    </Box>
  );
};

export default CustomerForm;