import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, CircularProgress, Snackbar, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCustomersContext } from '../../../context/CustomerContext';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';
import ThankYouCheckIn from './ThankYouCheckIn';

const CheckInInfo = ({ customerName, customerId, businessId }) => {
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
        setAppointmentsError('Failed to load appointments.');
      } finally {
        setLoadingAppointments(false);
      }
    };

    getAppointments();
  }, [customerId, fetchAppointmentsForCustomer]);

  const handleCheckInTypeChange = (event) => {
    setCheckInType(event.target.value);
  };

  const handleCheckInSubmit = async () => {
    if (!checkInType) {
      setSubmitError('Please select a check-in type');
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
      }, 500); // Delay to give time for Snackbar to be displayed
    } catch (error) {
      setSubmitError('Failed to check in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYouCheckIn) {
    return <ThankYouCheckIn customerName={customerName} />;
  }

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4">Welcome, {customerName}!</Typography>

      {/* Display Appointments */}
      <Box mt={3}>
        {loadingAppointments ? (
          <CircularProgress />
        ) : appointmentsError ? (
          <Typography color="error">{appointmentsError}</Typography>
        ) : appointments.length > 0 ? (
          <>
            <Typography variant="h6" gutterBottom>Your Appointments:</Typography>
            <List>
              {appointments.map((appointment, index) => (
                <React.Fragment key={appointment.appointmentId}>
                  <ListItem>
                    <ListItemText
                      primary={`Appointment on ${new Date(appointment.appointmentTime).toLocaleDateString()} at ${new Date(appointment.appointmentTime).toLocaleTimeString()}`}
                      secondary={`Service(s): ${appointment.services?.$values?.map(service => service.name).join(', ') || 'No specific service'}`}
                    />
                  </ListItem>
                  {index < appointments.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </>
        ) : (
          <Typography>No appointments found.</Typography>
        )}
      </Box>

      {/* Check-in Form */}
      <Box mt={3}>
        <FormControl component="fieldset">
          <Typography variant="h6" gutterBottom>
            Choose your check-in type:
          </Typography>
          <RadioGroup
            row
            value={checkInType}
            onChange={handleCheckInTypeChange}
          >
            <FormControlLabel value="WalkIn" control={<Radio />} label="Walk In" />
            <FormControlLabel value="Online" control={<Radio />} label="Online" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckInSubmit}
          disabled={isSubmitting || !checkInType}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Check In'}
        </Button>
      </Box>

      {/* Snackbar for success */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Check-in successful!
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
