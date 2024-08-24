import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Box } from '@mui/material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ServiceForm = ({ service, index, services, staff, handleServiceChange, handleRemoveService, editMode }) => {
    const { t } = useTranslation('serviceForm');

    return (
        <Box mb={2} mt={2}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <FormControl fullWidth margin="dense" sx={{ mb: 0.5 }}>
                        <InputLabel>{t('service')}</InputLabel>
                        <Select
                            value={service.serviceId}
                            onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                            label={t('service')}
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
                    <FormControl fullWidth margin="dense" sx={{ mb: 0.5 }}>
                        <InputLabel>{t('staff')}</InputLabel>
                        <Select
                            value={service.staffId || ''}
                            onChange={(e) => handleServiceChange(index, 'staffId', e.target.value)}
                            label={t('staff')}
                            disabled={!editMode}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
                <Grid item xs={3}>
                    <TextField
                        margin="dense"
                        label={t('duration')}
                        type="time"
                        fullWidth
                        value={service.duration}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // step of 5 minutes
                        }}
                        onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
    );
};

export default ServiceForm;