import React from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomerForm = ({ title, customer, setCustomer, handleAction, handleCancelForm, buttonText, buttonColor }) => {
  const { t } = useTranslation('customerForm');

  return (
    <Box
      mt={2}
      p={2}
      mb={3}
      sx={{
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <IconButton
        onClick={handleCancelForm}
        sx={{ position: 'absolute', top: '8px', right: '8px', color: '#6c757d' }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <TextField
        margin="dense"
        label={t('nameLabel')}
        type="text"
        fullWidth
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
      />
      <TextField
        margin="dense"
        label={t('emailLabel')}
        type="email"
        fullWidth
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
      />
      <TextField
        margin="dense"
        label={t('phoneLabel')}
        type="text"
        fullWidth
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
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
          {t('cancel')}
        </Button>
        <Button
          onClick={handleAction}
          sx={{
            width: '150px',
            height: '40px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: buttonColor,
            color: '#fff',
            '&:hover': { backgroundColor: buttonColor === '#007bff' ? '#0056b3' : '#218838' },
            '&.Mui-disabled': { backgroundColor: '#ccc' },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;
