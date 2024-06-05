import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import Appointments from '../../components/Appointments';

const AppointmentsButtonComponent = ({ showAppointments, toggleShowAppointments, selectedBusiness }) => (
  <>
    <Box mt={2}>
      <Button variant="contained" color="secondary" onClick={toggleShowAppointments}>
        {showAppointments ? 'Hide Appointments' : 'Show Appointments'}
      </Button>
    </Box>
    {showAppointments && (
      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
          {selectedBusiness.businessName}
        </Typography>
        <Appointments businessId={selectedBusiness.businessId} />
      </Box>
    )}
  </>
);

export default AppointmentsButtonComponent;
