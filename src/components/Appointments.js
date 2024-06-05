import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, Paper } from '@mui/material';
import useFetchAppointments from '../hooks/useFetchAppointments';

const Appointments = ({ businessId }) => {
  const { appointments, loading, error } = useFetchAppointments(businessId);
  const [storedAppointments, setStoredAppointments] = useState([]);

  useEffect(() => {
    // Retrieve appointments from local storage if they exist
    const stored = localStorage.getItem(`appointments-${businessId}`);
    if (stored) {
      setStoredAppointments(JSON.parse(stored));
    }
  }, [businessId]);

  useEffect(() => {
    // Save appointments to local storage
    if (appointments.length > 0) {
      localStorage.setItem(`appointments-${businessId}`, JSON.stringify(appointments));
      setStoredAppointments(appointments);
    }
  }, [appointments, businessId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Stack spacing={2}>
        {storedAppointments.map((appointment) => (
          <Paper key={appointment.appointmentId} sx={{ padding: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h6">{appointment.customerName}</Typography>
              <Typography>Customer Phone: {appointment.customerPhone}</Typography>
              <Typography>Service: {appointment.serviceName}</Typography>
              <Typography>Staff: {appointment.staffName}</Typography>
              <Typography>Time: {new Date(appointment.appointmentTime).toLocaleString()}</Typography>
              <Typography>Duration: {appointment.duration}</Typography>
              <Typography>Status: {appointment.status}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Appointments;
