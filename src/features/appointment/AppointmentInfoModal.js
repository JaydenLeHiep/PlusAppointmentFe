import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import '../../styles/css/AppointmentInfoModal.css';
import { changeStatusAppointments, deleteAppointment } from '../../lib/apiClientAppointment';

const AppointmentInfoModal = ({ open, appointment, onClose, onUpdateStatus }) => {
  useEffect(() => {
    if (appointment) {
      console.log(appointment);
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleConfirmStatus = async () => {
    try {
      const updatedStatus = 'Confirm';
      await changeStatusAppointments(appointment.appointmentId, { status: updatedStatus });
      onUpdateStatus(appointment.appointmentId, updatedStatus);
      onClose();
    } catch (error) {
      console.error('Failed to change appointment status:', error);
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointment.appointmentId);
      onUpdateStatus(appointment.appointmentId, 'Delete');
      onClose();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="modal-header">
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <ClearIcon />
        </IconButton>
        <DialogTitle>New Appointment</DialogTitle>
      </div>
      <DialogContent dividers>
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
        <Button variant="contained" color="error" onClick={handleDeleteAppointment}>
          Cancel
        </Button>
        <Button variant="contained" color="success" className="button-large" onClick={handleConfirmStatus}>
          Confirm
        </Button>
        <Button variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentInfoModal;
