import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const CustomerForm = ({ title, newCustomer, setNewCustomer, handleCancelForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
      
      <TextField
        margin="dense"
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      
      <TextField
        margin="dense"
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      
      <TextField
        margin="dense"
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          onClick={handleCancelForm}
          sx={{
            width: '120px',
            height: '40px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#6c757d',
            color: '#fff',
            '&:hover': { backgroundColor: '#5a6268' },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;
