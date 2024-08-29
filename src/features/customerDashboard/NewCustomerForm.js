import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress } from '@mui/material';
import { useCustomersContext } from '../../context/CustomerContext';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  FormTitle,
  NewCustomerLink // Importing the NewCustomerLink styled component
} from '../../styles/CustomerStyle/NewCustomerFormStyle';
import Terms from './Terms';

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
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        BusinessId: String(businessId)
      };

      const newCustomer = await addNewCustomer(customerDetails, businessId);

      setSubmitSuccess(true);
      setSubmitError('');
      onCustomerAdded(newCustomer);

      setFormData({
        name: '',
        email: '',
        phone: ''
      });

      setShowRedirectMessage(true);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownInterval);
            setShowRedirectMessage(false);
            onCustomerAdded(newCustomer); 
          }
          return prevCount - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add customer.';
      setSubmitError(errorMessage);
    }
  };

  const handleOpenTerms = () => {
    setTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setTermsOpen(false);
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

        <Box display="flex" justifyContent="center" mt={2}>
          <NewCustomerLink onClick={handleOpenTerms}>
            Read and Accept Terms
          </NewCustomerLink>
        </Box>

        <Box display="flex" justifyContent="center">
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!acceptTerms}  // Disable the button if the terms are not accepted
          >
            Submit
          </CustomButton>
        </Box>
      </form>

      {showRedirectMessage && (
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="success.main" mb={2}>
            Add your data successfully! Please come back to Your Information to finish booking.
          </Typography>
          <CircularProgress
            variant="determinate"
            value={(countdown / 5) * 100}
            size={40}
            thickness={4}
          />
          <Typography variant="body2" mt={1}>
            Redirecting in {countdown}...
          </Typography>
        </Box>
      )}

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

      <Terms
        open={termsOpen}
        handleClose={handleCloseTerms}
        setAcceptTerms={setAcceptTerms}
      />
    </FormContainer>
  );
};

export default NewCustomerForm;