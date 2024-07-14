import React, { useState } from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerForm.css';
import { fetchCustomerId } from '../../lib/apiClientCustomer';

const CustomerForm = ({ businessId, onCustomerIdReceived, selectedService, selectedStaff }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    saveData: false,
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerId = await fetchCustomerId(formData.emailOrPhone);
      onCustomerIdReceived(customerId);



      // Reset form data after submission if needed
      setFormData({
        name: '',
        emailOrPhone: '',
        saveData: false,
      });

      // No appointment creation logic here
    } catch (error) {
      console.error('Error fetching customer ID:', error.message);
    }
  };

  return (
    <Box className="customer-form">
      <Typography variant="h6">
        {isNewCustomer ? 'New Customer' : 'Existing Customer'}
      </Typography>
      <CustomButton
        variant="contained"
        color="primary"
        onClick={() => setIsNewCustomer(!isNewCustomer)}
      >
        {isNewCustomer ? 'Switch to Existing Customer' : 'Switch to New Customer'}
      </CustomButton>
      <form onSubmit={handleFormSubmit}>
        {isNewCustomer && (
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        )}
        <TextField
          label={isNewCustomer ? "Email" : "Email or Phone"}
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        {isNewCustomer && (
          <FormControlLabel
            control={
              <Checkbox
                name="saveData"
                checked={formData.saveData}
                onChange={handleInputChange}
              />
            }
            label="Save my data for future bookings"
          />
        )}
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

export default CustomerForm;
