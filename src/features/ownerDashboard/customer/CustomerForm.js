import React from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment-timezone';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  formBoxStyles,
  iconButtonStyles,
  typographyStyles,
  textFieldStyles,
  cancelButtonStyles,
  actionButtonStyles,
} from '../../../styles/OwnerStyle/CustomerComponent/CustomerFormStyles';

const CustomerForm = ({ title, customer, setCustomer, handleAction, handleCancelForm, buttonText, buttonColor }) => {
  const { t } = useTranslation('customerForm');

  const handleDateChange = (date) => {
    if (moment.isMoment(date) && date.isValid()) {
      // Treat date as UTC and set explicitly to start of the day in UTC
      const utcDate = moment.utc(date.format('YYYY-MM-DD')).startOf('day');
      setCustomer({ ...customer, birthday: utcDate });
    } else {
      setCustomer({ ...customer, birthday: null });
    }
  };

  const handleSubmit = () => {
    const formattedCustomer = {
      ...customer,
      // Format the date explicitly to UTC in 'YYYY-MM-DDT00:00:00Z' format
      birthday: customer.birthday ? customer.birthday.format('YYYY-MM-DDT00:00:00[Z]') : null
    };
    console.log('Formatted Birthday Date:', formattedCustomer.birthday); // Log for verification
    handleAction(formattedCustomer);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
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

        {/* Birthday Date Picker and Promotion Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box sx={{ width: '50%', pr: 1 }}>
            <DatePicker
              label={t('birthdayLabel')}
              value={customer.birthday || null} // Moment object or null
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    ...textFieldStyles,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '10px 14px',
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Wants Promotion with Radio Buttons */}
          <Box sx={{ width: '50%', pl: 1, textAlign: 'center', mt: 1 }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                {t('doYouWantToReceivePromotions')}
              </FormLabel>
              <RadioGroup
                row
                value={customer.wantsPromotion}
                onChange={(e) => setCustomer({ ...customer, wantsPromotion: e.target.value === 'true' })}
                sx={{
                  justifyContent: 'center',
                }}
              >
                <FormControlLabel value="true" control={<Radio color="primary" />} label={t('yes')} />
                <FormControlLabel value="false" control={<Radio color="primary" />} label={t('no')} />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={handleCancelForm} sx={cancelButtonStyles}>
            {t('cancel')}
          </Button>

          <Button
            onClick={handleSubmit}
            sx={{ ...actionButtonStyles, backgroundColor: buttonColor }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomerForm;