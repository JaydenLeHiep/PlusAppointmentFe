import React, { useState, useEffect } from 'react';
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
import { Delete, Edit, Add, Close as CloseIcon } from '@mui/icons-material';
import { useStaffsContext } from '../staff/StaffsContext'; 
import StaffForm from './StaffForm';

const ShowStaffDialog = ({ open, onClose, businessId }) => {
  const { staff, fetchAllStaff, addStaff, updateStaff, deleteStaff } = useStaffsContext(); // Use the context

  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });  // Define the alert state here

  useEffect(() => {
    if (open) {
      fetchAllStaff(String(businessId)); // Fetch staff using the context, ensuring businessId is passed as a string
    }
  }, [open, fetchAllStaff, businessId]);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const closeFormAndExecuteAction = async (action) => {
    if (isFormOpen) {
      setIsFormOpen(false); 
      setTimeout(() => {
        action(); 
        setTimeout(() => setSelectedStaffId(null), 300);
      }, 300);
    } else {
      action();
      setTimeout(() => setSelectedStaffId(null), 300);
    }
  };

  const handleAddStaff = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const staffDetails = {
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          password: newStaff.password,
          BusinessId: String(businessId)
        };

        await addStaff(String(businessId), staffDetails);
        setAlert({ message: 'Staff added successfully!', severity: 'success' });

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } catch (error) {
        console.error('Failed to add staff:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add staff. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleUpdateStaff = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const staffDetails = {
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          password: newStaff.password,
          BusinessId: String(businessId)
        };

        await updateStaff(String(businessId), selectedStaffId, staffDetails);
        setAlert({ message: 'Staff updated successfully!', severity: 'success' });

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } catch (error) {
        console.error('Failed to update staff:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update staff. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleDeleteStaff = (staffId) => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteStaff(String(businessId), staffId);
        setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
      } catch (error) {
        console.error('Failed to delete staff:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete staff. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
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

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        Staff List
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
          <Box mt={2} className="staff-form">
            <StaffForm
              title={selectedStaffId ? 'Update Staff' : 'Add New Staff'}
              newStaff={newStaff}
              setNewStaff={setNewStaff}
              handleCancelForm={handleCancelForm}
            />
          </Box>
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
