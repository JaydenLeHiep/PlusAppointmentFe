import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress, Backdrop } from '@mui/material';
import { fetchCustomerByEmailOrPhoneAndBusinessId } from '../../lib/apiClientCustomer';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  FormTitle,
  NewCustomerLink,
} from '../../styles/CustomerStyle/OldCustomerFormStyle';
import { useTranslation } from 'react-i18next';

const OldCustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess, onNewCustomer, customer }) => {
  const { t } = useTranslation('oldCustomerForm');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addAppointmentAndUpdateList } = useAppointmentsContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailOrPhone') {
      setEmailOrPhone(value);
    } else if (name === 'comment') {
      setComment(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessId);

      if (customer.customerId) {
        if (!Array.isArray(selectedAppointments)) {
          throw new Error('Selected appointments data is not in the correct format.');
        }

        const localTime = new Date(selectedAppointments[0].appointmentTime);
        const utcAppointmentTime = localTime.toISOString();

        const combinedAppointmentDetails = {
          customerId: parseInt(customer.customerId, 10),
          businessId: parseInt(businessId, 10),
          appointmentTime: utcAppointmentTime,
          status: 'Pending',
          comment: comment || '',
          services: selectedAppointments.flatMap((appointment) =>
            appointment.services.map((service) => ({
              serviceId: service.serviceId,
              staffId: service.staffId,
              duration: service.duration,
              price: service.price,
            }))
          ),
        };

        await addAppointmentAndUpdateList(combinedAppointmentDetails);
        setSuccess(true);

        setCountdown(3);
        const countdownInterval = setInterval(() => {
          setCountdown((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(countdownInterval);
              setIsSubmitting(false); // Enable interactions again
              onAppointmentSuccess(customer);
            }
            return prevCount - 1;
          });
        }, 1000);
      } else {
        throw new Error(t('errorMessage'));
      }
    } catch (error) {
      console.error("Error during form submission:", error.message || error);
      setError(error.message || t('errorMessage'));
      setIsSubmitting(false);
    }
  };

  const handleNewCustomerClick = () => {
    if (isSubmitting) return; // Prevent interaction when submitting
    setCountdown(0); // Reset countdown to hide the Backdrop
    onNewCustomer(); // Proceed to the NewCustomerForm
  };

  return (
    <FormContainer>
      <FormTitle>{t('formTitle')}</FormTitle>
      <form onSubmit={handleFormSubmit}>
        <StyledTextField
          label={t('emailOrPhoneLabel')}
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          required
          disabled={isSubmitting}
        />

        <StyledTextField
          label={t('commentLabel')}
          name="comment"
          value={comment}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          disabled={isSubmitting}
        />

        <Box display="flex" justifyContent="center" mt={2}>
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || countdown > 0}
          >
            {t('finishButton')}
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
          {t('successMessage')}
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

      {/* Only show Backdrop during form submission or countdown */}
      <Backdrop
        open={isSubmitting || (countdown > 0 && success)} // Ensure it's only open during actual submission or successful countdown
        style={{ zIndex: 9999, color: '#fff', display: 'flex', flexDirection: 'column' }}
      >
        <CircularProgress color="inherit" />
        {countdown > 0 && (
          <Typography variant="h6" style={{ marginTop: '20px', color: '#fff' }}>
            {t('loading')} {countdown}
          </Typography>
        )}
      </Backdrop>
    </FormContainer>
  );
};

export default OldCustomerForm;