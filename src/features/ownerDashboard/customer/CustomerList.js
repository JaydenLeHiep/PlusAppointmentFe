import React, { Fragment, useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();  // Initialize the translation hook
  const formRef = useRef(null);

  useEffect(() => {
    if (editCustomerId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editCustomerId]);

  return (
    <List>
      {customers.map((customer) => (
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
  );
};

export default CustomerList;
