import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, Alert, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { fetchStaff, addStaff, deleteStaff } from '../../lib/apiClient';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../styles/css/OwnerDashboard.css';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness }) => {
  const [staff, setStaff] = useState([]);
  const [staffOpen, setStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });

  useEffect(() => {
    const fetchStaffData = async () => {
      if (selectedBusiness) {
        try {
          const staffData = await fetchStaff();
          setStaff(staffData.filter(member => member.BusinessId === selectedBusiness.id));
        } catch (error) {
          console.error('Failed to fetch staff:', error);
        }
      }
    };

    fetchStaffData();
  }, [selectedBusiness]);

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
    setAlert({ message: '', severity: '' }); // Clear alert message
  };

  const handleAddStaff = async () => {
    try {
      const staffDetails = {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        password: newStaff.password,
        BusinessId: selectedBusiness.businessId // Use BusinessId from selectedBusiness
      };

      const addedStaff = await addStaff(selectedBusiness.businessId, staffDetails);
      setStaff(prevStaff => {
        const updatedStaff = [...prevStaff, addedStaff];
        console.log("Updated staff list after adding new member:", updatedStaff);
        return updatedStaff;
      });
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

  const handleDeleteStaff = async (StaffId) => {
    try {
      await deleteStaff(StaffId);
      setStaff(prevStaff => prevStaff.filter((member) => member.staffId !== StaffId));
      setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete staff:', error);
      setAlert({ message: 'Failed to delete staff. Please try again.', severity: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom className="text-center">
        {selectedBusiness.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Address:</strong> {selectedBusiness.address}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Phone:</strong> {selectedBusiness.phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {selectedBusiness.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Staffs:</strong> {selectedBusiness.staffs?.$values?.length || selectedBusiness.staffs?.length || 0}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Appointments:</strong> {selectedBusiness.appointments?.$values?.length || selectedBusiness.appointments?.length || 0}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Services:</strong> {selectedBusiness.services?.$values?.length || selectedBusiness.services?.length || 0}
      </Typography>
      <Box className="calendar-container" style={{ marginBottom: '10px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={selectedBusiness.events}
          height="auto"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={() => setSelectedBusiness(null)} style={{ marginTop: '10px' }}>
        Back to list
      </Button>
      <Button variant="contained" color="secondary" onClick={handleStaffOpen} style={{ marginTop: '10px', marginLeft: '10px' }}>
        Show Staff
      </Button>
      <Dialog open={staffOpen} onClose={handleStaffClose}>
        <DialogTitle>Staff List</DialogTitle>
        <DialogContent>
          {staff.length > 0 ? (
            <List>
              {staff.map((member) => (
                <ListItem key={member.staffId} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStaff(member.staffId)}>
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText
                    primary={member.name}
                    secondary={member.email}
                  />
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
          <Button onClick={handleStaffClose} color="primary">Cancel</Button>
          <Button onClick={handleAddStaff} color="primary">Add Staff</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessDetails;
