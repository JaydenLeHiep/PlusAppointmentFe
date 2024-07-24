import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Alert } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import '../../styles/css/AppointmentInfoModal.css';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';

const AppointmentInfoModal = ({ open, appointment, onClose }) => {
  const { changeStatusAppointments, deleteAppointmentAndUpdateList } = useAppointmentsContext();
  const [alert, setAlert] = useState({ message: '', severity: '' });

  useEffect(() => {
    if (appointment) {
      console.log(appointment);
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleConfirmStatus = async () => {
    try {
      const updatedStatus = 'Confirm';
      const selectedBusinessId = localStorage.getItem('selectedBusinessId');
      await changeStatusAppointments(appointment.appointmentId, updatedStatus, selectedBusinessId);
      setAlert({ message: 'Appointment confirmed successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to change appointment status:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to confirm appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      const selectedBusinessId = localStorage.getItem('selectedBusinessId');
      await deleteAppointmentAndUpdateList(appointment.appointmentId, selectedBusinessId);
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

  const formatAppointmentTime = (appointmentTime, duration) => {
    if (!appointmentTime || !duration) {
      return 'Invalid Date';
    }

    const startTime = new Date(appointmentTime);
    if (isNaN(startTime)) {
      return 'Invalid Date';
    }

    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const durationInMinutes = hours * 60 + minutes + seconds / 60;

    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
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
          {formatAppointmentTime(appointment.appointmentTime, appointment.duration)}
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
