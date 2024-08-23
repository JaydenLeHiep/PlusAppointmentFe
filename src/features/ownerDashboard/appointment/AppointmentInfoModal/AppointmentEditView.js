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
import { useTranslation } from 'react-i18next';

const AppointmentEditView = ({
    updatedAppointment,
    staff = [],
    services = [],
    handleInputChange,
    handleServiceChange,
    handleAddService,
    handleRemoveService,
    editMode
}) => {
    const { t } = useTranslation('appointmentEditView');

    return (
        <>
            {/* Display the customer name prominently */}
            <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 'bold', textAlign: 'center' }}>
                {updatedAppointment.customerName || t('noCustomerName')}
            </Typography>

            <FormControl fullWidth margin="dense" sx={{ mb: 2.5 }}>
                <InputLabel>{t('customer')}</InputLabel>
                <Select
                    value={updatedAppointment.customerId || ''}
                    onChange={(e) => handleInputChange(e, 'customerId')}
                    label={t('customer')}
                    disabled
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <MenuItem value={updatedAppointment.customerId}>
                        <Box component="span" fontWeight="bold">
                            {updatedAppointment.customerName}
                        </Box>{' '}
                        - {updatedAppointment.customerPhone}
                    </MenuItem>
                </Select>
            </FormControl>

            <TextField
                margin="dense"
                label={t('appointmentTime')}
                type="datetime-local"
                fullWidth
                value={updatedAppointment.appointmentTime}  // Keep the local time
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
                label={t('status')}
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
                label={t('comment')}
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

            {/* Render each service form with the correct staff and service options */}
            {updatedAppointment.services.map((service, index) => (
                <ServiceForm
                    key={index}
                    service={service}
                    index={index}
                    services={services}
                    staff={staff}
                    handleServiceChange={handleServiceChange}
                    handleRemoveService={handleRemoveService}
                    editMode={editMode}
                />
            ))}

            {/* Option to add a new service to the appointment */}
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
                    <Add sx={{ fontSize: '40px' }} /> {t('addService')}
                </Typography>
            </Box>
        </>
    );
};

export default AppointmentEditView;
