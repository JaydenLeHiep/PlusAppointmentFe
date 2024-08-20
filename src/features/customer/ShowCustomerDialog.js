import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { addCustomer } from '../../lib/apiClientCustomer';
import DialogHeader from './DialogHeader';
import CustomerForm from './CustomerForm';
import DialogActions from './DialogActions';

const ShowCustomerDialog = ({ open, onClose, businessId }) => {
  const { t } = useTranslation('showCustomerDialog'); // Use the translation namespace
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleAddCustomer = async () => {
    try {
      const customerDetails = {
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        businessId
      };

      await addCustomer(customerDetails);
      setAlert({ message: t('successMessage'), severity: 'success' }); // Use translation for success message

      setNewCustomer({
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || t('errorMessage'); // Use translation for error message
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader title={t('title')} onClose={onClose} />
      <DialogContent dividers sx={{ padding: '24px', backgroundColor: '#f7f7f7' }}>
        <CustomerForm customer={newCustomer} handleChange={handleChange} />
        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            sx={{ mb: 3 }}
          >
            {alert.message}
          </Alert>
        )}
        <DialogActions onClose={onClose} onSubmit={handleAddCustomer} />
      </DialogContent>
    </Dialog>
  );
};

export default ShowCustomerDialog;
