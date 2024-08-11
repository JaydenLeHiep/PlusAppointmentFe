import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
  Typography,
} from '@mui/material';
import { Delete, Edit, Add, Close as CloseIcon } from '@mui/icons-material';
import { useStaffsContext } from '../staff/StaffsContext';
import StaffForm from './StaffForm';
import ConfirmationDialog from '../../components/ConfirmationDialog'; // Importing the ConfirmationDialog component

const ShowStaffDialog = ({ open, onClose, businessId }) => {
  const { staff, fetchAllStaff, addStaff, updateStaff, deleteStaff } = useStaffsContext();

  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // State for the confirmation dialog
  const [staffToDelete, setStaffToDelete] = useState(null); // State to keep track of the staff to be deleted

  const alertRef = useRef(null); // Ref for the alert message
  const formRef = useRef(null);  // Ref for the expanding form

  useEffect(() => {
    if (open && staff.length === 0) {
      fetchAllStaff(String(businessId));
    }
  }, [open, fetchAllStaff, businessId, staff.length]);

  useEffect(() => {
    if (alert.message) {
      if (alertRef.current) {
        alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
  
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

  const confirmDeleteStaff = (staffId) => {
    setStaffToDelete(staffId); // Set the staff to be deleted
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleDeleteStaff = () => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteStaff(String(businessId), staffToDelete);
        setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
      } catch (error) {
        console.error('Failed to delete staff:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete staff. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      } finally {
        setConfirmDialogOpen(false); // Close the confirmation dialog
        setStaffToDelete(null); // Clear the staffToDelete state
      }
    });
  };

  const handleEditStaff = (staff) => {
    setSelectedStaffId(staff.staffId);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      password: ''
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

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300); // Adjust delay to match animation time
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
    <>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: '550',
            fontSize: '1.75rem',
            color: '#1a1a1a',
            textAlign: 'center',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: '3px'
          }}
        >
          Staff List
          <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {staff.length > 0 ? (
            <List>
              {staff.map((member) => (
                <ListItem
                  key={member.staffId}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#f0f8ff',
                    mb: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #1976d2',
                    '&:hover': {
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      backgroundColor: '#e6f1ff',
                    }
                  }}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditStaff(member)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteStaff(member.staffId)}>
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {member.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          {member.email}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          {member.phone}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <DialogContentText>No staff found for this business.</DialogContentText>
          )}
          <Box mt={2} mb={2} display="flex" justifyContent="center">
            <Typography
              variant="h7"
              onClick={handleAddNewStaffClick}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: '#1976d2',
                '&:hover': {
                  color: '#115293',
                },
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Add sx={{ fontSize: '40px' }} /> Add New Staff
            </Typography>
          </Box>
          <Collapse in={isFormOpen || selectedStaffId !== null}>
            <Box
              mt={2}
              p={2}
              ref={formRef} // Reference for scrolling to the expanding box
              sx={{ borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}
            >
              <StaffForm
                title={selectedStaffId ? 'Update Staff' : 'Add New Staff'}
                newStaff={newStaff}
                setNewStaff={setNewStaff}
                handleCancelForm={handleCancelForm}
              />
            </Box>
          </Collapse>
          {alert.message && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ message: '', severity: '' })}
              ref={alertRef} // Reference for scrolling to the alert message
              sx={{ mt: 2 }}
            >
              {alert.message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
          <Button
            variant="contained"
            onClick={handleAddStaff}
            disabled={!isFormOpen || !!selectedStaffId}
            sx={{
              width: '120px',
              height: '40px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              '&:hover': { backgroundColor: '#0056b3' }
            }}
          >
            Add Staff
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateStaff}
            disabled={!selectedStaffId}
            sx={{
              width: '150px',
              height: '40px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
              backgroundColor: '#28a745',
              color: '#fff',
              '&:hover': { backgroundColor: '#218838' }
            }}
          >
            Update Staff
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deleting Staff */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this staff member?"
        onConfirm={handleDeleteStaff}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default ShowStaffDialog;