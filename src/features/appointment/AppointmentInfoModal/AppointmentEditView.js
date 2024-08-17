import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import ServiceForm from './ServiceForm';

const AppointmentEditView = ({
    updatedAppointment,
    customers,
    staff,
    services,
    handleInputChange,
    handleServiceChange,
    handleAddService,
    handleRemoveService,
    editMode
}) => {
    return (
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
                <ServiceForm
                    key={index}
                    service={service}
                    index={index}
                    services={services}
                    staff={staff}  // Pass staff to handle staff selection
                    handleServiceChange={handleServiceChange}
                    handleRemoveService={handleRemoveService}
                    editMode={editMode}
                />
            ))}
            <Box mt={2}>
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
        </>
    );
};

export default AppointmentEditView;
