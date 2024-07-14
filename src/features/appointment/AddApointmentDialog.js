import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { addAppointment } from '../../lib/apiClientAppointment';

const AddAppointmentDialog = ({ open, onClose, businessId, customerId, serviceId, staffId }) => {
  const [newAppointment, setNewAppointment] = useState({
    appointmentTime: '',
    duration: '00:30', // Default to 30 minutes
    status: 'Pending',
    customerId: customerId || '',
    serviceId: serviceId || '',
    staffId: staffId || '',
    businessId
  });

  const [alert, setAlert] = useState({ message: '', severity: '' });

  const handleAddAppointment = async () => {
    try {
      const appointmentDetails = {
        ...newAppointment,
        duration: newAppointment.duration + ':00' // Add seconds part
      };

      await addAppointment(appointmentDetails);
      setAlert({ message: 'Appointment added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to add appointment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setNewAppointment({ ...newAppointment, duration: value });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewAppointment({ ...newAppointment, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Appointment</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Customer ID"
          type="number"
          fullWidth
          value={newAppointment.customerId}
          onChange={(e) => handleInputChange(e, 'customerId')}
        />
        <TextField
          margin="dense"
          label="Service ID"
          type="number"
          fullWidth
          value={newAppointment.serviceId}
          onChange={(e) => handleInputChange(e, 'serviceId')}
        />
        <TextField
          margin="dense"
          label="Staff ID"
          type="number"
          fullWidth
          value={newAppointment.staffId}
          onChange={(e) => handleInputChange(e, 'staffId')}
        />
        <TextField
          margin="dense"
          label="Appointment Time"
          type="datetime-local"
          fullWidth
          value={newAppointment.appointmentTime}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => handleInputChange(e, 'appointmentTime')}
        />
        <TextField
          margin="dense"
          label="Duration"
          type="time"
          fullWidth
          value={newAppointment.duration}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min steps
          }}
          onChange={handleDurationChange}
        />
        <TextField
          margin="dense"
          label="Status"
          type="text"
          fullWidth
          value={newAppointment.status}
          onChange={(e) => handleInputChange(e, 'status')}
        />
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddAppointment} color="primary">
          Add Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentDialog;
