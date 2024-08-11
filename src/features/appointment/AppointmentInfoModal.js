import React, { useEffect, useState, useRef } from 'react';
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
import { Add, Close as CloseIcon, Remove as RemoveIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import { useStaffsContext } from '../staff/StaffsContext';
import { useServicesContext } from '../servicecomponent/ServicesContext';
import '../../styles/css/OwnerDashboardCss/AppointmentInfoModal.css';

const AppointmentInfoModal = ({ open, appointmentId, onClose }) => {
  const { appointments, changeStatusAppointments, deleteAppointmentAndUpdateList, updateAppointmentAndRefresh, customers, fetchAllCustomers } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { services, fetchServices } = useServicesContext();

  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [editMode, setEditMode] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    customerId: '',
    staffId: '',
    appointmentTime: '',
    status: '',
    comment: '',
    services: [{ serviceId: '', duration: '', price: '', name: '' }]
  });

  const alertRef = useRef(null);
  const dialogContentRef = useRef(null);

  useEffect(() => {
    if (appointmentId) {
      const selectedAppointment = appointments.find(appt => appt.appointmentId === appointmentId);
      if (selectedAppointment) {
        setAppointment(selectedAppointment);

        const updatedServices = (selectedAppointment.services?.$values || []).map(serviceDetails => {
          const service = services.find(s => s.serviceId === serviceDetails.serviceId);
          return {
            serviceId: service?.serviceId || '',
            duration: service?.duration || '',
            price: service?.price || '',
            name: service?.name || ''
          };
        });

        setUpdatedAppointment({
          customerId: selectedAppointment.customerId || '',
          staffId: selectedAppointment.staffId || '',
          appointmentTime: selectedAppointment.appointmentTime
            ? new Date(selectedAppointment.appointmentTime).toISOString().slice(0, 16)
            : '',
          status: selectedAppointment.status || '',
          comment: selectedAppointment.comment || '',
          services: updatedServices.length ? updatedServices : [{ serviceId: '', duration: '', price: '', name: '' }]
        });
      }
    }
  }, [appointmentId, appointments, services]);

  useEffect(() => {
    if (open && appointment) {
      if (!services.length) fetchServices(appointment.businessId);
      if (!customers.length) fetchAllCustomers(appointment.businessId);
      if (!staff.length) fetchAllStaff(appointment.businessId);
    }
  }, [open, services.length, customers.length, staff.length, fetchServices, fetchAllCustomers, fetchAllStaff, appointment]);

  useEffect(() => {
    if (alert.message && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [alert.message]);

  if (!appointment) return null;

  const handleConfirmStatus = async () => {
    try {
      const updatedStatus = 'Confirm';
      await changeStatusAppointments(appointment.appointmentId, updatedStatus, appointment.businessId);
      setAlert({ message: 'Appointment confirmed successfully!', severity: 'success' });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);

    } catch (error) {
      console.error('Failed to change appointment status:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to confirm appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointmentAndUpdateList(appointment.appointmentId, appointment.businessId);
      onClose();
      setAlert({ message: 'Appointment deleted successfully!', severity: 'success' });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);

    } catch (error) {
      console.error('Failed to delete appointment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
    }
  };

  const handleCloseDialog = () => {
    onClose();
    setAlert({ message: '', severity: '' });
    setEditMode(false);
  };

  const handleToggleEditMode = () => {
    if (!editMode) {
      setUpdatedAppointment({
        customerId: appointment.customerId || '',
        staffId: appointment.staffId || '',
        appointmentTime: appointment.appointmentTime
          ? new Date(appointment.appointmentTime).toISOString().slice(0, 16)
          : '',
        status: appointment.status || '',
        comment: appointment.comment || '',
        services: appointment.services.$values.map(service => ({
          serviceId: service.serviceId,
          duration: service.duration,
          price: service.price,
          name: service.name,
        }))
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
      services: [...updatedAppointment.services, { serviceId: '', duration: '', price: '', name: '' }]
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

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);

    } catch (error) {
      console.error('Failed to update appointment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment. Please try again.';
      setAlert({ message: errorMessage, severity: 'error' });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
    }
  };

  const formatAppointmentTime = (appointmentTime, duration) => {
    if (!appointmentTime || !duration) {
      return 'Invalid Date';
    }

    const startTime = new Date(appointmentTime);
    if (isNaN(startTime.getTime())) {
      return 'Invalid Date';
    }

    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const durationInMinutes = hours * 60 + minutes + (seconds || 0) / 60;

    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const formatTime = (date) => {
      if (date && !isNaN(date.getTime())) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return 'Invalid Time';
      }
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle sx={{
        fontWeight: '550',
        fontSize: '1.75rem',
        color: '#1a1a1a',
        textAlign: 'center',
        padding: '16px 24px',
        justifyContent: 'space-between',
      }}
        className="modal-title">
        Appointment Details
        <IconButton aria-label="close" onClick={handleCloseDialog} className="close-icon">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent ref={dialogContentRef} dividers className="modal-content">
        <Grid container spacing={2}>
          <Grid item xs={editMode ? 12 : 8}>
            {alert.message && (
              <Alert ref={alertRef} severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mb: 2 }}>
                {alert.message}
              </Alert>
            )}
            {!editMode ? (
              <>
                <Typography variant="body1" gutterBottom className="bold-text">
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
                  Comment: {appointment.comment}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  By {appointment.staffName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Services:
                </Typography>
                {appointment.services.$values.map((service, index) => (
                  <Typography key={index} variant="body2" gutterBottom>
                    {index + 1}. {service.name}
                  </Typography>
                ))}
              </>
            ) : (
              <>
                <FormControl fullWidth margin="dense" className="form-control" sx={{ mb: 2.5 }}>
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

                <FormControl fullWidth margin="dense" className="form-control" sx={{ mb: 2.5 }}>
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
                  className="input-field"
                  sx={{ mb: 2.5 }}
                />

                <TextField
                  margin="dense"
                  label="Status"
                  type="text"
                  fullWidth
                  value={updatedAppointment.status}
                  onChange={(e) => handleInputChange(e, 'status')}
                  disabled
                  className="input-field"
                  sx={{ mb: 2.5 }} // Added margin-bottom
                />

                <TextField
                  margin="dense"
                  label="Comment"
                  type="text"
                  fullWidth
                  multiline
                  value={updatedAppointment.comment}
                  onChange={(e) => handleInputChange(e, 'comment')}
                  className="input-field"
                  sx={{ mb: 1 }}
                />

                {updatedAppointment.services.map((service, index) => (
                  <Box key={index} mb={2} mt={2}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <FormControl fullWidth margin="dense" className="form-control">
                          <InputLabel>Service</InputLabel>
                          <Select
                            value={service.serviceId}
                            onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                            label="Service"
                            disabled={!editMode}
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
                          className="input-field"
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
                          className="input-field"
                        />
                      </Grid>
                      <Grid item xs={2} className="remove-button-container">
                        <IconButton onClick={() => handleRemoveService(index)} sx={{ color: 'red' }}>
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Box mt={2} mb={3}>
                  <Typography
                    variant="h7"
                    onClick={handleAddService}
                    className="add-service"
                  >
                    <Add sx={{ fontSize: '40px' }} /> Add Service
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: editMode ? 'flex' : 'none', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggleEditMode}
                    className="action-button close-edit-button"
                  >
                    Close Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateAppointment}
                    className="action-button update-button"
                  >
                    Update
                  </Button>
                </Box>
              </>
            )}
          </Grid>
          {!editMode && (
            <Grid item xs={4} container alignItems="flex-start" justifyContent="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton aria-label="edit" onClick={handleToggleEditMode} className="icon-button edit-icon">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDeleteAppointment} className="icon-button delete-icon">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      {!editMode && (
        <DialogActions className="modal-actions">
          <Button variant="contained" color="success" onClick={handleConfirmStatus} className="action-button confirm-button">
            Confirm
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AppointmentInfoModal;
