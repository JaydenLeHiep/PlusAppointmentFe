import React, { useState, useEffect, useCallback } from 'react';
import {
  
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { fetchStaff, addStaff, deleteStaff, addAppointment, fetchAppointments } from '../../lib/apiClient';
import FullCalendarComponent from '../calendar/FullCalendarComponent';
import '../../styles/css/OwnerDashboard.css';
import BusinessInfo from './BusinessInfor';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness, appointments, setAppointments }) => {
  const [staff, setStaff] = useState([]);
  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [newAppointment, setNewAppointment] = useState({
    customerId: '',
    serviceId: '',
    staffId: '',
    appointmentTime: '',
    duration: '',
    status: 'Scheduled'
  });

  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchStaffData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const staffData = await fetchStaff(selectedBusiness.businessId);
        setStaff(staffData);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    }
  }, [selectedBusiness]);

  const fetchAppointmentData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const appointmentData = await fetchAppointments(selectedBusiness.businessId);
        setAppointments(appointmentData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    }
  }, [selectedBusiness, setAppointments]);

  useEffect(() => {
    fetchStaffData();
    fetchAppointmentData();
  }, [selectedBusiness, fetchStaffData, fetchAppointmentData]);

  const handleStaffOpen = () => {
    setStaffOpen(true);
  };

  const handleStaffClose = () => {
    setStaffOpen(false);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    setAlert({ message: '', severity: '' });
  };

  const handleAddStaff = async () => {
    try {
      const staffDetails = {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        password: newStaff.password,
        BusinessId: selectedBusiness.businessId
      };

      await addStaff(selectedBusiness.businessId, staffDetails);
      await fetchStaffData();  // Fetch the updated staff list
      setNewStaff({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      setAlert({ message: 'Staff added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to add staff:', error);
      setAlert({ message: 'Failed to add staff. Please try again.', severity: 'error' });
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await deleteStaff(staffId);
      await fetchStaffData();  // Fetch the updated staff list
      setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete staff:', error);
      setAlert({ message: 'Failed to delete staff. Please try again.', severity: 'error' });
    }
  };

  const handleAppointmentOpen = () => {
    setAppointmentOpen(true);
  };

  const handleAppointmentClose = () => {
    setAppointmentOpen(false);
    setNewAppointment({
      customerId: '',
      serviceId: '',
      staffId: '',
      appointmentTime: '',
      duration: '',
      status: 'Scheduled'
    });
    setAlert({ message: '', severity: '' });
  };

  const handleAddAppointment = async () => {
    try {
      const appointmentDetails = {
        ...newAppointment,
        businessId: selectedBusiness.businessId,
      };

      await addAppointment(appointmentDetails);
      await fetchAppointmentData();  // Fetch the updated appointment list
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

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  return (
    <Box>
      <BusinessInfo selectedBusiness={selectedBusiness} staff={staff} appointments={appointments} />
      <Box className="calendar-container" style={{ marginBottom: '10px' }}>
        <FullCalendarComponent events={appointments.map(appt => ({
          title: `${appt.customerName}`,
          start: new Date(appt.appointmentTime).toISOString(),  // Ensure the correct date format
          end: new Date(new Date(appt.appointmentTime).getTime() + parseDuration(appt.duration)).toISOString(),
          extendedProps: {
            service: appt.serviceName,
            staff: appt.staffName,
            status: appt.status
          }
        }))} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedBusiness(null)}
        style={{ marginTop: '10px' }}
      >
        Back to list
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleStaffOpen}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Show Staff
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAppointmentOpen}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Add Appointment
      </Button>
      <Dialog open={staffOpen} onClose={handleStaffClose}>
        <DialogTitle>Staff List</DialogTitle>
        <DialogContent>
          {staff.length > 0 ? (
            <List>
              {staff.map((member) => (
                <ListItem
                  key={member.staffId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStaff(member.staffId)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={member.name} secondary={member.email} />
                </ListItem>
              ))}
            </List>
          ) : (
            <DialogContentText>No staff found for this business.</DialogContentText>
          )}
          <DialogContentText>Add New Staff</DialogContentText>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={newStaff.phone}
            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newStaff.password}
            onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
          />
          {alert.message && (
            <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mt: 2 }}>
              {alert.message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStaffClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStaff} color="primary">
            Add Staff
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={appointmentOpen} onClose={handleAppointmentClose}>
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
            label="Duration (HH:MM:SS)"
            type="text"
            fullWidth
            value={newAppointment.duration}
            onChange={(e) => setNewAppointment({ ...newAppointment, duration: e.target.value })}
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
          <Button onClick={handleAppointmentClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAppointment} color="primary">
            Add Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessDetails;
