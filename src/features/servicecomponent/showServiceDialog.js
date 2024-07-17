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
  Collapse,
  Box
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { fetchServices, addService, deleteService, updateService } from '../../lib/apiClientServicesOwnerDashboard';

const ShowServicesDialog = ({ open, onClose, businessId, onServiceChange }) => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '00:30', // Default to 30 minutes
    price: ''
  });
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const handleUpdateService = async () => {
    try {
      const serviceDetails = {
        name: newService.name,
        description: newService.description,
        duration: newService.duration + ':00',
        price: newService.price,
        BusinessId: businessId
      };

      await updateService(businessId, selectedServiceId, serviceDetails);
      await fetchServiceData();
      setNewService({
        name: '',
        description: '',
        duration: '00:30',
        price: ''
      });
      setSelectedServiceId(null);
      setIsFormOpen(false);
      setAlert({ message: 'Service updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to update service:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update service. Please try again.';
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

  const handleEditService = (service) => {
    setSelectedServiceId(service.serviceId);
    setNewService({
      name: service.name,
      description: service.description,
      duration: service.duration.substring(0, 5), // Display only HH:MM
      price: service.price
    });
    setIsFormOpen(true);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setNewService({ ...newService, duration: value });
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

  const handleClickAnywhere = () => {
    setAlert({ message: '', severity: '' });
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Service List</DialogTitle>
      <DialogContent onClick={handleClickAnywhere}>
        {services.length > 0 ? (
          <List>
            {services.map((service) => (
              <ListItem
                key={service.serviceId}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditService(service)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteService(service.serviceId)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={service.name} secondary={`${service.description} - ${service.duration} - $${service.price}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>No services found for this business.</DialogContentText>
        )}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            startIcon={<Add />}
            onClick={handleAddNewServiceClick}
          >
            Add New Service
          </Button>
        </Box>

        <Collapse in={isFormOpen || selectedServiceId !== null}>
          <Box mt={2}>
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
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button onClick={handleCancelForm} color="primary">
                Cancel
              </Button>
            </Box>
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
        <Button onClick={handleAddService} color="primary" disabled={!isFormOpen || !!selectedServiceId}>
          Add Service
        </Button>
        <Button onClick={handleUpdateService} color="primary" disabled={!selectedServiceId}>
          Update Service
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowServicesDialog;
