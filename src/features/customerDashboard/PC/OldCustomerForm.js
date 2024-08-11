import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchCustomerId } from '../../../lib/apiClientCustomer';

// CustomButton styling
const CustomButton = styled(Button)({
  backgroundColor: '#1976d2', // Primary blue color
  color: '#fff', // Text color
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px', // Increased border-radius for a more modern look
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)', // Slight lift effect on hover
  },
  '&:active': {
    backgroundColor: '#0e3c71',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)', // Reset lift effect
  },
});

const OldCustomerForm = ({ onCustomerIdReceived }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerId = await fetchCustomerId(formData.emailOrPhone);
      onCustomerIdReceived(customerId);

      // Reset form data after submission if needed
      setFormData({
        emailOrPhone: '',
      });
    } catch (error) {
      console.error('Error fetching customer ID:', error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
        maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Email or Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
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
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            padding: '12px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Submit
        </CustomButton>
      </form>
    </Box>
  );
};

export default OldCustomerForm;