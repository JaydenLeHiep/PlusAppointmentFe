import React from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { formBoxStyles, iconButtonStyles, typographyStyles, textFieldStyles, cancelButtonStyles, actionButtonStyles } from '../../../styles/OwnerStyle/CustomerComponent/CustomerFormStyles';

const CustomerForm = ({ title, customer, setCustomer, handleAction, handleCancelForm, buttonText, buttonColor }) => {
  const { t } = useTranslation('customerForm');

  return (
    <Box sx={formBoxStyles}>
      <IconButton onClick={handleCancelForm} sx={iconButtonStyles}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" sx={typographyStyles}>
        {title}
      </Typography>
      
      <TextField
        margin="dense"
        label={t('nameLabel')}
        type="text"
        fullWidth
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        sx={textFieldStyles}
      />
      
      <TextField
        margin="dense"
        label={t('emailLabel')}
        type="email"
        fullWidth
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        sx={textFieldStyles}
      />
      
      <TextField
        margin="dense"
        label={t('phoneLabel')}
        type="text"
        fullWidth
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        sx={textFieldStyles}
      />
      
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button onClick={handleCancelForm} sx={cancelButtonStyles}>
          {t('cancel')}
        </Button>
        
        <Button
          onClick={handleAction}
          sx={{ ...actionButtonStyles, backgroundColor: buttonColor }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;