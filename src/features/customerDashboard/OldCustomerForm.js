import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography, CircularProgress, Backdrop, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
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
import { List, ListItem, ListItemText, Divider } from '@mui/material';
const OldCustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess, onNewCustomer }) => {
  const { t, i18n } = useTranslation('oldCustomerForm');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerAppointments, setCustomerAppointments] = useState([]);
  const [fetchedCustomer, setFetchedCustomer] = useState(null); // Store the fetched customer

  const { addAppointmentAndUpdateList, fetchAppointmentsForCustomer } = useAppointmentsContext();

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
      // Fetch the customer using email or phone
      const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessId);

      if (customer.customerId) {
        setFetchedCustomer(customer); // Store the fetched customer

        // Fetch appointments for this customer using the customer ID
        const appointmentsData = await fetchAppointmentsForCustomer(customer.customerId);

        // Check if appointmentsData and its $values array exist
        const appointments = appointmentsData?.$values || []; // Access the appointments array

        // Check if there are any existing appointments
        if (appointments.length > 0) {
          setCustomerAppointments(appointments); // Store them in state
          setShowModal(true); // Show the modal
          setIsSubmitting(false); // Stop the submission process to wait for user confirmation
        } else {
          // If no appointments exist, proceed directly with submission
          proceedWithSubmission(customer);
        }
      } else {
        throw new Error(t('errorMessage'));
      }
    } catch (error) {
      console.error("Error during form submission:", error.message || error);
      setError(error.message || t('errorMessage'));
      setIsSubmitting(false);
    }
  };

  // Function to proceed with appointment booking after checking appointments
  const proceedWithSubmission = async (customer) => {
    setShowModal(false);
    setIsSubmitting(true);

    try {
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

      setCountdown(2);
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

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
  };

  const handleConfirmProceed = () => {
    if (fetchedCustomer) {
      proceedWithSubmission(fetchedCustomer); // Use the stored customer data
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
        open={isSubmitting || (countdown > 0 && success)}
        style={{ zIndex: 9999, color: '#fff', display: 'flex', flexDirection: 'column' }}
      >
        <CircularProgress color="inherit" />
        {countdown > 0 && (
          <Typography variant="h6" style={{ marginTop: '20px', color: '#fff' }}>
            {t('loading')} {countdown}
          </Typography>
        )}
      </Backdrop>

      <Dialog open={showModal} onClose={handleCloseModal} key={i18n.language}>
        <DialogTitle>
          {t('Welcomeback')}, {customerAppointments.length > 0 ? customerAppointments[0].customerName : ''}!
        </DialogTitle>
        <DialogContent dividers>
          {customerAppointments.length > 0 ? (
            <>
              <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
    {t('appointmentInfo', { count: customerAppointments.length })}
</Typography>
              <List>
                {customerAppointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                       primary={`${index + 1}. ${t('appointmentOn')} ${new Date(appointment.appointmentTime).toLocaleDateString()} ${t('at')} ${new Date(appointment.appointmentTime).toLocaleTimeString()}`}
                       secondary={`${t('services')}: ${appointment.services?.$values?.map((service) => service.name).join(', ') || t('noSpecificService')}`}
                      />
                    </ListItem>
                    {index < customerAppointments.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>

            </>
          ) : (
            <Typography>{t('noAppointmentsMessage')}</Typography>
          )}
        </DialogContent>


        <Box sx={{ padding: '16px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
    {t('doYouWantToBookMore')}
</Typography>
          </Typography>
        </Box>



        <DialogActions>
          {/* Styled Cancel Button */}
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="secondary"
            sx={{
              textTransform: 'none',
              padding: '8px 24px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              borderColor: '#f44336',
              color: '#f44336',
              flexGrow: 1,
              maxWidth: '100px',
              '&:hover': {
                backgroundColor: '#ffe6e6',
                borderColor: '#f44336',
              },
            }}
          >
            {t('Cancel')}
          </Button>

          {/* Styled Proceed Button */}
          <Button
            onClick={handleConfirmProceed}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              padding: '8px 24px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              backgroundColor: '#4caf50',
              flexGrow: 1,
              maxWidth: '100px',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
            autoFocus
          >
            {t('Submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default OldCustomerForm;