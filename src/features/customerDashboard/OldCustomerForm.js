import React, { useState } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
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

const OldCustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess, onNewCustomer }) => {
  const { t } = useTranslation('oldCustomerForm');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      const customerId = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessId);
  
      if (customerId) {
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments);
          throw new Error('Selected appointments data is not in the correct format.');
        }

        const localTime = new Date(selectedAppointments[0].appointmentTime);
        const utcAppointmentTime = localTime.toISOString();

        const combinedAppointmentDetails = {
          customerId: parseInt(customerId, 10),
          businessId: parseInt(businessId, 10),
          appointmentTime: utcAppointmentTime,
          status: 'Pending',
          comment: comment || '',
          services: selectedAppointments.flatMap(appointment => 
            appointment.services.map(service => ({
              serviceId: service.serviceId,
              staffId: service.staffId,
              duration: service.duration,
              price: service.price,
            }))
          )
        };

        await addAppointmentAndUpdateList(combinedAppointmentDetails);
        setSuccess(true);
        onAppointmentSuccess(customerId);
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
            disabled={!emailOrPhone.trim()}
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

      <Snackbar
        open={success}
        autoHideDuration={6000}
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
