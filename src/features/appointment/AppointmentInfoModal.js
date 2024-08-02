import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Grid
} from '@mui/material';
import { Add, Remove, Close as CloseIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import { useStaffsContext } from '../staff/StaffsContext';
import { useServicesContext } from '../servicecomponent/ServicesContext';

const AppointmentInfoModal = ({ open, appointmentId, onClose }) => {
  const { changeStatusAppointments, deleteAppointmentAndUpdateList, fetchAppointmentById, updateAppointmentAndRefresh, customers, fetchAllCustomers, getAppointmentById } = useAppointmentsContext();
  const { staff } = useStaffsContext();
  const { services } = useServicesContext();

  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [editMode, setEditMode] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    customerId: '',
    staffId: '',
    appointmentTime: '',
    status: '',
    comment: '',
    services: [{ serviceId: '', duration: '', price: '' }]
  });

  useEffect(() => {
    const loadAppointmentDetails = async () => {
        try {
            // Attempt to get appointment details from the context by ID
            let appointmentDetails = getAppointmentById(appointmentId);

            // If the appointment is not found in the context, fetch it from the backend
            if (!appointmentDetails && appointmentId) {
                await fetchAllCustomers();  // Fetch customers if not already fetched
                appointmentDetails = await fetchAppointmentById(appointmentId);
            }

            if (appointmentDetails) {
                console.log('Using appointment details:', appointmentDetails);  // Log appointment details
                setAppointment(appointmentDetails);

                // Ensure that customers are available and find the correct customer
                let customer = customers.find(c => c.customerId === appointmentDetails.customerId);
                if (!customer) {
                    // If customers aren't loaded yet, re-fetch them
                    await fetchAllCustomers();
                    customer = customers.find(c => c.customerId === appointmentDetails.customerId);
                }

                // Ensure services are available and correctly map them
                const updatedServices = appointmentDetails.services.$values.map(serviceDetails => {
                    const service = services.find(s => s.serviceId === serviceDetails.serviceId);
                    if (service) {
                        return {
                            serviceId: service.serviceId,
                            duration: service.duration,
                            price: service.price
                        };
                    }
                    return { serviceId: '', duration: '', price: '' };
                });

                // Update the appointment state with loaded details
                setUpdatedAppointment({
                    customerId: customer ? customer.customerId : '',
                    staffId: appointmentDetails.staffId || '',
                    appointmentTime: appointmentDetails.appointmentTime 
                        ? new Date(appointmentDetails.appointmentTime).toISOString().slice(0, 16) 
                        : '',
                    status: appointmentDetails.status || '',
                    comment: appointmentDetails.comment || '',
                    services: updatedServices.length ? updatedServices : [{ serviceId: '', duration: '', price: '' }]
                });
            }
        } catch (error) {
            console.error('Failed to load appointment details:', error);
            setAlert({ message: 'Failed to load appointment details', severity: 'error' });
        }
    };

    if (open) {
        loadAppointmentDetails();
    }
}, [appointmentId, open, fetchAppointmentById, services, fetchAllCustomers, getAppointmentById, customers]);

