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
  TextField,
  Alert
} from '@mui/material';
import { Delete, Edit, Add, Close as CloseIcon } from '@mui/icons-material';
import { useServicesContext } from '../servicecomponent/ServicesContext'; 

const ShowServicesDialog = ({ open, onClose, businessId }) => {  // Removed onServiceChange from props
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

  useEffect(() => {
    if (open) {
      fetchServices(String(businessId));
    }
  }, [open, fetchServices, businessId]);

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

  const handleDeleteService = (serviceId) => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteService(String(businessId), serviceId);
        setAlert({ message: 'Service deleted successfully!', severity: 'success' });
      } catch (error) {
        console.error('Failed to delete service:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete service. Please try again.';
        setAlert({ message: errorMessage, severity: 'error' });
      }
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
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        Service List
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
          <Box mt={2} className="service-form">
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
              value={newService.duration}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min steps
              }}
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
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
