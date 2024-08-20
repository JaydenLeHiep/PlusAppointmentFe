import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log("OldCustomerForm received selectedAppointments:", selectedAppointments);
    console.log("Business ID:", businessId); // Add this to verify the businessId is received correctly
  }, [selectedAppointments, businessId]);

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
  
        console.log("Business ID:", businessId);
  
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments);
          throw new Error('Selected appointments data is not in the correct format.');
        }
  
        const appointmentDetails = selectedAppointments.map(appointment => {
          return {
            customerId: parseInt(customerId, 10),
            businessId: parseInt(businessId, 10),
            appointmentTime: appointment.date.toISOString(), // Keep the combined date-time as is
            status: 'Pending',
            comment: comment || '',
            services: appointment.services.map(service => ({
              serviceId: service.serviceId,
              staffId: service.staffId,
            })),
          };
        });
  
        console.log("Final appointment details:", JSON.stringify(appointmentDetails, null, 2));
  
        // Use addAppointmentAndUpdateList from AppointmentsContext
        await Promise.all(
          appointmentDetails.map(async (details) => {
            await addAppointmentAndUpdateList(details);
          })
        );
  
        setSuccess(true);
        onAppointmentSuccess();
      } else {
        throw new Error('Customer not found');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error during form submission:", error.response.data.message || error.message || error);
        setError(error.response.data.message || 'Failed to find customer or add appointment');
      } else {
        console.error("Error during form submission:", error.message || error);
        setError(error.message || 'Failed to find customer or add appointment');
      }
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