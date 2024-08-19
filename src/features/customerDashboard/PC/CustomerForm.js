import React, { useState, useEffect } from 'react';
import { CustomButton, FormContainer, FormTitle, InnerFormContainer } from '../../../styles/CustomerStyle/CustomerFormStyle';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

const CustomerForm = ({ selectedAppointments, onAppointmentSuccess }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    console.log("CustomerForm received selectedAppointments:", selectedAppointments);
  }, [selectedAppointments]);

  const handleSwitchForm = () => {
    setIsNewCustomer(!isNewCustomer);
  };

  return (
    <FormContainer>
      <FormTitle variant="h6">
        {isNewCustomer ? 'New Customer Form' : 'Existing Customer Form'}
      </FormTitle>
      <InnerFormContainer>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleSwitchForm}
        >
          {isNewCustomer ? 'Switch to Existing Customer' : 'Switch to New Customer'}
        </CustomButton>
        {isNewCustomer ? (
          <NewCustomerForm
            selectedAppointments={selectedAppointments}
            onAppointmentSuccess={onAppointmentSuccess}
          />
        ) : (
          <OldCustomerForm
            selectedAppointments={selectedAppointments}
            onAppointmentSuccess={onAppointmentSuccess}
          />
        )}
      </InnerFormContainer>
    </FormContainer>
  );
};

export default CustomerForm;