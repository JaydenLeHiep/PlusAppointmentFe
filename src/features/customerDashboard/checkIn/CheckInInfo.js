import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, CircularProgress, Snackbar, Alert, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useCustomersContext } from '../../../context/CustomerContext';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import { StyledButton } from '../../../styles/CustomerStyle/Checkin/CheckInDashboardStyle';
import ThankYouCheckIn from './ThankYouCheckIn';
import {
  OverviewContainer,
  OverviewItem,
  StyledListItemText,
} from '../../../styles/CustomerStyle/AppointmentOverViewPageStyle';
import { useTranslation } from 'react-i18next';

const CheckInInfo = ({ customerName, customerId, businessId, onBack }) => {
  const { t } = useTranslation('checkInInfo');
  const { addCustomerCheckIn } = useCustomersContext();
  const { fetchAppointmentsForCustomer } = useAppointmentsContext();

  const [checkInType, setCheckInType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showThankYouCheckIn, setShowThankYouCheckIn] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState('');

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointmentsData = await fetchAppointmentsForCustomer(customerId);
        const appointmentValues = appointmentsData?.$values || [];
        setAppointments(appointmentValues);
        setAppointmentsError('');
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointmentsError(t('appointmentsError'));
      } finally {
        setLoadingAppointments(false);
      }
    };

    getAppointments();
  }, [customerId, fetchAppointmentsForCustomer, t]);

  const handleCheckInTypeChange = (event) => {
    setCheckInType(event.target.value);
  };

  const handleCheckInSubmit = async () => {
    if (!checkInType) {
      setSubmitError(t('checkInError'));
      return;
    }

    setIsSubmitting(true);

    const checkInDetails = {
      customerId,
      businessId,
      checkInTime: new Date().toISOString(),
      checkInType,
    };

    try {
      await addCustomerCheckIn(checkInDetails);
      setSubmitSuccess(true);
      setSubmitError('');
      setTimeout(() => {
        setShowThankYouCheckIn(true);
      }, 500);
    } catch (error) {
      setSubmitError(t('checkInError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYouCheckIn) {
    return <ThankYouCheckIn customerName={customerName} />;
  }

  const handleBackClick = () => {
    onBack();
  };

  return (
    <Box textAlign="center" mt={4}>
      {/* Display the Welcome message */}
      <Typography variant="h4" gutterBottom>
        {t('welcomeMessage', { name: customerName })}
      </Typography>

      {/* Display Appointments Header with Back Button */}
      <Box display="flex" alignItems="center" mb={2} width="100%" justifyContent="center" position="relative">
        <IconButton
          onClick={handleBackClick}
          edge="start"
          sx={{ position: 'absolute', left: 0 }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          {t('yourAppointments')}
        </Typography>
      </Box>

      {/* Display Appointments */}
      <Box mt={3}>
        {loadingAppointments ? (
          <CircularProgress />
        ) : appointmentsError ? (
          <Typography color="error">{appointmentsError}</Typography>
        ) : appointments.length > 0 ? (
          <OverviewContainer>
            {appointments.map((appointment, index) => (
              <OverviewItem key={index} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">{`${t('dateLabel')}: ${new Date(appointment.appointmentTime).toLocaleDateString()}`}</Typography>
                <Typography variant="body2">
                  {`${t('timeLabel')}: ${new Date(appointment.appointmentTime).toLocaleTimeString()}`}
                </Typography>
                <Box mt={1}>
                  {(Array.isArray(appointment.services.$values) ? appointment.services.$values : []).map((service, idx) => (
                    <StyledListItemText
                      key={idx}
                      primary={`${t('serviceLabel')}: ${service.name}`}
                      secondary={`${t('durationLabel')}: ${service.duration || 'N/A'} | ${t('priceLabel')}: €${service.price || 'N/A'} | ${t('staffLabel')}: ${service.staffName}`}
                    />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  {`${t('totalPriceLabel')}: €${appointment.services.$values.reduce((total, service) => total + (service.price || 0), 0).toFixed(2)}`}
                </Typography>
              </OverviewItem>
            ))}
          </OverviewContainer>
        ) : (
          <OverviewContainer style={{ marginTop: '50px', marginBottom: '50px' }}>
            <OverviewItem>
              <StyledListItemText primary={t('noAppointments')} />
            </OverviewItem>
          </OverviewContainer>
        )}
      </Box>

      {/* Check-in Form */}
      <Box>
        <FormControl component="fieldset" fullWidth>
          <Typography variant="h6" gutterBottom>
            {t('chooseCheckInType')}
          </Typography>
          <RadioGroup
            row
            value={checkInType}
            onChange={handleCheckInTypeChange}
            sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}
          >
            <FormControlLabel
              value="WalkIn"
              control={<Radio />}
              label={t('walkInLabel')}
              sx={{ margin: 0 }}
            />
            <FormControlLabel
              value="Online"
              control={<Radio />}
              label={t('onlineLabel')}
              sx={{ margin: 0 }}
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt={2} mb={4}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCheckInSubmit}
          disabled={isSubmitting || !checkInType}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('checkInButton')}
        </StyledButton>
      </Box>

      {/* Snackbar for success */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {t('checkInSuccessful')}
        </Alert>
      </Snackbar>

      {/* Snackbar for errors */}
      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {submitError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckInInfo;