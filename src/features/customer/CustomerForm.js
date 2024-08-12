import React from 'react';
import { Box, TextField } from '@mui/material';

const CustomerForm = ({ customer, handleChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {['name', 'email', 'phone'].map((field) => (
        <TextField
          key={field}
          margin="normal"
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          type={field === 'email' ? 'email' : 'text'}
          fullWidth
          name={field}
          value={customer[field]}
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
      ))}
    </Box>
  );
};

export default CustomerForm;