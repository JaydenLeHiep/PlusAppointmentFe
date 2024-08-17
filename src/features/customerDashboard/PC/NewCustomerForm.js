import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { addCustomer } from '../../../lib/apiClientCustomer';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  StyledCheckbox,
  StyledFormControlLabel
} from '../../../styles/CustomerStyle/NewCustomerFormStyle';

const NewCustomerForm = ({ onCustomerIdReceived, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    saveData: false,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      const newCustomer = await addCustomer(customerDetails);
      onCustomerIdReceived(newCustomer.id);
      setSubmitSuccess(true);

      // Reset form data after submission if needed
      setFormData({
        name: '',
        email: '',
        phone: '',
        saveData: false,
      });

      // Redirect to OldCustomerForm after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onSwitchForm();
      }, 3000);
    } catch (error) {
      setSubmitError('Error adding new customer');
      console.error('Error adding new customer:', error.message);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <StyledFormControlLabel
          control={
            <StyledCheckbox
              name="saveData"
              checked={formData.saveData}
              onChange={handleInputChange}
            />
          }
          label="Save my data for future bookings"
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formData.saveData}
        >
          Submit
        </CustomButton>
      </form>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Customer added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {submitError}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default NewCustomerForm;