import React from 'react';
import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CustomerForm = ({ customer, handleChange }) => {
  const { t } = useTranslation('customerForm'); // Use the 'customerForm' namespace

  return (
    <Box sx={{ mb: 3 }}>
      {['name', 'email', 'phone'].map((field) => (
        <TextField
          key={field}
          margin="normal"
          label={t(`${field}Label`)}
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
