import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
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
  TextField,
  Alert,
  Typography,
} from '@mui/material';
import { Delete, Edit, Add, Close as CloseIcon } from '@mui/icons-material';
import { useServicesContext } from '../servicecomponent/ServicesContext';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const ShowServicesDialog = ({ open, onClose, businessId }) => {
  const { services, fetchServices, addService, updateService, deleteService } = useServicesContext();

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '00:30', // Default to 30 minutes
    price: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null); // For tracking the service to be deleted

  const alertRef = useRef(null); // Ref for alert message
  const formRef = useRef(null); // Ref for expanding form

  useEffect(() => {
    if (open && services.length === 0) {  // Fetch only if services are not already loaded
      fetchServices(String(businessId));
    }
  }, [open, fetchServices, businessId, services.length]);

  useEffect(() => {
    if (alert.message) {
      if (alertRef.current) {
        alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
        setTimeout(() => setSelectedServiceId(null), 300);
      }, 300);
    } else {
      action();
      setTimeout(() => setSelectedServiceId(null), 300);
    }
  };

  const handleAddService = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const serviceDetails = {
          ...newService,
          BusinessId: String(businessId),
          duration: newService.duration + ':00'
        };

        await addService(String(businessId), serviceDetails);
        setAlert({ message: 'Service added successfully!', severity: 'success' });

        setNewService({
          name: '',
          description: '',
          duration: '00:30',
          price: ''
        });
      } catch (error) {
        console.error('Failed to add service:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add service. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleUpdateService = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const serviceDetails = {
          ...newService,
          duration: newService.duration + ':00',
          BusinessId: String(businessId)
        };

        await updateService(String(businessId), selectedServiceId, serviceDetails);
        setAlert({ message: 'Service updated successfully!', severity: 'success' });

        setNewService({
          name: '',
          description: '',
          duration: '00:30',
          price: ''
        });
      } catch (error) {
        console.error('Failed to update service:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update service. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const confirmDeleteService = (serviceId) => {
    setServiceToDelete(serviceId); // Set the service to be deleted
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleDeleteService = () => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteService(String(businessId), serviceToDelete);
        setAlert({ message: 'Service deleted successfully!', severity: 'success' });
      } catch (error) {
        console.error('Failed to delete service:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete service. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
      setConfirmDialogOpen(false); // Close the confirmation dialog after deletion
    });
  };

  const handleEditService = (service) => {
    setSelectedServiceId(service.serviceId);
    setNewService({
      name: service.name,
      description: service.description,
      duration: service.duration.substring(0, 5),
      price: service.price
    });
    setIsFormOpen(true);
  };

  const handleAddNewServiceClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewService({
      name: '',
      description: '',
      duration: '00:30',
      price: ''
    });
    setSelectedServiceId(null);
    setAlert({ message: '', severity: '' });

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300); // Adjust delay to match animation time
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setSelectedServiceId(null);
    setNewService({
      name: '',
      description: '',
      duration: '00:30',
      price: ''
    });
  };

  const handleCloseDialog = () => {
    setAlert({ message: '', severity: '' });
    handleCancelForm();
    onClose();
  };

  return (
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
        Service List
        <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {services.length > 0 ? (
          <List>
            {services.map((service) => (
              <ListItem
                key={service.serviceId}
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
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditService(service)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteService(service.serviceId)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {service.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {service.description}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        {service.duration} - ${service.price}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>No services found for this business.</DialogContentText>
        )}
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <Typography
            variant="h7"
            onClick={handleAddNewServiceClick}
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
            <Add sx={{ fontSize: '40px' }} /> Add New Service
          </Typography>
        </Box>
        <Collapse in={isFormOpen || selectedServiceId !== null}>
          <Box
            mt={2}
            p={2}
            ref={formRef} // Reference for scrolling to the expanding form
            sx={{ borderRadius: '12px', backgroundColor: '#f9f9f9', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
          >
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Removing the default border
                  },
                },
                mb: 2,
              }}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Removing the default border
                  },
                },
                mb: 2,
              }}
            />
            <TextField
              margin="dense"
              label="Duration"
              type="time"
              fullWidth
              value={newService.duration}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min steps
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Removing the default border
                  },
                },
                mb: 2,
              }}
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Removing the default border
                  },
                },
                mb: 2,
              }}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                onClick={handleCancelForm}
                sx={{
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#5a6268' },
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={selectedServiceId ? handleUpdateService : handleAddService}
                sx={{
                  backgroundColor: selectedServiceId ? '#007bff' : '#28a745',
                  color: '#fff',
                  '&:hover': { backgroundColor: selectedServiceId ? '#0056b3' : '#218838' },
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                {selectedServiceId ? 'Update Service' : 'Add Service'}
              </Button>
            </Box>
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

      {/* Confirmation Dialog for Deleting Service */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this service?"
        onConfirm={handleDeleteService}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </Dialog>
  );
};

export default ShowServicesDialog;