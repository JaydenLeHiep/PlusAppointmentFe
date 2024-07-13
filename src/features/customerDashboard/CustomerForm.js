import React, { useState } from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import CustomButton from './CustomerButton';// Import CustomButton component
import '../../styles/css/CustomerForm.css'; // Ensure correct path to your CSS file

const CustomerForm = () => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '', // Use a single field for email or phone
    saveData: false,
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
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
          label={isNewCustomer ? "Email" : "Email or Phone"} // Change label based on new/existing customer
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
