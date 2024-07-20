import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Alert } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import '../../styles/css/AppointmentInfoModal.css';
import { changeStatusAppointments, deleteAppointment } from '../../lib/apiClientAppointment';

const AppointmentInfoModal = ({ open, appointment, onClose, onUpdateStatus }) => {
  const [alert, setAlert] = useState({ message: '', severity: '' });

  useEffect(() => {
    if (appointment) {
      console.log(appointment);
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleConfirmStatus = async () => {
    try {
      const updatedStatus = 'Confirmed';
      await changeStatusAppointments(appointment.appointmentId, { status: updatedStatus });
      onUpdateStatus(appointment.appointmentId, updatedStatus);
      setAlert({ message: 'Appointment confirmed successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to change appointment status:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to confirm appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointment.appointmentId);
      onUpdateStatus(appointment.appointmentId, 'Delete');
      onClose(); // Close the dialog after deleting the appointment
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const handleClearAlert = () => {
    setAlert({ message: '', severity: '' });
  };

  const handleCloseDialog = () => {
    onClose();
    setAlert({ message: '', severity: '' });
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <div className="modal-header">
        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
          <ClearIcon />
        </IconButton>
        <DialogTitle>Appointment Details</DialogTitle>
      </div>
      <DialogContent dividers>
        {alert.message && (
          <Alert severity={alert.severity} onClose={handleClearAlert} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}
        <Typography variant="body1" gutterBottom>
          Client: {appointment.customerName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {appointment.customerPhone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {new Date(appointment.appointmentTime).toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {appointment.service}
        </Typography>
        <Typography variant="body1" gutterBottom>
          By {appointment.staffName}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseDialog}>
          Close
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteAppointment}>
          Delete
        </Button>
        <Button variant="contained" color="success" className="button-large" onClick={handleConfirmStatus}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentInfoModal;
