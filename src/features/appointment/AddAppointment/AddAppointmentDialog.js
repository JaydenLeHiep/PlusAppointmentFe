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
import { useAppointmentsContext } from '../../appointment/AppointmentsContext';
import { useTranslation } from 'react-i18next';

const AddAppointmentDialog = ({ open, onClose, businessId }) => {
    const { t } = useTranslation('addAppointmentDialog'); // Use the 'addAppointmentDialog' namespace for translations
    const initialAppointmentState = useRef({
        appointmentTime: '',
        status: 'Pending',
        customerId: '',
        businessId,
        comment: '',
        services: [{ serviceId: '', staffId: '', duration: '', price: '' }]  // Staff moved under each service
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

    const handleAddAppointment = async () => {
        try {
            const appointmentDetails = {
                customerId: parseInt(newAppointment.customerId, 10),
                businessId: newAppointment.businessId,
                appointmentTime: newAppointment.appointmentTime,
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
            <DialogTitle
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1.75rem',
                    color: '#333',
                    textAlign: 'center',
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textTransform: 'capitalize',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    marginLeft: '3px'
                }}
            >
                {t('addAppointment')}
                <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {alert.message && (
                <Alert
                    ref={alertRef}
                    severity={alert.severity}
                    onClose={() => setAlert({ message: '', severity: '' })}
                    sx={{ marginTop: '16px' }}
                >
                    {alert.message}
                </Alert>
            )}
            <DialogContent dividers sx={{ padding: '24px', backgroundColor: '#f4f6f8' }}>
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