// Ensure appointment and staff lists are properly loaded before rendering form controls
if (!appointment || staff.length === 0) return null;



  const handleConfirmStatus = async () => {
    try {
      const updatedStatus = 'Confirm';
      const selectedBusinessId = localStorage.getItem('selectedBusinessId');
      await changeStatusAppointments(appointment.appointmentId, updatedStatus, selectedBusinessId);
      setAlert({ message: 'Appointment confirmed successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to change appointment status:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to confirm appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      const selectedBusinessId = localStorage.getItem('selectedBusinessId');
      await deleteAppointmentAndUpdateList(appointment.appointmentId, selectedBusinessId);
      onClose(); // Close the dialog after deleting the appointment
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      setAlert({ message: 'Failed to delete appointment', severity: 'error' });
    }
  };

  const handleClearAlert = () => {
    setAlert({ message: '', severity: '' });
  };

  const handleCloseDialog = () => {
    onClose();
    setAlert({ message: '', severity: '' });
    setEditMode(false); // Reset edit mode
  };

  const handleToggleEditMode = () => {
    if (!editMode) {
      setUpdatedAppointment({
        customerId: appointment.customerId || '',
        staffId: appointment.staffId || '',
        appointmentTime: appointment.appointmentTime || '',
        status: appointment.status || '',
        comment: appointment.comment || '',
        services: Array.isArray(appointment.services)
          ? appointment.services.map(service => ({
            serviceId: service.serviceId,
            duration: service.duration,
            price: service.price,
          }))
          : [], // Handle the case where services might not be an array
      });
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const selectedService = services.find(service => service.serviceId === value);

    const updatedServices = updatedAppointment.services.map((service, i) =>
      i === index ? { ...service, [field]: value, duration: selectedService?.duration || '', price: selectedService?.price || '' } : service
    );

    setUpdatedAppointment({ ...updatedAppointment, services: updatedServices });
  };

  const handleAddService = () => {
    setUpdatedAppointment({
      ...updatedAppointment,
      services: [...updatedAppointment.services, { serviceId: '', duration: '', price: '' }]
    });
  };

  const handleRemoveService = (index) => {
    setUpdatedAppointment({
      ...updatedAppointment,
      services: updatedAppointment.services.filter((_, i) => i !== index)
    });
  };

  const handleUpdateAppointment = async () => {
    try {
      const updateData = {
        businessId: appointment.businessId,
        serviceIds: updatedAppointment.services.map(service => service.serviceId),
        appointmentTime: updatedAppointment.appointmentTime,
        comment: updatedAppointment.comment
      };
      await updateAppointmentAndRefresh(appointment.appointmentId, updateData, appointment.businessId);
      setAlert({ message: 'Appointment updated successfully!', severity: 'success' });
      onClose();
    } catch (error) {
      console.error('Failed to update appointment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });
    }
  };

  const formatAppointmentTime = (appointmentTime, duration) => {
    if (!appointmentTime || !duration) {
      return 'Invalid Date';
    }

    const startTime = new Date(appointmentTime);
    if (isNaN(startTime)) {
      return 'Invalid Date';
    }

    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const durationInMinutes = hours * 60 + minutes + seconds / 60;

    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>
        Appointment Details
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
      <DialogContent dividers>
        {alert.message && (
          <Alert severity={alert.severity} onClose={handleClearAlert} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}
        {!editMode ? (
          <>
            <Typography variant="body1" gutterBottom>
              Client: {appointment.customerName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {appointment.customerPhone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatAppointmentTime(appointment.appointmentTime, appointment.duration)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {appointment.service}
            </Typography>
            <Typography variant="body1" gutterBottom>
              By {appointment.staffName}
            </Typography>
          </>
        ) : (
          <>
            <FormControl fullWidth margin="dense">
  <InputLabel>Customer</InputLabel>
  <Select
    value={updatedAppointment.customerId || ''}
    onChange={(e) => handleInputChange(e, 'customerId')}
    label="Customer"
    disabled
  >
    {customers.length > 0 ? (
      customers.map((customer) => (
        <MenuItem key={customer.customerId} value={customer.customerId}>
          <Box component="span" fontWeight="fontWeightBold">{customer.name}</Box> - {customer.phone}
        </MenuItem>
      ))
    ) : (
      <MenuItem value="">
        <em>No Customers Available</em>
      </MenuItem>
    )}
  </Select>
</FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Staff</InputLabel>
              <Select
                value={updatedAppointment.staffId}
                onChange={(e) => handleInputChange(e, 'staffId')}
                label="Staff"
              >
                {staff.map((staffMember) => (
                  <MenuItem key={staffMember.staffId} value={staffMember.staffId}>
                    <Box component="span" fontWeight="fontWeightBold">{staffMember.name}</Box> - {staffMember.phone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Appointment Time"
              type="datetime-local"
              fullWidth
              value={updatedAppointment.appointmentTime}
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
              value={updatedAppointment.status}
              onChange={(e) => handleInputChange(e, 'status')}
              disabled
            />
            <TextField
              margin="dense"
              label="Comment"
              type="text"
              fullWidth
              multiline
              value={updatedAppointment.comment}
              onChange={(e) => handleInputChange(e, 'comment')}
            />
            {updatedAppointment.services.map((service, index) => (
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
                        {services.map((availableService) => (
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
                        step: 300
                      }}
                      disabled
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
                      disabled
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleDeleteAppointment}>
          Delete
        </Button>
        <Button variant="contained" color="primary" disabled={!editMode} onClick={handleUpdateAppointment}>
          Update
        </Button>
        <Button variant="contained" color="success" onClick={handleConfirmStatus}>
          Confirm
        </Button>
        <Button variant="contained" color="primary" onClick={handleToggleEditMode}>
          {editMode ? 'Close Edit' : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentInfoModal;
