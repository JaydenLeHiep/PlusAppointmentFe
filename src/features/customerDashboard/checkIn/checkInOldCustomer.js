import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress, Backdrop } from '@mui/material';
import { fetchCustomerByEmailOrPhoneAndBusinessId } from '../../../lib/apiClientCustomer';
import {
  FormContainer,
  StyledTextField,
  FormTitle,
  NewCustomerLink,
  CustomButton
} from '../../../styles/CustomerStyle/OldCustomerFormStyle';
import { useTranslation } from 'react-i18next';
import CheckInInfo from './CheckInInfo';

const CheckInOldCustomer = ({ businessId, onNewCustomer }) => {
  const { t } = useTranslation('checkInOldCustomer');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchedCustomer, setFetchedCustomer] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailOrPhone') {
      setEmailOrPhone(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessId);

      if (customer.customerId) {
        setFetchedCustomer(customer);
        setSuccess(true);
      } else {
        throw new Error(t('errorMessage'));
      }
    } catch (error) {
      console.error("Error during form submission:", error.message || error);
      setError(error.message || t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewCustomerClick = () => {
    if (isSubmitting) return;
    onNewCustomer();
  };

  // If success is true, navigate to CheckInInfo and pass onBack to handle the back action
  if (success && fetchedCustomer) {
    return (
      <CheckInInfo
        customerName={fetchedCustomer.name}
        customerId={fetchedCustomer.customerId}
        businessId={businessId}
        onBack={() => setSuccess(false)} // Set success to false to go back to the current view
      />
    );
  }

  return (
    <FormContainer>
      <FormTitle>{t('welcomeCheckIn')}</FormTitle>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label={t('emailOrPhoneLabel')}
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          required
          disabled={isSubmitting}
        />

        <Box display="flex" justifyContent="center">
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!emailOrPhone || isSubmitting}
          >
            {t('submitButton')}
          </CustomButton>
        </Box>

        <Box mt={2} textAlign="center">
          <NewCustomerLink onClick={handleNewCustomerClick} style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}>
            {t('newCustomerLink')}
          </NewCustomerLink>
        </Box>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {t('successMessage', { name: fetchedCustomer?.customerName })}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Backdrop
        open={isSubmitting}
        style={{ zIndex: 9999, color: '#fff', display: 'flex', flexDirection: 'column' }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginTop: '20px', color: '#fff' }}>
          {t('loading')}
        </Typography>
      </Backdrop>
    </FormContainer>
  );
};

export default CheckInOldCustomer;