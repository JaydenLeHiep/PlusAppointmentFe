import React, { useState, useRef } from 'react';
import {
  RootContainer,
  StyledTableContainer,
  StyledTable,
} from '../../styles/CustomersInfo/CustomerInfoStyles';
import {
  TableBody, TableCell, TableHead, TableRow, IconButton, Typography, TextField, Box, Alert, Collapse, Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomerInfo = ({ businessId, customers }) => {
  const { t } = useTranslation('customerInfo');
  const [searchQuery, setSearchQuery] = useState('');
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [editCustomerData, setEditCustomerData] = useState({ name: '', email: '', phone: '' });
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const formRef = useRef(null);

  const handleEditCustomer = (customer) => {
    setEditCustomerId(customer.customerId);
    setEditCustomerData({ name: customer.name, email: customer.email, phone: customer.phone });
  };

  const handleUpdateCustomer = async (customerId) => {
    try {
      setAlert({ message: t('customerUpdatedSuccess'), severity: 'success' });
      setEditCustomerId(null);
    } catch (err) {
      setAlert({ message: err.message || t('customerUpdateError'), severity: 'error' });
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      setAlert({ message: t('customerDeletedSuccess'), severity: 'success' });
    } catch (err) {
      setAlert({ message: err.message || t('customerDeleteError'), severity: 'error' });
    }
  };

  const handleSendEmail = () => {
    // Logic for sending email
    console.log('Send email clicked');
  };

  const handleAddNewCustomer = () => {
    // Logic for adding a new customer
    console.log('Add new customer clicked');
  };

  // Filter customers based on search query
  const filteredCustomers = Array.isArray(customers) ? customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  ) : [];

  return (
    <RootContainer>
      {/* Search Bar and Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label={t('searchCustomer')}
          margin="dense"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '44.5%' }}
        />
        <Box display="flex" justifyContent="flex-start" sx={{ mr: 2 }}> 
          <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mr: 2 }}>
            {t('sendEmail')}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleAddNewCustomer}>
            {t('addCustomer')} 
          </Button>
        </Box>
      </Box>

      {filteredCustomers.length === 0 ? (
        <Typography>{t('noCustomersFound')}</Typography>
      ) : (
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc' }}>{t('information')}</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('bookings')}</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('lastBooking')}</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('edit')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell sx={{ width: '45%' }} style={{ border: '1px solid #ccc' }}>
                    <Typography variant="body1" fontWeight="bold">{customer.name}</Typography>
                    <Typography variant="body2">{customer.email}</Typography>
                    <Typography variant="body2">{customer.phone}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: '10%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.totalBookings || 0}</TableCell> {/* Bookings count */}
                  <TableCell sx={{ width: '35%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.lastBooking || t('noBookings')}</TableCell> {/* Last booking */}
                  <TableCell sx={{ width: '10%' }} align="center" style={{ border: '1px solid #ccc' }}>
                    <IconButton onClick={() => handleEditCustomer(customer)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCustomer(customer.customerId)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>

                  {/* Edit form for the selected customer */}
                  {editCustomerId === customer.customerId && (
                    <TableRow>
                      <TableCell colSpan={4} style={{ border: '1px solid #ccc' }}>
                        <Collapse in={editCustomerId === customer.customerId}>
                          <Box ref={formRef} mt={2}>
                            <TextField
                              label={t('customerName')}
                              fullWidth
                              margin="dense"
                              value={editCustomerData.name}
                              onChange={(e) =>
                                setEditCustomerData({ ...editCustomerData, name: e.target.value })
                              }
                            />
                            <TextField
                              label={t('customerEmail')}
                              fullWidth
                              margin="dense"
                              value={editCustomerData.email}
                              onChange={(e) =>
                                setEditCustomerData({ ...editCustomerData, email: e.target.value })
                              }
                            />
                            <TextField
                              label={t('customerPhone')}
                              fullWidth
                              margin="dense"
                              value={editCustomerData.phone}
                              onChange={(e) =>
                                setEditCustomerData({ ...editCustomerData, phone: e.target.value })
                              }
                            />
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                              <IconButton onClick={() => handleUpdateCustomer(customer.customerId)} color="primary">
                                {t('save')}
                              </IconButton>
                              <IconButton onClick={() => setEditCustomerId(null)} color="secondary">
                                {t('cancel')}
                              </IconButton>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      )}
      {alert.message && (
        <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
          {alert.message}
        </Alert>
      )}
    </RootContainer>
  );
};

export default CustomerInfo;