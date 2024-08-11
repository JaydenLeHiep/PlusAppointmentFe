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
  const alertRef = useRef();

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

  useEffect(() => {
    if (alert.message) {
      const handleClickOutside = (event) => {
        if (alertRef.current && !alertRef.current.contains(event.target)) {
          setAlert({ message: '', severity: '' });
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [alert.message]);

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

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
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
          marginLeft: '3px'
        }}
      >
        Add Appointment
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <TextField
                label="Search Customer by Name or Phone number"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                margin="dense"
                fullWidth
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleCustomerSearch}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              {searchPerformed && (
                <Box
                  sx={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#ccc',
                      borderRadius: '8px',
                    },
                  }}
                >
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
              <InputLabel>Staff</InputLabel>
              <Select
                value={newAppointment.staffId}
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
                    <Box component="span" fontWeight="fontWeightBold">
                      {staffMember.name}
                    </Box> - {staffMember.phone}
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
              onChange={(e) => handleInputChange(e, 'appointmentTime')}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
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
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
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
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
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
                  }}
                />
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton onClick={() => handleRemoveService(index)} color="error">
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Typography
          variant="body1"
          onClick={handleAddService}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '16px',
            '&:hover': {
              color: '#115293',
            },
          }}
        >
          <Add sx={{ fontSize: '35px' }} /> Add Service
        </Typography>

        {alert.message && (
          <Alert
            ref={alertRef}
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            sx={{ marginTop: '16px' }}
          >
            {alert.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancel}
          sx={{
            width: '120px',
            height: '40px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddAppointment}
          sx={{
            width: '125px',
            backgroundColor: '#28a745',
            color: '#fff',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            '&:hover': {
              backgroundColor: '#218838',
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentDialog;