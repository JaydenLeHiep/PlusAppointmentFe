import React from 'react';
import { DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AppointmentActions = ({ newAppointment, handleAddAppointment, onClose }) => {
    const { t } = useTranslation('appointmentActions'); // Use the 'appointmentActions' namespace for translations

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
                        backgroundColor: '#0056b3'
                    }
                }}
            >
                {t('clear')}
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={handleAddClick}
                sx={{
                    width: '125px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                    '&:hover': {
                        backgroundColor: '#218838'
                    }
                }}
            >
                {t('add')}
            </Button>
        </DialogActions>
    );
};

export default AppointmentActions;