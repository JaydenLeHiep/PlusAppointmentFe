import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useCustomersContext } from '../../../context/CustomerContext'; 
import { useAppointmentsContext } from '../../../context/AppointmentsContext'; 
import {
  CustomButton,
  FormContainer,
  StyledTextField
} from '../../../styles/CustomerStyle/NewCustomerFormStyle';

const NewCustomerForm = ({ businessId, selectedAppointments, onAppointmentSuccess, onSwitchForm }) => {
  const { checkIfCustomerExists, addNewCustomer } = useCustomersContext();
  const { addAppointmentAndUpdateList } = useAppointmentsContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    try {
      console.log('Checking if customer exists with email/phone:', formData.email || formData.phone);
      const existingCustomerId = await checkIfCustomerExists(formData.email || formData.phone);

      if (existingCustomerId) {
        console.warn('User already exists. Customer ID:', existingCustomerId);
        setSubmitError('User already exists. Please switch to the Existing Customer form.');
        return;
      } else {
        console.log('Customer does not exist, proceeding to add new customer.');
      }

      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        BusinessId: String(businessId)
      };

      const newCustomer = await addNewCustomer(customerDetails, businessId);
      console.log('New customer added successfully:', newCustomer);

      setSubmitSuccess(true);
      setSubmitError('');

      // Reset form data after submission if needed
      setFormData({
        name: '',
        email: '',
        phone: ''
      });

      // Combine all services into one appointment object
      const combinedAppointmentDetails = {
        customerId: parseInt(newCustomer.id, 10),
        businessId: parseInt(businessId, 10),
        appointmentTime: selectedAppointments[0].appointmentTime, // Use the appointment time from the first service (assumes all services share the same date and time)
        status: 'Pending',
        comment: '', // Add a comment if needed
        services: selectedAppointments.flatMap(appointment => 
          appointment.services.map(service => ({
            serviceId: service.serviceId,
            staffId: service.staffId,
            duration: service.duration,
            price: service.price,
          }))
        )
      };

      console.log('Adding appointment for new customer:', combinedAppointmentDetails);
      await addAppointmentAndUpdateList(combinedAppointmentDetails);
      console.log('Appointment added successfully for new customer:', combinedAppointmentDetails);

      // Notify parent component of successful appointment creation
      onAppointmentSuccess(newCustomer.id, selectedAppointments);

      // Redirect to OldCustomerForm after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onSwitchForm(); // Switch to the Old Customer form
      }, 3000);

    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error adding new customer';
      setSubmitError(errorMessage);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddCustomer();
  };

  return (
    <FormContainer>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <StyledTextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </CustomButton>
      </form>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Customer added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {submitError}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default NewCustomerForm;