import React from 'react';
import { Stack, Typography, Box, Paper } from '@mui/material';
import useFetchAppointments from '../hooks/useFetchAppointments';

const Appointments = ({ businessId }) => {
  const { appointments, loading, error } = useFetchAppointments(businessId);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Stack spacing={2}>
        {appointments.map((appointment) => (
          <Paper key={appointment.appointmentId} sx={{ padding: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h6">{appointment.customerName}</Typography>
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