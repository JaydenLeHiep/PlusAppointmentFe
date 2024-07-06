import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Paper, Button, CircularProgress } from '@mui/material';
import '../../styles/css/AppointmentList.css';
import { changeStatusAppointments, deleteAppointment } from '../../lib/apiClientAppointment';

const AppointmentList = ({ appointments, onUpdateStatus }) => {
  const [localAppointments, setLocalAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    if (appointments) {
      // Filter out appointments with status 'Delete'
      const filteredAppointments = appointments.filter(appt => appt.status !== 'Delete');
      setLocalAppointments(filteredAppointments);
      setLoading(false); // Mark loading as complete
    }
  }, [appointments]);

  const handleConfirmStatus = async (appointmentId) => {
    try {
      const updatedStatus = 'Confirm';
      await changeStatusAppointments(appointmentId, { status: updatedStatus });
      onUpdateStatus(appointmentId, updatedStatus); // Update parent state
    } catch (error) {
      console.error('Failed to change appointment status:', error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      onUpdateStatus(appointmentId, 'Delete'); // Update parent state
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  if (loading) {
    return <CircularProgress />; // Display loading indicator while fetching data
  }

  if (!localAppointments || localAppointments.length === 0) {
    return <Typography variant="h6">No appointments available.</Typography>;
  }

  console.log(appointments)

  return (
    <div>
      <List>
        {localAppointments.map((appointment) => (
          <ListItem key={appointment.appointmentId}>
            <Paper style={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
              <div className="appointment-container">
                <div className="info-container">
                  <div className="appointment-time">
                    <Typography variant="h6" className="bold-text">
                      {new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(appointment.appointmentTime).toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
                    </Typography>
                  </div>
                  <div className="customer-info">
                    <Typography variant="h6" className="bold-text">{appointment.customerName}</Typography>
                    <Typography variant="body2">{appointment.customerPhone}</Typography>
                  </div>
                  <Typography className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </Typography>
                </div>
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="error"
                    className="button-red"
                    onClick={() => handleDeleteAppointment(appointment.appointmentId)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    className="button-green"
                    onClick={() => handleConfirmStatus(appointment.appointmentId)}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AppointmentList;
