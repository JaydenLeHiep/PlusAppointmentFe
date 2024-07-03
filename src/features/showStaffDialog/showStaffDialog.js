import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { fetchStaff, addStaff, deleteStaff } from '../../lib/apiClient';

const ShowStaffDialog = ({ open, onClose, businessId }) => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchStaffData = useCallback(async () => {
    try {
      const staffData = await fetchStaff(businessId);
      setStaff(staffData);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  }, [businessId]);

  useEffect(() => {
    if (open) {
      fetchStaffData();
    }
  }, [open, fetchStaffData]);

  const handleAddStaff = async () => {
    try {
      const staffDetails = {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        password: newStaff.password,
        BusinessId: businessId
      };

      await addStaff(businessId, staffDetails);
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

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddStaff} color="primary">
          Add Staff
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowStaffDialog;