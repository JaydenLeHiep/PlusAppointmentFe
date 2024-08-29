import React, { Fragment, useRef, useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import { useTranslation } from 'react-i18next';
import SearchBar from '../SearchBarContainer'; // Ensure the correct path to the SearchBar component

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
      {/* Integrate the SearchBar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchCustomer')}  // This translates the search placeholder
      />

      <List>
        {filteredCustomers.map((customer) => (
          <Fragment key={customer.customerId}>
            <ListItem
              sx={{
                borderRadius: '8px',
                backgroundColor: '#f0f8ff',
                mb: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #1976d2',
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#e6f1ff',
                },
              }}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label={t('editCustomer')} onClick={() => handleEditCustomer(customer)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label={t('deleteCustomer')} onClick={() => confirmDeleteCustomer(customer.customerId)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {customer.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {customer.email}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      {customer.phone}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {editCustomerId === customer.customerId && (
              <Collapse in={editCustomerId === customer.customerId}>
                <Box ref={formRef}>
                  <CustomerForm
                    title={t('updateCustomer')}  // This translates "Update Customer"
                    customer={newCustomer}
                    setCustomer={setCustomer}
                    handleAction={() => handleUpdateCustomer(customer.customerId)}
                    handleCancelForm={handleCancelForm}
                    buttonText={t('updateCustomer')}  // This translates the button text
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
