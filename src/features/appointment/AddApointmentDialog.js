import React, { useState, useEffect, useRef } from 'react';
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
  Grid,
} from '@mui/material';
import { Add, Remove, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import { useStaffsContext } from '../staff/StaffsContext';
import { useServicesContext } from '../servicecomponent/ServicesContext';
import { searchCustomersByName } from '../../lib/apiClientCustomer';

const AddAppointmentDialog = ({ open, onClose, businessId }) => {
  const initialAppointmentState = useRef({
    appointmentTime: '',
    status: 'Pending',
    customerId: '',
    staffId: '',
    businessId,
    comment: '',
    services: [{ serviceId: '', duration: '', price: '' }]
  });

  const [newAppointment, setNewAppointment] = useState(initialAppointmentState.current);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Ensure it starts as an empty array
  const [customerSearch, setCustomerSearch] = useState(''); // For storing the search input
  const [selectPlaceholder, setSelectPlaceholder] = useState('Select to choose Customer'); // Default placeholder text

  const { addAppointmentAndUpdateList } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { services, fetchServices } = useServicesContext();

  useEffect(() => {
    // Load services and staff when the dialog opens
    if (open) {
      fetchServices(businessId);
      fetchAllStaff(businessId);
    }
  }, [open, businessId, fetchServices, fetchAllStaff]);

  useEffect(() => {
    if (!open) {
      setNewAppointment(initialAppointmentState.current);
      setAlert({ message: '', severity: '' });
      setFilteredCustomers([]); // Reset customers on close
      setCustomerSearch(''); // Reset search input
      setSelectPlaceholder('Select to choose Customer'); // Reset placeholder
    }
  }, [open]);

  const handleCustomerSearch = async () => {
    try {
      const customers = await searchCustomersByName(customerSearch);
      if (customers.length === 0) {
        setSelectPlaceholder('No Customer found');
      } else {
        setSelectPlaceholder('Click to show Customers');
      }
      setFilteredCustomers(customers);
    } catch (error) {
      console.error('Failed to search customers:', error);
      setAlert({ message: 'Failed to search customers', severity: 'error' });
      setSelectPlaceholder('No Customer found');
    }
  };

  const handleAddAppointment = async () => {
    try {
      const serviceIds = newAppointment.services.map(service => service.serviceId);
      const appointmentDetails = {
        customerId: newAppointment.customerId,
        businessId: newAppointment.businessId,
        serviceIds: serviceIds,
        staffId: newAppointment.staffId,
        appointmentTime: new Date(newAppointment.appointmentTime).toISOString(),
        status: newAppointment.status,
        comment: newAppointment.comment
      };

      await addAppointmentAndUpdateList(appointmentDetails);
      setAlert({ message: 'Appointment added successfully!', severity: 'success' });
      onClose(); // Close dialog after successful addition
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
    const selectedService = services.find(service => service.serviceId === value);

    const updatedServices = newAppointment.services.map((service, i) =>
      i === index ? { ...service, [field]: value, duration: selectedService?.duration || '', price: selectedService?.price || '' } : service
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

  const handleCancel = () => {
    setNewAppointment(initialAppointmentState.current);
    setAlert({ message: '', severity: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Add Appointment
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <FormControl fullWidth margin="dense">
          <TextField
            label="Search Customer by Name"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            margin="dense"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleCustomerSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Select
            value={newAppointment.customerId}
            onChange={(e) => handleInputChange(e, 'customerId')}
            displayEmpty
            renderValue={(selected) => {
              if (selected === '') {
                return <span>{selectPlaceholder}</span>;
              }
              const selectedCustomer = filteredCustomers.find(c => c.customerId === selected);
              return <span>{selectedCustomer ? `${selectedCustomer.name} - ${selectedCustomer.phone}` : selectPlaceholder}</span>;
            }}
          >
            {filteredCustomers.map((customer) => (
              <MenuItem key={customer.customerId} value={customer.customerId}>
                <Box component="span" fontWeight="fontWeightBold">{customer.name}</Box> - {customer.phone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Staff</InputLabel>
          <Select
            value={newAppointment.staffId}
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
          disabled
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
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
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
