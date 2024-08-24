import React, { useState } from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { fetchCustomerByEmailOrPhone } from '../../../lib/apiClientCustomer';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import {
  CustomButton,          
  FormContainer,         
  StyledTextField       
} from '../../../styles/CustomerStyle/OldCustomerFormStyle'; 

const OldCustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess, onNewCustomer }) => {
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
      const customerId = await fetchCustomerByEmailOrPhone(emailOrPhone);
  
      if (customerId) {
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments);
          throw new Error('Selected appointments data is not in the correct format.');
        }
  
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
  
        // Log the combined appointment details to the console before sending it to the backend
        console.log('Finalized Appointment Details:', combinedAppointmentDetails);
  
        await addAppointmentAndUpdateList(combinedAppointmentDetails);
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
    <FormContainer>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>Your Information</Typography>
      <form onSubmit={handleFormSubmit}>
        <StyledTextField
          label="Email or Phone"
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <StyledTextField
          label="Comment"
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
          >
            Finish
          </CustomButton>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography
            variant="body2"
            color="primary"
            onClick={onNewCustomer}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            If you are a new customer, click here
          </Typography>
        </Box>
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
    </FormContainer>
  );
};

export default OldCustomerForm;