import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Alert, FormControl, InputLabel, Select, MenuItem, TextField, Box, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Add, Remove } from '@mui/icons-material';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import { fetchService } from '../../lib/apiClientServices';
import { fetchCustomers } from '../../lib/apiClientCustomer';
import { fetchStaff } from '../../lib/apiClientStaff';
import { updateAppointment } from '../../lib/apiClientAppointment';

const AppointmentInfoModal = ({ open, appointment, onClose }) => {
  const { changeStatusAppointments, deleteAppointmentAndUpdateList, fetchAppointmentById } = useAppointmentsContext();
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [editMode, setEditMode] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);
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
        const services = await fetchService(appointment.businessId);
        const customers = await fetchCustomers(appointment.businessId);
        const staff = await fetchStaff(appointment.businessId);

        setAvailableServices(services);
        setCustomers(customers);
        setStaff(staff);

        const appointmentDetails = await fetchAppointmentById(appointment.appointmentId);
        if (appointmentDetails && appointmentDetails.serviceIds && appointmentDetails.serviceIds.$values) {
          const updatedServices = appointmentDetails.serviceIds.$values.map(serviceId => {
            const service = services.find(s => s.serviceId === serviceId);
            return {
              serviceId: service ? service.serviceId : '',
              duration: service ? service.duration : '',
              price: service ? service.price : ''
            };
          });

          setUpdatedAppointment({
            customerId: appointmentDetails.customerId || '',
            staffId: appointmentDetails.staffId || '',
            appointmentTime: appointmentDetails.appointmentTime ? new Date(appointmentDetails.appointmentTime).toISOString().slice(0, 16) : '',
            status: appointmentDetails.status || '',
            comment: appointmentDetails.comment || '',
            services: updatedServices
          });
        }
      } catch (error) {
        console.error('Failed to fetch appointment details:', error);
        setAlert({ message: 'Failed to fetch appointment details', severity: 'error' });
      }
    };

    if (appointment) {
      loadAppointmentDetails();
    }
  }, [appointment, fetchAppointmentById]);

  if (!appointment) return null;

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
    setEditMode(!editMode);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const selectedService = availableServices.find(service => service.serviceId === value);

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
      console.log('Updating appointment with data:', updateData);
      await updateAppointment(appointment.appointmentId, updateData);
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
      <div className="modal-header">
        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
          <ClearIcon />
        </IconButton>
        <DialogTitle>Appointment Details</DialogTitle>
      </div>
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
                value={updatedAppointment.customerId}
                onChange={(e) => handleInputChange(e, 'customerId')}
                label="Customer"
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.customerId} value={customer.customerId}>
                    <Box component="span" fontWeight="fontWeightBold">{customer.name}</Box> - {customer.phone}
                  </MenuItem>
                ))}
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
        <Button variant="contained" color="success" className="button-large" onClick={handleConfirmStatus}>
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
