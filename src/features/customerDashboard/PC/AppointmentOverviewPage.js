import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';

const OverviewContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
}));

const OverviewItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f8ff',
}));

const OverviewText = styled(Typography)(({ theme }) => ({
  color: '#1976d2',
  fontWeight: 'bold',
}));

const OverviewButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const AppointmentOverviewPage = ({ selectedAppointments, onAddMoreServices, onFinish }) => {
  return (
    <OverviewContainer>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1976d2' }}>
        Appointment Overview
      </Typography>
      {selectedAppointments.map((appointment, index) => (
        <OverviewItem key={index}>
          <Box>
            <OverviewText>{appointment.serviceName}</OverviewText>
            <Typography variant="body2">{appointment.staffName}</Typography>
            <Typography variant="body2">{appointment.date.format('YYYY-MM-DD')}</Typography>
            <Typography variant="body2">
              {moment(appointment.time).format('HH:mm')}
            </Typography>
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
          onClick={onFinish}
        >
          Finish
        </OverviewButton>
      </Box>
    </OverviewContainer>
  );
};

export default AppointmentOverviewPage;