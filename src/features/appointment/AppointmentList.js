import React, { useEffect } from 'react';
import { List, ListItem, Typography, Paper, Stack } from '@mui/material';

const AppointmentList = ({ appointments }) => {
  useEffect(() => {
    // This effect will run whenever appointments prop changes
  }, [appointments]);

  return (
    <div>
      <Typography variant="h6">Appointments</Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.appointmentId}>
            <Paper style={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
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
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AppointmentList;
