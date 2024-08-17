import React, { useState } from 'react';
import { fetchCustomerId } from '../../../lib/apiClientCustomer';
import { CustomButton, FormContainer, StyledTextField } from '../../../styles/CustomerStyle/OldCustomerFormStyle';

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
    <FormContainer>
      <form onSubmit={handleFormSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label="Email or Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
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
    </FormContainer>
  );
};

export default OldCustomerForm;