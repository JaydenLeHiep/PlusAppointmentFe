import React from 'react';
import { Box, Typography, List } from '@mui/material';
import {
  OverviewContainer,
  OverviewItem,
  OverviewText,
  OverviewButton,
  StyledListItemText,
} from '../../../styles/CustomerStyle/PCVersion/AppointmentOverViewPageStyle';

const formatDate = (appointmentTime) => {
  const d = new Date(appointmentTime);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const formatTime = (appointmentTime) => {
  const t = new Date(appointmentTime);
  return t.toTimeString().substring(0, 5);
};

const AppointmentOverviewPage = ({ selectedAppointments, onAddMoreServices, onFinish }) => {
  const handleFinish = () => {
    onFinish(selectedAppointments);
  };

  return (
    <OverviewContainer>
      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
        Appointment Overview
      </Typography>
      {selectedAppointments.map((appointment, index) => (
        <OverviewItem key={index}>
          <Box>
            <OverviewText>Staff: {appointment.staffName}</OverviewText>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Date: {formatDate(appointment.appointmentTime)} | Time: {formatTime(appointment.appointmentTime)}
            </Typography>
            <List dense>
              {appointment.services.map((service, idx) => (
                <StyledListItemText
                  key={idx}
                  primary={service.serviceName}
                  secondary={`Duration: ${service.duration || 'N/A'} | Price: €${service.price || 'N/A'}`}
                />
              ))}
            </List>
          </Box>
        </OverviewItem>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <OverviewButton
          variant="contained"
          onClick={onAddMoreServices}
          sx={{ marginRight: 2 }}
        >
          Add More Services
        </OverviewButton>
        <OverviewButton
          variant="contained"
          onClick={handleFinish}
        >
          Finish
        </OverviewButton>
      </Box>
    </OverviewContainer>
  );
};

export default AppointmentOverviewPage;