import React, { useState } from 'react';
import { IconButton, Snackbar, Alert, CircularProgress, Backdrop, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { fetchCustomerByEmailOrPhoneAndBusinessId } from '../../lib/apiClientCustomer';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import {
  CustomButton,
  FormContainer,
  StyledTextField,
  FormTitle,
  NewCustomerLink,
  StyledBackdrop,
  DialogContentContainer,
  BoldTypography,
  StyledDialogActions,
  CancelButton,
  ProceedButton,
} from '../../styles/CustomerStyle/OldCustomerFormStyle';
import { useTranslation } from 'react-i18next';

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
  const [fetchedCustomer, setFetchedCustomer] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const { addAppointmentAndUpdateList, fetchAppointmentsForCustomer, deleteAppointmentForCustomer } = useAppointmentsContext();

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
        setFetchedCustomer(customer);
        const appointmentsData = await fetchAppointmentsForCustomer(customer.customerId);
        const appointments = appointmentsData?.$values || [];

        if (appointments.length > 0) {
          setCustomerAppointments(appointments);
          setShowModal(true);
          setIsSubmitting(false);
        } else {
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
            setIsSubmitting(false);
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
    if (isSubmitting) return;
    setCountdown(0);
    onNewCustomer();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
  };

  const handleConfirmProceed = () => {
    if (fetchedCustomer) {
      proceedWithSubmission(fetchedCustomer);
    }
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAppointment) {
      try {
        await deleteAppointmentForCustomer(selectedAppointment.appointmentId, selectedAppointment.businessId);
        setCustomerAppointments((prevAppointments) => prevAppointments.filter(
          (appointment) => appointment.appointmentId !== selectedAppointment.appointmentId
        ));
      } catch (error) {
        console.error('Error deleting appointment:', error.message);
      }
    }
    setConfirmationOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelDelete = () => {
    setConfirmationOpen(false);
    setSelectedAppointment(null);
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

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          {t('successMessage')}
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <StyledBackdrop component={Backdrop} open={isSubmitting || (countdown > 0 && success)}>
        <CircularProgress color="inherit" />
        {countdown > 0 && (
          <BoldTypography variant="h6">
            {t('loading')} {countdown}
          </BoldTypography>
        )}
      </StyledBackdrop>

      <Dialog open={showModal} onClose={handleCloseModal} key={i18n.language}>
        <DialogTitle>
          {t('Welcomeback')}, {customerAppointments.length > 0 ? customerAppointments[0].customerName : ''}!
        </DialogTitle>
        <DialogContent dividers>
          {customerAppointments.length > 0 ? (
            <>
              <BoldTypography variant="body1">
                {t('appointmentInfo', { count: customerAppointments.length })}
              </BoldTypography>
              <List>
                {customerAppointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(appointment)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
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
            <BoldTypography>{t('noAppointmentsMessage')}</BoldTypography>
          )}
        </DialogContent>
        <ConfirmationDialog
          open={confirmationOpen}
          title={t('deleteAppointmentTitle', 'Delete Appointment')}
          content={t('deleteAppointmentContent', 'Are you sure you want to delete this appointment?')}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />

        <DialogContentContainer>
          <BoldTypography>
            {t('doYouWantToBookMore')}
          </BoldTypography>
        </DialogContentContainer>

        <StyledDialogActions>
          <CancelButton onClick={handleCloseModal}>
            {t('Cancel')}
          </CancelButton>

          <ProceedButton onClick={handleConfirmProceed} autoFocus>
            {t('Submit')}
          </ProceedButton>
        </StyledDialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default OldCustomerForm;