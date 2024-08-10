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
  Alert,
  Typography,
} from '@mui/material';
import { Delete, Edit, Add, Close as CloseIcon } from '@mui/icons-material';
import { useStaffsContext } from '../staff/StaffsContext';
import StaffForm from './StaffForm';

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

  useEffect(() => {
    if (open && staff.length === 0) {
      fetchAllStaff(String(businessId));
    }
  }, [open, fetchAllStaff, businessId, staff.length]);

  useEffect(() => {
    if (alert.message) {
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
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Staff List
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ color: (theme) => theme.palette.grey[500] }}>
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
                  backgroundColor: '#f0f8ff', // Light background color
                  mb: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Elevated shadow
                  border: '1px solid #1976d2', // Border color to make it pop
                  '&:hover': {
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#e6f1ff', // Slightly darker background on hover
                  }
                }}
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
                <ListItemText
                  primary={<Typography variant="body1" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{member.name}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" component="div">{member.email}</Typography>
                      <Typography variant="body2" component="div">{member.phone}</Typography>
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
          <Box mt={2} p={2} sx={{ borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}>
            <StaffForm
              title={selectedStaffId ? 'Update Staff' : 'Add New Staff'}
              newStaff={newStaff}
              setNewStaff={setNewStaff}
              handleCancelForm={handleCancelForm}
            />
          </Box>
        </Collapse>
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mt: 2 }}>
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
  );
};

export default ShowStaffDialog;