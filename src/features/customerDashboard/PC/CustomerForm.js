import React, { useState } from 'react';
import { CustomButton, FormContainer, FormTitle, InnerFormContainer } from '../../../styles/CustomerStyle/CustomerFormStyle';
import NewCustomerForm from './NewCustomerForm';
import OldCustomerForm from './OldCustomerForm';

// CustomerForm component
const CustomerForm = ({ onCustomerIdReceived }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

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
          <NewCustomerForm onCustomerIdReceived={onCustomerIdReceived} />
        ) : (
          <OldCustomerForm onCustomerIdReceived={onCustomerIdReceived} />
        )}
      </InnerFormContainer>
    </FormContainer>
  );
};

export default CustomerForm;