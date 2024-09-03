import React, { useEffect, useState, useRef } from 'react';
import {
    Dialog,
    Alert,
    Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppointmentsContext } from '../../../../context/AppointmentsContext';
import ConfirmationDialog from '../../../../components/ConfirmationDialog';
import AppointmentDetailsView from './AppointmentDetailsView';
import AppointmentEditView from './AppointmentEditView';
import { useTranslation } from 'react-i18next';
import {
    StyledDialogTitle,
    StyledCloseIconButton,
    StyledDialogContent,
    StyledDialogActions,
    StyledCancelButton,
    StyledUpdateButton,
    StyledConfirmButton,
} from '../../../../styles/OwnerStyle/AppointmentInfoModal/AppointmentInfoModalStyles';

const AppointmentInfoModal = ({ open, appointment, onClose, staff, services, afterUpdate }) => {
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
            const utcDate = new Date(appointment.appointmentTime);
            const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
            const localAppointmentTime = localDate.toISOString().slice(0, 16);

            setUpdatedAppointment({
                customerId: appointment.customerId || '',
                customerName: appointment.customerName || '',
                customerPhone: appointment.customerPhone,
                appointmentTime: localAppointmentTime,
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
            afterUpdate(); // Trigger re-fetching of the appointment details
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
            const formattedDuration = value.length === 5 ? `${value}:00` : value;
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
            const localAppointmentTime = new Date(updatedAppointment.appointmentTime);
            const utcAppointmentTime = localAppointmentTime.toISOString();
    
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
                appointmentTime: utcAppointmentTime,
                comment: updatedAppointment.comment || ""
            };
    
            await updateAppointmentAndRefresh(appointment.appointmentId, updateData, appointment.businessId);
    
            // Trigger re-fetching of the appointment data after update
            afterUpdate();
    
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
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        const durationInMinutes = hours * 60 + minutes + (seconds || 0) / 60;
        const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);
    
        const formatTime = (date) => {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };
    
        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };
    
    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <StyledDialogTitle>
                {t('appointmentDetails')}
                <StyledCloseIconButton aria-label={t('close')} onClick={handleCloseDialog}>
                    <CloseIcon />
                </StyledCloseIconButton>
            </StyledDialogTitle>
            {alert.message && (
                <Alert
                    ref={alertRef}
                    severity={alert.severity}
                    onClose={() => setAlert({ message: '', severity: '' })}
                >
                    {alert.message}
                </Alert>
            )}
            <StyledDialogContent dividers>
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
            </StyledDialogContent>
            {editMode && (
                <StyledDialogActions>
                    <StyledCancelButton onClick={handleToggleEditMode}>
                        {t('cancel')}
                    </StyledCancelButton>
                    <StyledUpdateButton onClick={handleUpdateAppointment}>
                        {t('update')}
                    </StyledUpdateButton>
                </StyledDialogActions>
            )}
            {!editMode && (
                <StyledDialogActions sx={{ justifyContent: 'flex-end' }}>
                    <StyledConfirmButton onClick={handleConfirmStatus}>
                        {t('confirm')}
                    </StyledConfirmButton>
                </StyledDialogActions>
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