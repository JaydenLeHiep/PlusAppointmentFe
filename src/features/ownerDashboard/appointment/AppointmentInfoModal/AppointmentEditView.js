import React from 'react';
import {
    InputLabel,
    MenuItem,
    Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import ServiceForm from './ServiceForm';
import { useTranslation } from 'react-i18next';
import {
    CustomerNameTypography,
    StyledFormControl,
    StyledSelect,
    StyledTextField,
    AddServiceTypography,
    CustomerNameWrapper,
} from '../../../../styles/OwnerStyle/AppointmentInfoModal/AppointmentEditViewStyles';

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
            <CustomerNameWrapper>
                <CustomerNameTypography variant="h6">
                    {updatedAppointment.customerName || t('noCustomerName')}
                </CustomerNameTypography>
            </CustomerNameWrapper>

            <StyledFormControl fullWidth margin="dense">
                <InputLabel>{t('customer')}</InputLabel>
                <StyledSelect
                    value={updatedAppointment.customerId || ''}
                    onChange={(e) => handleInputChange(e, 'customerId')}
                    label={t('customer')}
                    disabled
                >
                    <MenuItem value={updatedAppointment.customerId}>
                        <Box component="span" fontWeight="bold">
                            {updatedAppointment.customerName}
                        </Box>{' '}
                        - {updatedAppointment.customerPhone}
                    </MenuItem>
                </StyledSelect>
            </StyledFormControl>

            <StyledTextField
                margin="dense"
                label={t('appointmentTime')}
                type="datetime-local"
                fullWidth
                value={updatedAppointment.appointmentTime}  // Keep the local time
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => handleInputChange(e, 'appointmentTime')}
            />

            <StyledTextField
                margin="dense"
                label={t('status')}
                type="text"
                fullWidth
                value={updatedAppointment.status}
                onChange={(e) => handleInputChange(e, 'status')}
                disabled
            />

            <StyledTextField
                margin="dense"
                label={t('comment')}
                type="text"
                fullWidth
                multiline
                value={updatedAppointment.comment}
                onChange={(e) => handleInputChange(e, 'comment')}
            />

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

            <Box mt={2}>
                <AddServiceTypography variant="h7" onClick={handleAddService}>
                    <Add sx={{ fontSize: '40px' }} /> {t('addService')}
                </AddServiceTypography>
            </Box>
        </>
    );
};

export default AppointmentEditView;