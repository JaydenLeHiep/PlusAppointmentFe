import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress, Checkbox,  Backdrop } from '@mui/material';
import { useCustomersContext } from '../../context/CustomerContext';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  FormTitle,
  NewCustomerLink
} from '../../styles/CustomerStyle/NewCustomerFormStyle';
import Terms from './Terms';
import { useTranslation } from 'react-i18next';

const NewCustomerForm = ({ businessId, onCustomerAdded }) => {
  const { t } = useTranslation('newCustomerForm');
  const { addNewCustomer } = useCustomersContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    confirmPhone: '',
    birthday: '',
    wantsPromotion: false,
    note: null,
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [termsOpen, setTermsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      setSubmitError(t('emailMismatchError'));
      return;
    }

    if (formData.phone !== formData.confirmPhone) {
      setSubmitError(t('phoneMismatchError'));
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const localBirthday = new Date(formData.birthday);
      const utcBirthday = localBirthday.toISOString(); // Convert to UTC

      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthday: utcBirthday, // Send UTC birthday to server
        wantsPromotion: formData.wantsPromotion,
        note: null
      };

      const newCustomer = await addNewCustomer(businessId, customerDetails);

      setSubmitSuccess(true);
      setSubmitError('');
      onCustomerAdded(newCustomer);

      setFormData({
        name: '',
        email: '',
        confirmEmail: '',
        phone: '',
        confirmPhone: '',
        birthday: '',
        wantsPromotion: false,
        note: null,
      });

      setCountdown(2);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownInterval);
            setIsSubmitting(false);
            onCustomerAdded(newCustomer);
          }
          return prevCount - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || t('errorSnackbar');
      setSubmitError(errorMessage);
      setIsSubmitting(false);
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
      <FormTitle>{t('formTitle')}</FormTitle>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label={t('nameLabel')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <StyledTextField
          label={t('birthdayLabel')}
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <StyledTextField
          label={t('emailLabel')}
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <StyledTextField
          label={t('confirm Email')}
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <StyledTextField
          label={t('phoneLabel')}
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <StyledTextField
          label={t('confirm Phone')}
          name="confirmPhone"
          value={formData.confirmPhone}
          onChange={(e) => setFormData({ ...formData, confirmPhone: e.target.value })}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting} // Disable input when submitting
        />
        <Box display="flex" flexDirection="column" alignItems="center" mt={2} width="100%">
          {/* First Checkbox and Link */}
          <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Box flex="0 0 30px" display="flex" justifyContent="center"> {/* Control the width for left alignment of checkbox */}
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
            </Box>
            <NewCustomerLink onClick={handleOpenTerms} style={{ textAlign: 'center', flex: 1 }}>
              {t('readAndAcceptTerms')}
            </NewCustomerLink>
          </Box>

          {/* Second Checkbox and Label */}
          <Box display="flex" alignItems="center" justifyContent="center" width="100%" mt={1}>
            <Box flex="0 0 30px" display="flex" justifyContent="center"> {/* Control the width for left alignment of checkbox */}
              <Checkbox
                checked={formData.wantsPromotion}
                onChange={(e) => setFormData({ ...formData, wantsPromotion: e.target.checked })}
              />
            </Box>
            <Typography style={{ textAlign: 'center', flex: 1 }}>
              {t('wantsPromotionLabel')}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center"> 
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !acceptTerms ||
              !formData.name ||
              !formData.email ||
              !formData.confirmEmail ||
              !formData.phone ||
              !formData.confirmPhone ||
              !formData.birthday ||
              isSubmitting
            }
          >
            {t('submitButton')}
          </CustomButton>
        </Box>
      </form>

      {/* Snackbar and Terms components remain the same */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={2000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {t('successSnackbar')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!submitError}
        autoHideDuration={2000}
        onClose={() => setSubmitError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {submitError}
        </Alert>
      </Snackbar>

      <Terms
        open={termsOpen}
        handleClose={handleCloseTerms}
      />

      {/* Add the Backdrop component to disable interactions when submitting */}
      <Backdrop open={isSubmitting} style={{ zIndex: 9999, color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginTop: '20px', color: '#fff' }}>
          {t('Submitting, please wait...')} ({countdown}
        </Typography>
      </Backdrop>
    </FormContainer>
  );
};

export default NewCustomerForm;