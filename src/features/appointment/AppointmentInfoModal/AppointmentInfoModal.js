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
import { useStaffsContext } from '../../staff/StaffsContext';
import { useServicesContext } from '../../servicecomponent/ServicesContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import AppointmentDetailsView from './AppointmentDetailsView';
import AppointmentEditView from './AppointmentEditView';

const AppointmentInfoModal = ({ open, appointmentId, onClose }) => {
    const { appointments, changeStatusAppointments, deleteAppointmentAndUpdateList, updateAppointmentAndRefresh, customers, fetchAllCustomers } = useAppointmentsContext();
    const { staff, fetchAllStaff } = useStaffsContext();
    const { services, fetchServices } = useServicesContext();

    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [editMode, setEditMode] = useState(false);
    const [appointment, setAppointment] = useState(null);
    const [updatedAppointment, setUpdatedAppointment] = useState({
        customerId: '',
        staffId: '',
        appointmentTime: '',
        status: '',
        comment: '',
        services: [{ serviceId: '', duration: '', price: '', name: '' }]
    });
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const alertRef = useRef(null);
    const servicesEndRef = useRef(null);
    const alertTimeoutRef = useRef(null);
    const hasAddedService = useRef(false);

    useEffect(() => {
        if (appointmentId) {
            const selectedAppointment = appointments.find(appt => appt.appointmentId === appointmentId);
            if (selectedAppointment) {
                setAppointment(selectedAppointment);

                const updatedServices = (selectedAppointment.services?.$values || []).map(serviceDetails => {
                    const service = services.find(s => s.serviceId === serviceDetails.serviceId);
                    return {
                        serviceId: service?.serviceId || '',
                        duration: serviceDetails.duration || service?.duration || '',
                        price: service?.price || '',
                        name: service?.name || ''
                    };
                });

                setUpdatedAppointment({
                    customerId: selectedAppointment.customerId || '',
                    staffId: selectedAppointment.staffId || '',
                    appointmentTime: selectedAppointment.appointmentTime
                        ? new Date(selectedAppointment.appointmentTime).toISOString().slice(0, 16)
                        : '',
                    status: selectedAppointment.status || '',
                    comment: selectedAppointment.comment || '',
                    services: updatedServices.length ? updatedServices : [{ serviceId: '', duration: '', price: '', name: '' }]
                });
            }
        }
    }, [appointmentId, appointments, services]);

    useEffect(() => {
        if (open && appointment) {
            if (!services.length) fetchServices(appointment.businessId);
            if (!customers.length) fetchAllCustomers(appointment.businessId);
            if (!staff.length) fetchAllStaff(appointment.businessId);
        }
    }, [open, services.length, customers.length, staff.length, fetchServices, fetchAllCustomers, fetchAllStaff, appointment]);

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
            hasAddedService.current = false; // Reset the flag after scrolling
        }
    }, [updatedAppointment.services, editMode]);

    if (!appointment) return null;

    const handleConfirmStatus = async () => {
        try {
            const updatedStatus = 'Confirm';
            await changeStatusAppointments(appointment.appointmentId, updatedStatus, appointment.businessId);
            setAlert({ message: 'Appointment confirmed successfully!', severity: 'success' });
        } catch (error) {
            console.error('Failed to change appointment status:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to confirm appointment. Please try again.';
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
            setAlert({ message: 'Appointment deleted successfully!', severity: 'success' });
        } catch (error) {
            console.error('Failed to delete appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete appointment. Please try again.';
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
        let formattedValue = value;

        if (field === 'serviceId') {
            const selectedService = services.find(service => service.serviceId === value);
            const serviceDuration = selectedService?.duration || '00:00:00'; // Default to '00:00:00' if not found

            const updatedServices = updatedAppointment.services.map((service, i) =>
                i === index
                    ? {
                        ...service,
                        [field]: formattedValue,
                        duration: serviceDuration // Auto-fill the duration from context
                    }
                    : service
            );
            setUpdatedAppointment({ ...updatedAppointment, services: updatedServices });
        } else if (field === 'duration') {
            // Ensure the duration is formatted as "HH:mm:ss"
            const [hours, minutes] = value.split(':');
            formattedValue = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;

            const updatedServices = updatedAppointment.services.map((service, i) =>
                i === index
                    ? {
                        ...service,
                        [field]: formattedValue
                    }
                    : service
            );
            setUpdatedAppointment({ ...updatedAppointment, services: updatedServices });
        } else {
            const updatedServices = updatedAppointment.services.map((service, i) =>
                i === index
                    ? {
                        ...service,
                        [field]: formattedValue
                    }
                    : service
            );
            setUpdatedAppointment({ ...updatedAppointment, services: updatedServices });
        }
    };

    const handleAddService = () => {
        setUpdatedAppointment({
            ...updatedAppointment,
            services: [...updatedAppointment.services, { serviceId: '', duration: '', price: '', name: '' }]
        });

        hasAddedService.current = true; // Set the flag to true when a new service is added
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
                services: updatedAppointment.services.map((service, index) => {
                    const serviceData = { serviceId: service.serviceId };
                    if (service.duration) {
                        serviceData.updatedDuration = service.duration;
                    }
                    return serviceData;
                }),
                appointmentTime: updatedAppointment.appointmentTime,
                comment: updatedAppointment.comment,
            };
            await updateAppointmentAndRefresh(appointment.appointmentId, updateData, appointment.businessId);
            setAlert({ message: 'Appointment updated successfully!', severity: 'success' });
        } catch (error) {
            console.error('Failed to update appointment:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment. Please try again.';
            setAlert({ message: errorMessage, severity: 'error' });

            setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 5000);
        }
    };

    const formatAppointmentTime = (appointmentTime, duration) => {
        if (!appointmentTime || !duration) {
            return 'Invalid Date';
        }

        const startTime = new Date(appointmentTime);
        if (isNaN(startTime.getTime())) {
            return 'Invalid Date';
        }

        const [hours, minutes, seconds] = duration.split(':').map(Number);
        const durationInMinutes = hours * 60 + minutes + (seconds || 0) / 60;

        const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

        const formatTime = (date) => {
            if (date && !isNaN(date.getTime())) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                return 'Invalid Time';
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
                Appointment Details
                <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ color: '#808080', fontSize: '1.5rem' }}>
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
                                customers={customers}
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
                        Cancel
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
                        Update
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
                        Confirm
                    </Button>
                </DialogActions>
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={showConfirmDialog}
                title="Delete Appointment"
                content="Are you sure you want to delete this appointment?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Dialog>
    );
};

export default AppointmentInfoModal;