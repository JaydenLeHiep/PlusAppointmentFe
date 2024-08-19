import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { fetchCustomerByEmailOrPhone } from '../../../lib/apiClientCustomer';
import { addAppointment } from '../../../lib/apiClientAppointment';

const OldCustomerForm = ({ selectedAppointments, onAppointmentSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("OldCustomerForm received selectedAppointments:", selectedAppointments);
  }, [selectedAppointments]);

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
      console.log("Checking if customer exists with Email/Phone:", emailOrPhone);
      const customerId = await fetchCustomerByEmailOrPhone(emailOrPhone);
  
      if (customerId) {
        console.log("Customer exists. Customer ID:", customerId);
  
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments); // Log the problematic data
          throw new Error('Selected appointments data is not in the correct format.');
        }
  
        // Log the structure of each appointment before mapping services
        selectedAppointments.forEach((appointment, index) => {
          console.log(`Appointment ${index} structure:`, appointment);
          console.log(`Services for appointment ${index}:`, appointment.services);
        });
  
        const appointmentDetails = selectedAppointments.map(appointment => {
          if (!appointment.services || !Array.isArray(appointment.services)) {
            console.error('Error with appointment services:', appointment.services);
            throw new Error('Appointment services data is not in the correct format.');
          }
  
          return {
            customerId,
            businessId: appointment.businessId, // Ensure businessId is present
            appointmentTime: new Date(appointment.date).toISOString(),
            status: 'pending',
            comment,
            services: appointment.services.map(service => ({
              serviceId: service.serviceId,
              staffId: service.staffId
            }))
          };
        });
  
        // Log the final appointment details before sending
        console.log("Final appointment details to be sent to backend:", appointmentDetails);
  
        await addAppointment(appointmentDetails);
        setSuccess(true);
        onAppointmentSuccess();
      } else {
        throw new Error('Customer not found');
      }
    } catch (error) {
      console.error("Error during form submission:", error.message || error);
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

      {/* Snackbar for success */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Appointment successfully created!
        </Alert>
      </Snackbar>

      {/* Snackbar for error */}
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