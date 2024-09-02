import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledDialogActions, StyledCancelButton, StyledAddButton } 
from '../../../../styles/OwnerStyle/AddAppointment/AppointmentActionsStyles';

const AppointmentActions = ({ newAppointment, handleAddAppointment, onClose }) => {
    const { t } = useTranslation('appointmentActions');

    const handleCancel = () => {
        onClose();
    };

    const handleAddClick = () => {
        const serviceIds = newAppointment.services.map(service => service.serviceId);
        const appointmentDetails = {
            customerId: newAppointment.customerId,
            businessId: newAppointment.businessId,
            serviceIds,
            staffId: newAppointment.staffId,
            appointmentTime: newAppointment.appointmentTime,
            status: newAppointment.status,
            comment: newAppointment.comment
        };
        handleAddAppointment(appointmentDetails);
    };

    return (
        <StyledDialogActions>
            <StyledCancelButton onClick={handleCancel}>
                {t('clear')}
            </StyledCancelButton>
            <StyledAddButton onClick={handleAddClick}>
                {t('add')}
            </StyledAddButton>
        </StyledDialogActions>
    );
};

export default AppointmentActions;