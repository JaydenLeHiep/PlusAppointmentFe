import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { fetchCustomerByEmailOrPhone } from '../../../lib/apiClientCustomer';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import {
  CustomButton,          
  FormContainer,         
  StyledTextField,       
} from '../../../styles/CustomerStyle/OldCustomerFormStyle'; 

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
  
        if (!Array.isArray(selectedAppointments)) {
          console.error('Received selectedAppointments:', selectedAppointments);
          throw new Error('Selected appointments data is not in the correct format.');
        }

        // Combine all services into one appointment object
        const combinedAppointmentDetails = {
          customerId: parseInt(customerId, 10),
          businessId: parseInt(businessId, 10),
          appointmentTime: selectedAppointments[0].appointmentTime, // Use the appointment time from the first service (assumes all services share the same date and time)
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

        // Use addAppointmentAndUpdateList from AppointmentsContext to send the combined appointment
        await addAppointmentAndUpdateList(combinedAppointmentDetails);
  
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
    <FormContainer>
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

        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
        >
          Finish
        </CustomButton>
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
    </FormContainer>
  );
};

export default OldCustomerForm;