import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { Remove } from '@mui/icons-material';

const ServiceForm = ({ service, index, services, staff, handleServiceChange, handleRemoveService, lastServiceRef }) => {
    return (
        <Grid container spacing={2} alignItems="center" ref={lastServiceRef}>
            <Grid item xs={3}>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Service</InputLabel>
                    <Select
                        value={service.serviceId}
                        onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                        label="Service"
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
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
                <FormControl fullWidth margin="dense">
                    <InputLabel>Staff</InputLabel>
                    <Select
                        value={service.staffId}
                        onChange={(e) => handleServiceChange(index, 'staffId', e.target.value)}
                        label="Staff"
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {staff.map((staffMember) => (
                            <MenuItem key={staffMember.staffId} value={staffMember.staffId}>
                                {staffMember.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <TextField
                    margin="dense"
                    label="Duration"
                    type="text"
                    fullWidth
                    value={service.duration || ''}
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        pattern: '[0-9]{2}:[0-9]{2}', // Ensures the format is HH:MM
                        step: 300 // This could be optional for a time picker
                    }}
                    disabled
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    value={service.price || ''}
                    disabled
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton onClick={() => handleRemoveService(index)} color="error">
                    <Remove />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default ServiceForm
