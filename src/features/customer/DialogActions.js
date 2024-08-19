import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DialogActions = ({ onClose, onSubmit }) => {
  const { t } = useTranslation('dialogCustomerActions'); // Use the 'dialogCustomerActions' namespace

  return (
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
        {t('cancelButton')}
      </Button>
      <Button
        variant="contained"
        onClick={onSubmit}
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
        {t('submitButton')}
      </Button>
    </Box>
  );
};

export default DialogActions;
