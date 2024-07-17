import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Alert
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { fetchStaff, addStaff, deleteStaff, updateStaff } from '../../lib/apiClientStaff';
import StaffForm from './StaffForm';

const ShowStaffDialog = ({ open, onClose, businessId }) => {
  const [staff, setStaff] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchStaffData = useCallback(async () => {
    try {
      const staffData = await fetchStaff(businessId);
      setStaff(staffData);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch staff. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
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
      setAlert({ message: 'Staff added successfully!', severity: 'success' });

      await fetchStaffData();
      setNewStaff({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      setSelectedStaffId(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add staff:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add staff. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleUpdateStaff = async () => {
    try {
      const staffDetails = {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        password: newStaff.password,
        BusinessId: businessId
      };

      await updateStaff(businessId, selectedStaffId, staffDetails);
      setAlert({ message: 'Staff updated successfully!', severity: 'success' });

      await fetchStaffData();
      setNewStaff({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      setSelectedStaffId(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to update staff:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update staff. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await deleteStaff(businessId, staffId);
      await fetchStaffData();
      setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete staff:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete staff. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleEditStaff = (staff) => {
    setSelectedStaffId(staff.staffId);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      password: '' // Do not prefill password for security reasons
    });
    setIsFormOpen(true);
  };

  const handleAddNewStaffClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    setSelectedStaffId(null);
    setAlert({ message: '', severity: '' });
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setSelectedStaffId(null);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
  };

  const handleCloseDialog = () => {
    setAlert({ message: '', severity: '' });
    handleCancelForm();
    onClose();
  };

  const handleClickAnywhere = () => {
    setAlert({ message: '', severity: '' });
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Staff List</DialogTitle>
      <DialogContent onClick={handleClickAnywhere}>
        {staff.length > 0 ? (
          <List>
            {staff.map((member) => (
              <ListItem
                key={member.staffId}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditStaff(member)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStaff(member.staffId)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={member.name} secondary={member.email} />
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>No staff found for this business.</DialogContentText>
        )}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            startIcon={<Add />}
            onClick={handleAddNewStaffClick}
          >
            Add New Staff
          </Button>
        </Box>

        <Collapse in={isFormOpen || selectedStaffId !== null}>
          <StaffForm
            title={selectedStaffId ? 'Update Staff' : 'Add New Staff'}
            newStaff={newStaff}
            setNewStaff={setNewStaff}
            handleCancelForm={handleCancelForm}
          />
        </Collapse>
        {alert.message && (
          <Alert severity={alert.severity} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
        <Button onClick={handleAddStaff} color="primary" disabled={!isFormOpen || !!selectedStaffId}>
          Add Staff
        </Button>
        <Button onClick={handleUpdateStaff} color="primary" disabled={!selectedStaffId}>
          Update Staff
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowStaffDialog;
