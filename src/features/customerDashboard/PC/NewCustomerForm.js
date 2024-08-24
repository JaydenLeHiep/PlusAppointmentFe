import React, { useState } from 'react';
import { Snackbar, Alert, Box, Checkbox, Typography } from '@mui/material';
import { useCustomersContext } from '../../../context/CustomerContext';
import { fetchCustomerId } from '../../../lib/apiClientCustomer';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  FormTitle,
} from '../../../styles/CustomerStyle/PCVersion/NewCustomerFormStyle';

const NewCustomerForm = ({ businessId, onCustomerAdded }) => {
  const { addNewCustomer } = useCustomersContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the customer already exists by calling fetchCustomerId
      const existingCustomer = await fetchCustomerId(formData.email || formData.phone);

      // If the customer already exists, show an error and return early
      if (existingCustomer && existingCustomer.customerId) {
        setSubmitError('Customer already exists with the provided email or phone number.');
        return;
      }

      // If customer not found, proceed with adding the new customer
      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        BusinessId: String(businessId)
      };

      // Add the new customer
      const newCustomer = await addNewCustomer(customerDetails, businessId);

      // Trigger success state and inform the parent component
      setSubmitSuccess(true);
      setSubmitError('');
      onCustomerAdded(newCustomer); // Pass the customer data to the parent component

      // Reset form data after successful addition
      setFormData({
        name: '',
        email: '',
        phone: ''
      });

    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add customer.';
      setSubmitError(errorMessage);
    }
  };

  return (
    <FormContainer>
      <FormTitle>New Customer</FormTitle>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          fullWidth
          margin="normal"
          required
        />

        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            color="primary"
          />
          <Typography variant="body2">
            I accept to provide my email and phone number to book a new appointment
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!acceptTerms}  // Disable the button if the checkbox is not checked
          >
            Submit
          </CustomButton>
        </Box>
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