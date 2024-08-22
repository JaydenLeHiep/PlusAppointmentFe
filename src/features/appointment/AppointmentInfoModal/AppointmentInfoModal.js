import React, { useEffect, useState, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Alert,
    Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../../appointment/AppointmentsContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import AppointmentDetailsView from './AppointmentDetailsView';
import AppointmentEditView from './AppointmentEditView';
import { useTranslation } from 'react-i18next';

const AppointmentInfoModal = ({ open, appointment, onClose, staff, services }) => {
    const { t } = useTranslation('appointmentInfoModal');
    const { changeStatusAppointments, deleteAppointmentAndUpdateList, updateAppointmentAndRefresh } = useAppointmentsContext();

    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [editMode, setEditMode] = useState(false);
    const [updatedAppointment, setUpdatedAppointment] = useState({
        customerId: '',
        customerName: '',
        appointmentTime: '',
        status: '',
        comment: '',
        services: [],
    });
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const alertRef = useRef(null);
    const servicesEndRef = useRef(null);
    const alertTimeoutRef = useRef(null);
    const hasAddedService = useRef(false);

    // Update state when a new appointment is passed as a prop
    useEffect(() => {
        if (appointment) {
            setUpdatedAppointment({
                customerId: appointment.customerId || '',
                customerName: appointment.customerName || '',
                customerPhone: appointment.customerPhone,
                appointmentTime: appointment.appointmentTime?.replace('Z', '') || '',
                status: appointment.status || '',
                comment: appointment.comment || '',
                services: (appointment.services?.$values || []).map(serviceDetails => ({
                    serviceId: serviceDetails.serviceId,
                    staffId: serviceDetails.staffId,
                    duration: serviceDetails.duration,
                    price: serviceDetails.price,
                    name: serviceDetails.name
                })),
            });
        }
    }, [appointment]);

    useEffect(() => {
        if (alert.message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (alert.message) {
            alertTimeoutRef.current = setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 5000);
        }

        return () => {
            if (alertTimeoutRef.current) {
                clearTimeout(alertTimeoutRef.current);
            }
        };
    }, [alert.message]);

    useEffect(() => {
        if (editMode && hasAddedService.current && servicesEndRef.current) {
            servicesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            hasAddedService.current = false;
        }
    }, [updatedAppointment.services, editMode]);

    if (!appointment) return null;

    const handleConfirmStatus = async () => {
        try {
            const updatedStatus = 'Confirm';
            await changeStatusAppointments(appointment.appointmentId, updatedStatus, appointment.businessId);
            setAlert({ message: t('confirmStatusSuccess'), severity: 'success' });
        } catch (error) {
            console.error('Failed to change appointment status:', error);
            const errorMessage = error.response?.data?.message || error.message || t('confirmStatusError');
            setAlert({ message: errorMessage, severity: 'error' });
        }
    };

    const handleDeleteAppointment = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAppointmentAndUpdateList(appointment.appointmentId, appointment.businessId);
            setShowConfirmDialog(false);
            onClose();
            setAlert({ message: t('deleteSuccess'), severity: 'success' });
        } catch (error) {
            console.error('Failed to delete appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || t('deleteError');
            setAlert({ message: errorMessage, severity: 'error' });
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(false);
    };

    const handleCloseDialog = () => {
        onClose();
        setAlert({ message: '', severity: '' });
        setEditMode(false);
    };

    const handleToggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setUpdatedAppointment({ ...updatedAppointment, [field]: value });
    };

    const handleServiceChange = (index, field, value) => {
        let updatedService = { ...updatedAppointment.services[index], [field]: value };

        if (field === 'serviceId') {
            const selectedService = services.find(service => service.serviceId === value);
            if (selectedService) {
                updatedService.duration = selectedService.duration;
                updatedService.price = selectedService.price;
            } else {
                updatedService.duration = '';
                updatedService.price = '';
            }
        } else if (field === 'duration') {
            const formattedDuration = value.length === 5 ? `${value}:00` : value; // HH:MM -> HH:MM:SS
            updatedService.duration = formattedDuration;
        }

        const updatedServices = updatedAppointment.services.map((service, i) =>
            i === index ? updatedService : service
        );

        setUpdatedAppointment({ ...updatedAppointment, services: updatedServices });
    };

    const handleAddService = () => {
        setUpdatedAppointment({
            ...updatedAppointment,
            services: [...updatedAppointment.services, { serviceId: '', staffId: '', duration: '', price: '' }]
        });

        hasAddedService.current = true;
    };

    const handleRemoveService = (index) => {
        setUpdatedAppointment({
            ...updatedAppointment,
            services: updatedAppointment.services.filter((_, i) => i !== index)
        });
    };

    const handleUpdateAppointment = async () => {
        try {
            const updateData = {
                businessId: appointment.businessId,
                services: updatedAppointment.services
                    .filter(service => service.serviceId && service.staffId)
                    .map(service => ({
                        serviceId: parseInt(service.serviceId),
                        staffId: parseInt(service.staffId),
                        duration: service.duration || null,
                        price: service.price || null,
                    })),
                appointmentTime: updatedAppointment.appointmentTime,  // Send raw string
                comment: updatedAppointment.comment || ""
            };

            await updateAppointmentAndRefresh(appointment.appointmentId, updateData, appointment.businessId);
            setAlert({ message: t('updateSuccess'), severity: 'success' });
            setEditMode(false);
        } catch (error) {
            console.error('Failed to update appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || t('updateError');
            setAlert({ message: errorMessage, severity: 'error' });
        }
    };

    const formatAppointmentTime = (appointmentTime, duration) => {
        if (!appointmentTime || !duration) {
            return t('invalidDate');
        }

        const startTime = new Date(appointmentTime);
        if (isNaN(startTime.getTime())) {
            return t('invalidDate');
        }

        const [hours, minutes, seconds] = duration.split(':').map(Number);
        const durationInMinutes = hours * 60 + minutes + (seconds || 0) / 60;

        const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

        const formatTime = (date) => {
            if (date && !isNaN(date.getTime())) {
                return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
            } else {
                return t('invalidTime');
            }
        };

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
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
                    marginLeft: '7px'
                }}
            >
                {t('appointmentDetails')}
                <IconButton aria-label={t('close')} onClick={handleCloseDialog} sx={{ color: '#808080', fontSize: '1.5rem' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {alert.message && (
                <Alert
                    ref={alertRef}
                    severity={alert.severity}
                    onClose={() => setAlert({ message: '', severity: '' })}
                >
                    {alert.message}
                </Alert>
            )}
            <DialogContent
                dividers
                sx={{
                    padding: '24px',
                    backgroundColor: '#f4f6f8',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {!editMode ? (
                            <AppointmentDetailsView
                                appointment={appointment}
                                formatAppointmentTime={formatAppointmentTime}
                                handleToggleEditMode={handleToggleEditMode}
                                handleDeleteAppointment={handleDeleteAppointment}
                            />
                        ) : (
                            <AppointmentEditView
                                updatedAppointment={updatedAppointment}
                                staff={staff}
                                services={services}
                                handleInputChange={handleInputChange}
                                handleServiceChange={handleServiceChange}
                                handleAddService={handleAddService}
                                handleRemoveService={handleRemoveService}
                                editMode={editMode}
                            />
                        )}
                    </Grid>
                </Grid>
                <div ref={servicesEndRef}></div>
            </DialogContent>
            {editMode && (
                <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleToggleEditMode}
                        sx={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            width: '120px',
                            height: '40px',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            '&:hover': {
                                backgroundColor: '#9a0007',
                            },
                        }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateAppointment}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            width: '120px',
                            height: '40px',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            '&:hover': {
                                backgroundColor: '#115293',
                            },
                        }}
                    >
                        {t('update')}
                    </Button>
                </DialogActions>
            )}
            {!editMode && (
                <DialogActions sx={{ justifyContent: 'flex-end', padding: '16px 24px' }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleConfirmStatus}
                        sx={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            width: '120px',
                            height: '40px',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            '&:hover': {
                                backgroundColor: '#218838',
                            },
                        }}
                    >
                        {t('confirm')}
                    </Button>
                </DialogActions>
            )}

            <ConfirmationDialog
                open={showConfirmDialog}
                title={t('deleteAppointmentTitle')}
                content={t('deleteAppointmentContent')}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Dialog>
    );
};

export default AppointmentInfoModal;