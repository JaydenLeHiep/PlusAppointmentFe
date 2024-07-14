import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { addAppointment, fetchAppointments } from '../../lib/apiClientAppointment';

const AddAppointmentDialog = ({ open, onClose, businessId, customerId, serviceId, staffId, setAppointments }) => {
  const [newAppointment, setNewAppointment] = useState({
    appointmentTime: '',
    duration: '00:30', // Default to 30 minutes
    status: 'Pending'
  });

  const [alert, setAlert] = useState({ message: '', severity: '' });

  // State variables and setters for customerId, serviceId, and staffId
  const [customerIdState, setCustomerId] = useState(customerId);
  const [serviceIdState, setServiceId] = useState(serviceId);
  const [staffIdState, setStaffId] = useState(staffId);

  // Update local state when props change
  useEffect(() => {
    setCustomerId(customerId);
    setServiceId(serviceId);
    setStaffId(staffId);
  }, [customerId, serviceId, staffId]);

  const handleAddAppointment = async () => {
    try {
      const appointmentDetails = {
        customerId: customerIdState,
        serviceId: serviceIdState,
        staffId: staffIdState,
        businessId,
        ...newAppointment,
        duration: newAppointment.duration + ':00' // Add seconds part
      };

      await addAppointment(appointmentDetails);
      const appointmentData = await fetchAppointments(businessId);
      setAppointments(appointmentData);
      setAlert({ message: 'Appointment added successfully!', severity: 'success' });
      onClose(); // Close the dialog after successful submission
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Appointment</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Customer ID"
          type="number"
          fullWidth
          value={customerIdState}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Service ID"
          type="number"
          fullWidth
          value={serviceIdState}
          onChange={(e) => setServiceId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Staff ID"
          type="number"
          fullWidth
          value={staffIdState}
          onChange={(e) => setStaffId(e.target.value)}
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
          onChange={(e) => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}
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
