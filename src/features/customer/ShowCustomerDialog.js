import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
  Alert,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import { addCustomer } from '../../lib/apiClientCustomer';

const ShowCustomerDialog = ({ open, onClose }) => {
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
      };

      await addCustomer(customerDetails);
      setAlert({ message: 'Customer added successfully!', severity: 'success' });

      setNewCustomer({
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add customer. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleCancelForm = () => {
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancelForm} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Add New Customer</Typography>
        <IconButton aria-label="close" onClick={handleCancelForm} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box mt={2} p={2} sx={{ borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}>
          <CustomerForm
            title="Customer Details"
            newCustomer={newCustomer}
            setNewCustomer={setNewCustomer}
            handleCancelForm={handleCancelForm}
          />
        </Box>
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
        <Button
          variant="contained"
          onClick={handleAddCustomer}
          sx={{
            width: '120px',
            height: '40px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: '#fff',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
        >
          Add Customer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowCustomerDialog;
