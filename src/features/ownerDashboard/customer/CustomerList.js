import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Box, Collapse, List, ListItemText } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CustomerForm from './CustomerForm';
import SearchBar from '../SearchBarContainer'; 
import {
  StyledListItem,
  StyledListItemTextPrimary,
  StyledListItemTextSecondary,
  StyledIconButton,
} from '../../../styles/OwnerStyle/CustomerComponent/CustomerListStyles';

const CustomerList = ({
  customers,
  editCustomerId,
  handleEditCustomer,
  confirmDeleteCustomer,
  newCustomer,
  setCustomer,
  handleUpdateCustomer,
  handleCancelForm,
}) => {
  const { t } = useTranslation("customerList");  // Initialize the translation hook
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (editCustomerId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editCustomerId]);

  // Filter customers based on the search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchCustomer')}
      />
      <List>
        {filteredCustomers.map((customer) => (
          <Fragment key={customer.customerId}>
            <StyledListItem
              secondaryAction={
                <>
                  <StyledIconButton aria-label={t('editCustomer')} onClick={() => handleEditCustomer(customer)}>
                    <Edit />
                  </StyledIconButton>
                  <StyledIconButton aria-label={t('deleteCustomer')} onClick={() => confirmDeleteCustomer(customer.customerId)}>
                    <Delete />
                  </StyledIconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <StyledListItemTextPrimary variant="body1" component="span">
                    {customer.name}
                  </StyledListItemTextPrimary>
                }
                secondary={
                  <>
                    <StyledListItemTextSecondary variant="body2" component="span">
                      {customer.email}
                    </StyledListItemTextSecondary>
                    <StyledListItemTextSecondary variant="body2" component="span">
                      {customer.phone}
                    </StyledListItemTextSecondary>
                  </>
                }
              />
            </StyledListItem>
            {editCustomerId === customer.customerId && (
              <Collapse in={editCustomerId === customer.customerId}>
                <Box ref={formRef}>
                  <CustomerForm
                    title={t('updateCustomer')}
                    customer={newCustomer}
                    setCustomer={setCustomer}
                    handleAction={() => handleUpdateCustomer(customer.customerId)}
                    handleCancelForm={handleCancelForm}
                    buttonText={t('updateCustomer')}
                    buttonColor="#28a745"
                  />
                </Box>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CustomerList;