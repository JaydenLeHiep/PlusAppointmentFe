import React, { useState } from 'react';
import { Box } from '@mui/material';
import { StyledTextField, CustomButton, FormContainer, FormTitle } from '../../../styles/CustomerStyle/UpdateAppointmentStyles/UpdateAppointmentCustomerStyles';
import { useTranslation } from 'react-i18next';

const UpdateAppointmentCustomer = ({ onRetrieveAppointment }) => {
  const { t } = useTranslation('updateAppointment');
  const [inputData, setInputData] = useState({ email: '', phone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleRetrieveAppointment = (e) => {
    e.preventDefault();
    if (inputData.email || inputData.phone) {
      onRetrieveAppointment(inputData);
    } else {
      alert("Please enter either email or phone");
    }
  };

  return (
    <FormContainer>
      <FormTitle>{t('retrieveAppointment')}</FormTitle>
      <form onSubmit={handleRetrieveAppointment} style={{ width: '100%', maxWidth: '400px' }}>
        <StyledTextField
          label={t('phoneLabel')}
          name="phone"
          value={inputData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label={t('emailLabel')}
          name="email"
          value={inputData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Box display="flex" justifyContent="center">
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('retrieveButton')}
          </CustomButton>
        </Box>
      </form>
    </FormContainer>
  );
};

export default UpdateAppointmentCustomer;