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
import { addAppointment, fetchAppointments } from '../../lib/apiClient';

const AddAppointmentDialog = ({ open, onClose, businessId, setAppointments }) => {
  const [newAppointment, setNewAppointment] = useState({
    customerId: '',
    serviceId: '',
    staffId: '',
    appointmentTime: '',
    duration: '',
    status: 'Scheduled'
  });

  const [alert, setAlert] = useState({ message: '', severity: '' });

  const handleAddAppointment = async () => {
    try {
      const appointmentDetails = {
        ...newAppointment,
        businessId,
      };

      await addAppointment(appointmentDetails);
      const appointmentData = await fetchAppointments(businessId);
      setAppointments(appointmentData);
      setAlert({ message: 'Appointment added successfully!', severity: 'success' });
      setNewAppointment({
        customerId: '',
        serviceId: '',
        staffId: '',
        appointmentTime: '',
        duration: '',
        status: 'Scheduled'
      });
    } catch (error) {
      console.error('Failed to add appointment:', error);
      setAlert({ message: 'Failed to add appointment. Please try again.', severity: 'error' });
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    const [hours, minutes] = value.split(':');
    setNewAppointment({ ...newAppointment, duration: `${hours}:${minutes}:00` });
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
          onChange={(e) => setNewAppointment({ ...newAppointment, customerId: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Service ID"
          type="number"
          fullWidth
          value={newAppointment.serviceId}
          onChange={(e) => setNewAppointment({ ...newAppointment, serviceId: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Staff ID"
          type="number"
          fullWidth
          value={newAppointment.staffId}
          onChange={(e) => setNewAppointment({ ...newAppointment, staffId: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Appointment Time"
          type="datetime-local"
          fullWidth
          value={newAppointment.appointmentTime}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Duration"
          type="time"
          fullWidth
          value={newAppointment.duration.substring(0, 5)} 
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, 
          }}
          onChange={handleDurationChange}
        />
        <TextField
          margin="dense"
          label="Status"
          type="text"
          fullWidth
          value={newAppointment.status}
          onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
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
