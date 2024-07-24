import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerForm.css';
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
    <Box className="customer-form">
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Email or Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </CustomButton>
      </form>
    </Box>
  );
};

export default OldCustomerForm;
