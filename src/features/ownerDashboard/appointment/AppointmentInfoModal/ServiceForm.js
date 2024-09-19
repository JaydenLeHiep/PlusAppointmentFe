import React from 'react';
import {  Grid, IconButton, Box, MenuItem, InputLabel } from '@mui/material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
    StyledFormControl,
    StyledSelect,
    StyledTextField,
} from '../../../../styles/OwnerStyle/AppointmentInfoModal/ServiceFormStyles';

const ServiceForm = ({ service, index, services, staff, handleServiceChange, handleRemoveService, editMode }) => {
    const { t } = useTranslation('serviceForm');

    return (
        <Box mb={2} mt={2}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <StyledFormControl fullWidth margin="dense">
                        <InputLabel>{t('service')}</InputLabel>
                        <StyledSelect
                            value={service.serviceId}
                            onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                            label={t('service')}
                            disabled={!editMode}
                        >
                            {services.map((availableService) => (
                                <MenuItem key={availableService.serviceId} value={availableService.serviceId}>
                                    {availableService.name}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </StyledFormControl>
                </Grid>
                <Grid item xs={3}>
                    <StyledFormControl fullWidth margin="dense">
                        <InputLabel>{t('staff')}</InputLabel>
                        <StyledSelect
                            value={service.staffId || ''}
                            onChange={(e) => handleServiceChange(index, 'staffId', e.target.value)}
                            label={t('staff')}
                            disabled={!editMode}
                        >
                            {staff.map((staffMember) => (
                                <MenuItem key={staffMember.staffId} value={staffMember.staffId}>
                                    {staffMember.name}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </StyledFormControl>
                </Grid>
                <Grid item xs={3}>
                    <StyledTextField
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
                        disabled
                        onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
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
                       