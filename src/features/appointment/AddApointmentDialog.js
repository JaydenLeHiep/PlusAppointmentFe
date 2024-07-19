import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { addAppointment } from '../../lib/apiClientAppointment';
import { fetchService } from '../../lib/apiClientServices';

const AddAppointmentDialog = ({ open, onClose, businessId, customerId, staffId }) => {
  const [newAppointment, setNewAppointment] = useState({
    appointmentTime: '',
    status: 'Pending',
    customerId: customerId || '',
    staffId: staffId || '',
    businessId,
    comment: '',
    services: [{ serviceId: '', duration: '', price: '' }]
  });

  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [availableServices, setAvailableServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await fetchService(businessId);
        setAvailableServices(services);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    loadServices();
  }, [businessId]);

  const handleAddAppointment = async () => {
    try {
      const serviceIds = newAppointment.services.map(service => service.serviceId);
      const appointmentDetails = {
        customerId: newAppointment.customerId,
        businessId: newAppointment.businessId,
        serviceIds: serviceIds,
        staffId: newAppointment.staffId,
        appointmentTime: new Date(newAppointment.appointmentTime).toISOString(), // Convert to ISO format
        status: newAppointment.status,
        comment: newAppointment.comment // Add comment here
      };

      await addAppointment(appointmentDetails);
      setAlert({ message: 'Appointment added successfully!', severity: 'success' });
      onClose();
    } catch (error) {
      console.error('Failed to add appointment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewAppointment({ ...newAppointment, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = newAppointment.services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setNewAppointment({ ...newAppointment, services: updatedServices });
  };

  const handleAddService = () => {
    setNewAppointment({
      ...newAppointment,
      services: [...newAppointment.services, { serviceId: '', duration: '', price: '' }]
    });
  };

  const handleRemoveService = (index) => {
    setNewAppointment({
      ...newAppointment,
      services: newAppointment.services.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Appointment</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Customer ID"
          type="number"
          fullWidth
          value={newAppointment.customerId}
          onChange={(e) => handleInputChange(e, 'customerId')}
        />
        <TextField
          margin="dense"
          label="Staff ID"
          type="number"
          fullWidth
          value={newAppointment.staffId}
          onChange={(e) => handleInputChange(e, 'staffId')}
        />
        <TextField
          margin="dense"
          label="Appointment Time"
          type="datetime-local"
          fullWidth
          value={newAppointment.appointmentTime}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => handleInputChange(e, 'appointmentTime')}
        />
        <TextField
          margin="dense"
          label="Status"
          type="text"
          fullWidth
          value={newAppointment.status}
          onChange={(e) => handleInputChange(e, 'status')}
        />
        <TextField
          margin="dense"
          label="Comment"
          type="text"
          fullWidth
          value={newAppointment.comment}
          onChange={(e) => handleInputChange(e, 'comment')}
        />
        {newAppointment.services.map((service, index) => (
          <Box key={index} mb={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={service.serviceId}
                    onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                    label="Service"
                  >
                    {availableServices.map((availableService) => (
                      <MenuItem key={availableService.serviceId} value={availableService.serviceId}>
                        {availableService.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  label="Duration"
                  type="time"
                  fullWidth
                  value={service.duration}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min steps
                  }}
                  onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                />
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={() => handleRemoveService(index)}>
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button startIcon={<Add />} onClick={handleAddService}>
          Add Service
        </Button>
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
        <Button onClick={handleAddAppointment} color="primary">
          Add Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentDialog;
