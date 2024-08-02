import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, CircularProgress, MenuItem, Select, FormControl, InputLabel, ButtonBase } from '@mui/material';
import AppointmentInfoModal from './AppointmentInfoModal';
import '../../styles/css/AppointmentList.css';

const AppointmentList = ({ appointments }) => {
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);  // Store only the appointmentId
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (appointments) {
      setLoading(false);
    }
  }, [appointments]);

  useEffect(() => {
    if (selectedAppointmentId !== null) {
        setModalOpen(true);
    }
  }, [selectedAppointmentId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!appointments || appointments.length === 0) {
    return <Typography variant="h6">No appointments available.</Typography>;
  }

  const sortedAppointments = [...appointments].filter(appt => appt.status !== 'Delete');

  if (sortCriteria === 'date') {
    sortedAppointments.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
  } else if (sortCriteria === 'status') {
    sortedAppointments.sort((a, b) => a.status.localeCompare(b.status));
  }

  const handleAppointmentClick = (appointmentId) => {
    console.log('Clicked appointmentId:', appointmentId);  // Log the selected appointment ID
    setSelectedAppointmentId(appointmentId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointmentId(null);
  };

  return (
    <div>
      <FormControl variant="outlined" style={{ marginBottom: '16px' }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
      <AppointmentInfoModal
        open={modalOpen}
        appointmentId={selectedAppointmentId}  // Pass appointmentId
        onClose={handleCloseModal}
      />
      <List>
        {sortedAppointments.map((appointment) => (
          <ListItem key={appointment.appointmentId}>
            <ButtonBase onClick={() => handleAppointmentClick(appointment.appointmentId)} style={{ width: '100%' }}>
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
                </div>
              </Paper>
            </ButtonBase>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AppointmentList;
