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
import ConfirmationDialog from '../../components/ConfirmationDialog';

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const alertRef = useRef(null);

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

  const handleDeleteAppointment = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAppointmentAndUpdateList(appointment.appointmentId, appointment.businessId);
      setShowConfirmDialog(false);
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

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
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
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          color: '#333', 
          textAlign: 'center', 
          padding: '16px 24px', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textTransform: 'capitalize', 
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
        }}
      >
        Appointment Details
        <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: '24px',
          backgroundColor: '#f4f6f8',
        }}
      >
        {alert.message && (
          <Alert
            ref={alertRef}
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={editMode ? 12 : 8}>
            {!editMode ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#007bff',
                    marginBottom: '12px',
                  }}
                >
                  Client: {appointment.customerName}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: '#333',
                    fontSize: '1.1rem',
                    marginBottom: '10px',
                  }}
                >
                  {appointment.customerPhone}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: '#333',
                    fontSize: '1.1rem',
                    marginBottom: '10px',
                  }}
                >
                  {formatAppointmentTime(appointment.appointmentTime, appointment.duration)}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: '#333',
                    fontSize: '1.1rem',
                    marginBottom: '10px',
                  }}
                >
                  {appointment.service}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: '#333',
                    fontSize: '1.1rem',
                    marginBottom: '10px',
                  }}
                >
                  Comment: {appointment.comment}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#28a745',
                    marginBottom: '12px',
                  }}
                >
                  By {appointment.staffName}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: '12px',
                    fontSize: '1.2rem',
                  }}
                >
                  Services:
                </Typography>
                {appointment.services.$values.map((service, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    gutterBottom
                    sx={{
                      color: '#555',
                      fontSize: '1rem',
                      marginLeft: '16px',
                      marginBottom: '6px',
                    }}
                  >
                    {index + 1}. {service.name}
                  </Typography>
                ))}
              </>
            ) : (
              <>
                <FormControl fullWidth margin="dense" sx={{ mb: 2.5 }}>
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={updatedAppointment.customerId || ''}
                    onChange={(e) => handleInputChange(e, 'customerId')}
                    label="Customer"
                    disabled
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {customers.length > 0 ? (
                      customers.map((customer) => (
                        <MenuItem key={customer.customerId} value={customer.customerId}>
                          <Box component="span" fontWeight="bold">
                            {customer.name}
                          </Box>{' '}
                          - {customer.phone}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        <em>No Customers Available</em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" sx={{ mb: 2.5 }}>
                  <InputLabel>Staff</InputLabel>
                  <Select
                    value={updatedAppointment.staffId}
                    onChange={(e) => handleInputChange(e, 'staffId')}
                    label="Staff"
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {staff.map((staffMember) => (
                      <MenuItem key={staffMember.staffId} value={staffMember.staffId}>
                        <Box component="span" fontWeight="bold">
                          {staffMember.name}
                        </Box>{' '}
                        - {staffMember.phone}
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
                    shrink: true,
                  }}
                  onChange={(e) => handleInputChange(e, 'appointmentTime')}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    mb: 2.5,
                  }}
                />

                <TextField
                  margin="dense"
                  label="Status"
                  type="text"
                  fullWidth
                  value={updatedAppointment.status}
                  onChange={(e) => handleInputChange(e, 'status')}
                  disabled
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    mb: 2.5,
                  }}
                />

                <TextField
                  margin="dense"
                  label="Comment"
                  type="text"
                  fullWidth
                  multiline
                  value={updatedAppointment.comment}
                  onChange={(e) => handleInputChange(e, 'comment')}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    mb: 1,
                  }}
                />

{updatedAppointment.services.map((service, index) => (
  <Box key={index} mb={2} mt={2}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <FormControl fullWidth margin="dense" sx={{ mb: 0 }}>
          <InputLabel>Service</InputLabel>
          <Select
            value={service.serviceId}
            onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
            label="Service"
            disabled={!editMode}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
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
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          disabled
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center', // Center-align the text
          }}
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
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center', // Center-align the text
          }}
        />
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: '#1976d2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      mt: '16px',
                      '&:hover': {
                        color: '#115293',
                      },
                    }}
                  >
                    <Add sx={{ fontSize: '40px' }} /> Add Service
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggleEditMode}
                    sx={{
                      backgroundColor: '#d32f2f',
                      color: '#fff',
                      width: '120px',
                      height: '40px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                      '&:hover': {
                        backgroundColor: '#9a0007',
                      },
                    }}
                  >
                    Close Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateAppointment}
                    sx={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      width: '120px',
                      height: '40px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                      '&:hover': {
                        backgroundColor: '#115293',
                      },
                    }}
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
                <IconButton aria-label="edit" onClick={handleToggleEditMode} sx={{ transition: 'color 0.2s ease', color: '#1976d2', '&:hover': { color: '#115293' } }}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDeleteAppointment} sx={{ transition: 'color 0.2s ease', color: '#d32f2f', '&:hover': { color: '#9a0007' } }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      {!editMode && (
        <DialogActions sx={{ justifyContent: 'flex-end', padding: '16px 24px' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmStatus}
            sx={{
              backgroundColor: '#28a745',
              color: '#fff',
              width: '120px',
              height: '40px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
              '&:hover': {
                backgroundColor: '#218838',
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmDialog}
        title="Delete Appointment"
        content="Are you sure you want to delete this appointment?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Dialog>
  );
};

export default AppointmentInfoModal;