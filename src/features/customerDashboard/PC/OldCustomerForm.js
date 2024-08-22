import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { fetchCustomerByEmailOrPhone } from '../../../lib/apiClientCustomer';
import { useAppointmentsContext } from '../../../features/appointment/AppointmentsContext';

const OldCustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Call useAppointmentsContext hook at the top level of the component
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
      const customerId = await fetchCustomerByEmailOrPhone(emailOrPhone);

      if (customerId) {
        const combinedAppointmentDetails = {
          customerId: parseInt(customerId, 10),
          businessId: parseInt(businessId, 10),
          appointmentTime: selectedAppointments[0].appointmentTime,
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
        onAppointmentSuccess(); // Trigger parent component callback

        // Log to confirm the event dispatch
        console.log(`Dispatching appointmentAdded event for businessId: ${businessId}`);

        // Dispatch a custom event
        const event = new CustomEvent('appointmentAdded', { detail: { businessId } });
        window.dispatchEvent(event); // Dispatch the event globally
      } else {
        throw new Error('Customer not found');
      }
    } catch (error) {
      setError(error.message || 'Failed to find customer or add appointment');
    }
  };



  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Email or Phone"
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Comment"
          name="comment"
          value={comment}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Finish
        </Button>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Appointment successfully created!
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
    </Box>
  );
};

export default OldCustomerForm;
