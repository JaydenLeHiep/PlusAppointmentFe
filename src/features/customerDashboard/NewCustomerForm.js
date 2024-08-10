import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
import CustomButton from './CustomerButton';
import '../../styles/css/CustomerCss/CustomerForm.css';
import { addCustomer } from '../../lib/apiClientCustomer';

const NewCustomerForm = ({ onCustomerIdReceived, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    saveData: false,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      const newCustomer = await addCustomer(customerDetails);
      onCustomerIdReceived(newCustomer.id);
      setSubmitSuccess(true);

      // Reset form data after submission if needed
      setFormData({
        name: '',
        email: '',
        phone: '',
        saveData: false,
      });

      // Redirect to OldCustomerForm after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onSwitchForm();
      }, 3000);
    } catch (error) {
      setSubmitError('Error adding new customer');
      console.error('Error adding new customer:', error.message);
    }
  };

  return (
    <Box 
      className="customer-form"
      sx={{
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
        maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            mb: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            mb: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            mb: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="saveData"
              checked={formData.saveData}
              onChange={handleInputChange}
              sx={{
                color: '#007bff',
              }}
            />
          }
          label="Save my data for future bookings"
          sx={{
            mb: 2,
            color: '#1976d2',
            '& .MuiTypography-root': {
              fontWeight: 'bold',
            },
          }}
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formData.saveData}
          sx={{
            width: '100%',
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            padding: '12px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
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
    </Box>
  );
};

export default NewCustomerForm;