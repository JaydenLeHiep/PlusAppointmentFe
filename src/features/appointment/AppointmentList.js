import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Paper, Button } from '@mui/material';
import '../../styles/css/AppointmentList.css';
import { changeStatusAppointments } from '../../lib/apiClientAppointment';

const AppointmentList = ({ appointments }) => {
  const [localAppointments, setLocalAppointments] = useState([]);

  useEffect(() => {
    if (appointments) {
      setLocalAppointments(appointments);
    }
  }, [appointments]);

  const handleChangeStatus = async (appointmentId, status) => {
    try {
      const updatedStatus = status === 'delete' ? 'Delete' : 'Confirm';
      await changeStatusAppointments(appointmentId, { status: updatedStatus });
      setLocalAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status: updatedStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error('Failed to change appointment status:', error);
    }
  };

  if (!localAppointments || localAppointments.length === 0) {
    return <Typography variant="h6">No appointments available.</Typography>;
  }

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
                      {new Date(appointment.appointmentTime).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(appointment.appointmentTime).toLocaleDateString()}
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
                    onClick={() => handleChangeStatus(appointment.appointmentId, 'delete')}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    className="button-green"
                    onClick={() => handleChangeStatus(appointment.appointmentId, 'confirm')}
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
