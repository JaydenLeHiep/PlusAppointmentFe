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
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Add, Remove, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import { useStaffsContext } from '../staff/StaffsContext';
import { useServicesContext } from '../servicecomponent/ServicesContext';
import { searchCustomersByName } from '../../lib/apiClientCustomer';
import '../../styles/css/AddAppointmentsDialog.css';

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
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const { addAppointmentAndUpdateList } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { services, fetchServices } = useServicesContext();

  useEffect(() => {
    if (open) {
      if (services.length === 0) {
        fetchServices(businessId);
      }
      if (staff.length === 0) {
        fetchAllStaff(businessId);
      }
    }
  }, [open, businessId, services.length, staff.length, fetchServices, fetchAllStaff]);

  useEffect(() => {
    if (!open) {
      setNewAppointment(initialAppointmentState.current);
      setAlert({ message: '', severity: '' });
      setFilteredCustomers([]);
      setCustomerSearch('');
      setSearchPerformed(false);
    }
  }, [open]);

  const handleCustomerSearch = async () => {
    setSearchPerformed(true);
    try {
      const customers = await searchCustomersByName(customerSearch);
      setFilteredCustomers(customers);
    } catch (error) {
      console.error('Failed to search customers:', error);
      setAlert({ message: 'Failed to search customers', severity: 'error' });
    }
  };

  const handleSelectCustomer = (customer) => {
    setNewAppointment({ ...newAppointment, customerId: customer.customerId });
    setCustomerSearch(`${customer.name} - ${customer.phone}`);
    setSearchPerformed(false); // Hide the customer list after selection
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
      <DialogTitle
        sx={{
          fontWeight: '550',
          fontSize: '1.75rem', // Increased font size
          color: '#1a1a1a', // Darker color for better contrast
          textAlign: 'center', // Center align the text
          padding: '16px 24px', // Added padding for better spacing
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '4px'
        }}
      >
        Add Appointment
        <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="dialog-content">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <TextField
                label="Search Customer by Name or Phone number"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                margin="dense"
                fullWidth
                className="input-field"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleCustomerSearch}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              {searchPerformed && (
                <Box className="customer-list-box">
                  {filteredCustomers.length === 0 ? (
                    <Typography>No Customer found</Typography>
                  ) : (
                    <List>
                      {filteredCustomers.slice(0, 3).map((customer) => (
                        <ListItem
                          key={customer.customerId}
                          button
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          <ListItemText primary={`${customer.name} - ${customer.phone}`} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel className="input-label">Staff</InputLabel>
              <Select
                value={newAppointment.staffId}
                onChange={(e) => handleInputChange(e, 'staffId')}
                label="Staff"
                className="input-field"
              >
                {staff.map((staffMember) => (
                  <MenuItem key={staffMember.staffId} value={staffMember.staffId}>
                    <Box component="span" fontWeight="fontWeightBold">{staffMember.name}</Box> - {staffMember.phone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Appointment Time"
              type="datetime-local"
              fullWidth
              value={newAppointment.appointmentTime}
              InputLabelProps={{
                shrink: true
              }}
              className="input-field"
              onChange={(e) => handleInputChange(e, 'appointmentTime')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Status"
              type="text"
              fullWidth
              value={newAppointment.status}
              onChange={(e) => handleInputChange(e, 'status')}
              disabled
              className="input-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Comment"
              type="text"
              fullWidth
              multiline
              value={newAppointment.comment}
              onChange={(e) => handleInputChange(e, 'comment')}
              className="input-field"
            />
          </Grid>
        </Grid>
        {newAppointment.services.map((service, index) => (
          <Box key={index} mb={2} mt={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={service.serviceId}
                    onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                    label="Service"
                    className="input-field"
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
                <IconButton onClick={() => handleRemoveService(index)} color="error">
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Typography
          variant="h7"
          onClick={handleAddService}
          className="add-service"
        >
          <Add sx={{ fontSize: '35px' }} /> Add Service
        </Typography>
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })} className="alert">
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancel}
          className="action-button clear-button"
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddAppointment}
          className="action-button add-button"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentDialog;