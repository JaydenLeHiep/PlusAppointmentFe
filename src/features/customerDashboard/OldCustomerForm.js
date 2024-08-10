import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerCss/CustomerForm.css';
import { fetchCustomerId } from '../../lib/apiClientCustomer';

const OldCustomerForm = ({ onCustomerIdReceived }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerId = await fetchCustomerId(formData.emailOrPhone);
      onCustomerIdReceived(customerId);

      // Reset form data after submission if needed
      setFormData({
        emailOrPhone: '',
      });
    } catch (error) {
      console.error('Error fetching customer ID:', error.message);
    }
  };

  return (
    <Box 
      className="customer-form"
      sx={{
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
        maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Email or Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            mb: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            padding: '12px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Submit
        </CustomButton>
      </form>
    </Box>
  );
};

export default OldCustomerForm;