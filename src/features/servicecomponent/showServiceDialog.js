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
import { fetchServices, addService, deleteService } from '../../lib/apiClientServicesOwnerDashboard';

const ShowServicesDialog = ({ open, onClose, businessId, onServiceChange }) => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '00:30', // Default to 30 minutes
    price: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchServiceData = useCallback(async () => {
    try {
      const serviceData = await fetchServices(businessId);
      setServices(serviceData);
      onServiceChange(serviceData); // Update services count
    } catch (error) {
      console.error('Failed to fetch services:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch services. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  }, [businessId, onServiceChange]);

  useEffect(() => {
    if (open) {
      fetchServiceData();
    }
  }, [open, fetchServiceData]);

  const handleAddService = async () => {
    try {
      const serviceDetails = {
        ...newService,
        BusinessId: businessId,
        duration: newService.duration + ':00'
      };

      await addService(businessId, serviceDetails);
      await fetchServiceData();
      setNewService({
        name: '',
        description: '',
        duration: '00:30',
        price: ''
      });
      setAlert({ message: 'Service added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to add service:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add service. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(businessId, serviceId);
      await fetchServiceData();  // Fetch the updated service list
      setAlert({ message: 'Service deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete service:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete service. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setNewService({ ...newService, duration: value });
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Service List</DialogTitle>
      <DialogContent>
        {services.length > 0 ? (
          <List>
            {services.map((service) => (
              <ListItem
                key={service.serviceId}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteService(service.serviceId)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={service.name} secondary={`${service.description} - ${service.duration} - $${service.price}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>No services found for this business.</DialogContentText>
        )}
        <DialogContentText>Add New Service</DialogContentText>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Duration"
          type="time"
          fullWidth
          value={newService.duration} // Display only HH:MM
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min steps
          }}
          onChange={handleDurationChange}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
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
        <Button onClick={handleAddService} color="primary">
          Add Service
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowServicesDialog;