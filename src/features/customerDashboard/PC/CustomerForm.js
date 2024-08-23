import React, { useState, useEffect } from 'react';
import { CustomButton, FormTitle, InnerFormContainer } from '../../../styles/CustomerStyle/CustomerFormStyle';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

const CustomerForm = ({ selectedAppointments, businessId, onAppointmentSuccess }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    console.log("CustomerForm received selectedAppointments:", selectedAppointments);
  }, [selectedAppointments]);

  const handleSwitchForm = () => {
    setIsNewCustomer(!isNewCustomer);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <FormTitle variant="h5">
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
            businessId={businessId}
            onAppointmentSuccess={onAppointmentSuccess}
          />
        ) : (
          <OldCustomerForm
            selectedAppointments={selectedAppointments}
            businessId={businessId}
            onAppointmentSuccess={onAppointmentSuccess}
          />
        )}
      </InnerFormContainer>
    </div>
  );
};

export default CustomerForm;