import React, { useEffect, useRef, useState } from 'react';
import { Grid,TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useStaffsContext } from '../../staff/StaffsContext';
import { useServicesContext } from '../../servicecomponent/ServicesContext';
import ServiceForm from './ServiceForm';
import CustomerSearch from './CustomerSearch';

const AppointmentForm = ({ newAppointment, setNewAppointment, alert, setAlert, businessId }) => {
    const { staff, fetchAllStaff } = useStaffsContext();
    const { services, fetchServices } = useServicesContext();
    const [customerSearch, setCustomerSearch] = useState('');
    const lastServiceRef = useRef(null);
    const hasServicesChanged = useRef(false);

    useEffect(() => {
        if (services.length === 0) {
            fetchServices(businessId);
        }
        if (staff.length === 0) {
            fetchAllStaff(businessId);
        }
    }, [businessId, services.length, staff.length, fetchServices, fetchAllStaff]);

    useEffect(() => {
        if (hasServicesChanged.current && lastServiceRef.current) {
            lastServiceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            hasServicesChanged.current = false;
        }
    }, [newAppointment.services.length]);

    const handleInputChange = (e, field) => {
        const value = e.target.value || '';
        setNewAppointment({ ...newAppointment, [field]: value });
    };

    const handleServiceChange = (index, field, value) => {
        let updatedService = { ...newAppointment.services[index], [field]: value };
    
        if (field === 'serviceId') {
            const selectedService = services.find(service => service.serviceId === value);
            if (selectedService) {
                updatedService.duration = selectedService.duration;
                updatedService.price = selectedService.price;
            } else {
                updatedService.duration = '';
                updatedService.price = '';
            }
        }
    
        if (field === 'duration') {
            // Convert duration (HH:MM) to a proper TimeSpan format (HH:MM:SS)
            const formattedDuration = value.length === 5 ? `${value}:00` : value;
            updatedService.updatedDuration = formattedDuration; // Update the updatedDuration field
        }
    
        const updatedServices = newAppointment.services.map((service, i) =>
            i === index ? updatedService : service
        );
    
        setNewAppointment({ ...newAppointment, services: updatedServices });
    };
    
    
    
    const handleAddService = () => {
        setNewAppointment({
            ...newAppointment,
            services: [...newAppointment.services, { serviceId: '', staffId: '', duration: '', price: '' }]
        });
        hasServicesChanged.current = true;
    };
    
    const handleRemoveService = (index) => {
        setNewAppointment({
            ...newAppointment,
            services: newAppointment.services.filter((_, i) => i !== index)
        });
        hasServicesChanged.current = true;
    };
    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomerSearch
                    newAppointment={newAppointment}
                    customerSearch={customerSearch}
                    setCustomerSearch={setCustomerSearch}
                    setNewAppointment={setNewAppointment}
                    alert={alert}
                    setAlert={setAlert}
                />
            </Grid>


            <Grid item xs={12}>
                <TextField
                    margin="dense"
                    label="Appointment Time"
                    type="datetime-local"
                    fullWidth
                    value={newAppointment.appointmentTime || ''}
                    onChange={(e) => handleInputChange(e, 'appointmentTime')}
                    InputLabelProps={{
                        shrink: true
                    }}
                    sx={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    margin="dense"
                    label="Status"
                    type="text"
                    fullWidth
                    value={newAppointment.status || ''}
                    onChange={(e) => handleInputChange(e, 'status')}
                    disabled
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
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
                    value={newAppointment.comment || ''}
                    onChange={(e) => handleInputChange(e, 'comment')}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                {newAppointment.services.map((service, index) => (
                    <ServiceForm
                        key={index}
                        service={service}
                        index={index}
                        services={services}
                        staff={staff}  // Passing staff data
                        handleServiceChange={handleServiceChange}
                        handleRemoveService={handleRemoveService}
                        lastServiceRef={index === newAppointment.services.length - 1 ? lastServiceRef : null}
                    />
                ))}
            </Grid>

            <Grid item xs={12}>
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
                        '&:hover': {
                            color: '#115293'
                        }
                    }}
                >
                    <Add sx={{ fontSize: '35px' }} /> Add Service
                </Typography>
            </Grid>
        </Grid>
    );
};

export default AppointmentForm;