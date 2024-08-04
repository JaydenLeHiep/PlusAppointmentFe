import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const StaffForm = ({ title, newStaff, setNewStaff, handleCancelForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
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
        value={newStaff.name}
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
        value={newStaff.email}
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
        value={newStaff.phone}
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
        label="Password"
        type="password"
        fullWidth
        name="password"
        value={newStaff.password}
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

export default StaffForm;
