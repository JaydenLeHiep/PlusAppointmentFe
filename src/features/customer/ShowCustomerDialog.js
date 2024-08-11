import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Alert,
  Box,
  TextField,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
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
      onClose();  // Close the dialog after successfully adding a customer
    } catch (error) {
      console.error('Failed to add customer:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add customer. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          color: '#333', 
          textAlign: 'center', 
          padding: '16px 24px', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textTransform: 'capitalize', 
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
          marginLeft: '3px'
        }}
      >
        Add New Customer
        <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: '24px', backgroundColor: '#f7f7f7' }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            margin="normal"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={newCustomer.name}
            onChange={handleChange}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #ced4da',
                },
                '&:hover fieldset': {
                  borderColor: '#80bdff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#80bdff',
                },
              },
              '& .MuiInputBase-input': {
                padding: '17px',
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: '1rem',
                color: '#555',
              },
            }}
          />
          
          <TextField
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={newCustomer.email}
            onChange={handleChange}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #ced4da',
                },
                '&:hover fieldset': {
                  borderColor: '#80bdff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#80bdff',
                },
              },
              '& .MuiInputBase-input': {
                padding: '17px',
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: '1rem',
                color: '#555',
              },
            }}
          />
          
          <TextField
            margin="normal"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={newCustomer.phone}
            onChange={handleChange}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #ced4da',
                },
                '&:hover fieldset': {
                  borderColor: '#80bdff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#80bdff',
                },
              },
              '& .MuiInputBase-input': {
                padding: '17px',
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: '1rem',
                color: '#555',
              },
            }}
          />
        </Box>

        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            sx={{ mb: 3 }}
          >
            {alert.message}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: '140px',
              height: '48px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              borderColor: '#6c757d',
              color: '#6c757d',
              '&:hover': {
                backgroundColor: '#e2e6ea',
                borderColor: '#5a6268',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddCustomer}
            sx={{
              width: '140px',
              height: '48px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#28a745',
              color: '#fff',
              '&:hover': { backgroundColor: '#218838' },
            }}
          >
            Add Customer
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ShowCustomerDialog;