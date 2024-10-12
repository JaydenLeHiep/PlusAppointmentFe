import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    Alert,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AppointmentForm from './AppointmentForm';
import AppointmentActions from './AppointmentActions';
import { useAppointmentsContext } from '../../../../context/AppointmentsContext';
import { useTranslation } from 'react-i18next';
import { dialogTitleStyles, dialogContentStyles, alertStyles, iconButtonStyles }
    from '../../../../styles/OwnerStyle/AddAppointment/AddAppointmentDialogStyles';

const AddAppointmentDialog = ({ open, onClose, businessId }) => {
    const { t } = useTranslation('addAppointmentDialog');
    const initialAppointmentState = useRef({
        appointmentTime: '',
        status: 'Confirm',
        customerId: '',
        businessId,
        comment: '',
        services: [{ serviceId: '', staffId: '', duration: '', price: '' }]
    });

    const [newAppointment, setNewAppointment] = useState(initialAppointmentState.current);
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [customerSearch, setCustomerSearch] = useState('');
    const alertRef = useRef();
    const { addAppointmentAndUpdateList } = useAppointmentsContext();

    useEffect(() => {
        if (!open) {
            setNewAppointment(initialAppointmentState.current);
            setAlert({ message: '', severity: '' });
        }
    }, [open]);

    useEffect(() => {
        if (alert.message) {
            if (alertRef.current) {
                alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            const timer = setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alert.message]);

    const validateForm = () => {
        if (!newAppointment.customerId) {
            setAlert({ message: t('customerRequired'), severity: 'error' });
            return false;
        }
        if (!newAppointment.appointmentTime) {
            setAlert({ message: t('appointmentTimeRequired'), severity: 'error' });
            return false;
        }
        const serviceErrors = newAppointment.services.some(service => !service.serviceId);
        if (serviceErrors) {
            setAlert({ message: t('servicesRequired'), severity: 'error' });
            return false;
        }
        const staffErrors = newAppointment.services.some(service => !service.staffId);
        if (staffErrors) {
            setAlert({ message: t('staffRequired'), severity: 'error' });
            return false;
        }
        return true;
    };

    const handleAddAppointment = async () => {
        if (!validateForm()) return;

        try {
            const localAppointmentTime = new Date(newAppointment.appointmentTime);
            const utcAppointmentTime = localAppointmentTime.toISOString();
            const appointmentDetails = {
                customerId: parseInt(newAppointment.customerId, 10),
                businessId: newAppointment.businessId,
                appointmentTime: utcAppointmentTime,
                status: newAppointment.status,
                comment: newAppointment.comment,
                services: newAppointment.services.map(service => ({
                    serviceId: service.serviceId,
                    staffId: service.staffId,
                }))
            };

            await addAppointmentAndUpdateList(appointmentDetails);
            setAlert({ message: t('appointmentAddedSuccess'), severity: 'success' });

            setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 5000);
        } catch (error) {
            console.error('Failed to add appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || t('appointmentAddFailed');
            setAlert({ message: errorMessage, severity: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={dialogTitleStyles}>
                {t('addAppointment')}
                <IconButton aria-label="close" onClick={onClose} sx={iconButtonStyles}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {alert.message && (
                <Alert
                    ref={alertRef}
                    severity={alert.severity}
                    onClose={() => setAlert({ message: '', severity: '' })}
                    sx={alertStyles}
                >
                    {alert.message}
                </Alert>
            )}
            <DialogContent dividers sx={dialogContentStyles}>
                <AppointmentForm
                    newAppointment={newAppointment}
                    setNewAppointment={setNewAppointment}
                    customerSearch={customerSearch}
                    setCustomerSearch={setCustomerSearch}
                    alert={alert}
                    setAlert={setAlert}
                    businessId={businessId}
                />
            </DialogContent>
            <AppointmentActions
                newAppointment={newAppointment}
                handleAddAppointment={handleAddAppointment}
                onClose={onClose}
            />
        </Dialog>
    );
};

export default AddAppointmentDialog;