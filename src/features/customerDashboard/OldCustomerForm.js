import React, { useState, useRef } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress } from '@mui/material';
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
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const loadingMessageRef = useRef(null);

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

    try {
      const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessId);

      if (customer.customerId) {
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments);
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
        setShowRedirectMessage(true);

        // Scroll to the loading message
        if (loadingMessageRef.current) {
          loadingMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        setCountdown(5);
        const countdownInterval = setInterval(() => {
          setCountdown((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(countdownInterval);
              setShowRedirectMessage(false);
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
    }
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
        />

        <StyledTextField
          label={t('commentLabel')}
          name="comment"
          value={comment}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />

        <Box display="flex" justifyContent="center" mt={2}>
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={countdown > 0} 
          >
            {t('finishButton')}
          </CustomButton>
        </Box>

        <Box mt={2} textAlign="center">
          <NewCustomerLink onClick={onNewCustomer}>
            {t('newCustomerLink')}
          </NewCustomerLink>
        </Box>
      </form>

      {showRedirectMessage && (
        <Box mt={2} textAlign="center" ref={loadingMessageRef}>
          <CircularProgress
            variant="determinate"
            value={(countdown / 5) * 100}
            size={40}
            thickness={4}
          />
          <Typography variant="body2" mt={1}>
            {t('Loading')} {countdown}...
          </Typography>
        </Box>
      )}

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
    </FormContainer>
  );
};

export default OldCustomerForm;