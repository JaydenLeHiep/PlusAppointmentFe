import React, { useState } from 'react';
import {
    OverviewContainer,
    OverviewItem,
    StyledListItemText,
} from '../../../styles/CustomerStyle/AppointmentOverViewPageStyle';
import { Box, Typography, List, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

const AppointmentOverview = ({ appointments, onDeleteAppointment }) => {
    const { t } = useTranslation('appointmentOverview');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const formatDate = (appointmentTime) => {
        const d = new Date(appointmentTime);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const formatTime = (appointmentTime) => {
        const t = new Date(appointmentTime);
        return t.toTimeString().substring(0, 5);
    };
    
    const handleDeleteClick = (appointment) => {
        setSelectedAppointment(appointment);
        setConfirmationOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAppointment) {
            onDeleteAppointment(selectedAppointment.appointmentId, selectedAppointment.businessId);
        }
        setConfirmationOpen(false);
        setSelectedAppointment(null);
    };

    const handleCancelDelete = () => {
        setConfirmationOpen(false);
        setSelectedAppointment(null);
    };

    return (
        <OverviewContainer>
            <Typography variant="h5" sx={{ fontSize: '35px', marginBottom: 1, fontWeight: 'bold', color: 'Black', textAlign: 'center' }}>
                {t('Welcome back')} {appointments[0].customerName} !
            </Typography>
            <Typography variant="h5" sx={{ fontSize: '25px', marginBottom: 3, fontWeight: 'bold', color: 'Black', textAlign: 'center' }}>
                {t('Your Appointments:')}
            </Typography>
            {appointments.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'grey' }}>
                    {t('noAppointmentsLabel', 'You don\'t have any appointment')}
                </Typography>
            ) : (
                appointments.map((appointment, index) => {
                    const appointmentTotalPrice = (Array.isArray(appointment.services.$values) ? appointment.services.$values : []).reduce(
                        (total, service) => total + (service.price || 0),
                        0
                    );

                    return (
                        <OverviewItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{t('customerNameLabel')}: {appointment.customerName}</Typography>
                                <Typography variant="body2">
                                    {t('dateLabel')}: {formatDate(appointment.appointmentTime)} | {t('timeLabel')}: {formatTime(appointment.appointmentTime)}
                                </Typography>
                                <List dense>
                                    {(Array.isArray(appointment.services.$values) ? appointment.services.$values : []).map((service, idx) => (
                                        <StyledListItemText
                                            key={idx}
                                            primary={`${t('serviceLabel')}: ${service.name}`}
                                            secondary={`${t('durationLabel')}: ${service.duration || 'N/A'} | ${t('priceLabel')}: €${service.price || 'N/A'} | ${t('staffLabel')}: ${service.staffName}`}
                                        />
                                    ))}
                                </List>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                                    {t('appointmentTotalLabel')}: €{appointmentTotalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            <IconButton aria-label="delete" onClick={() => handleDeleteClick(appointment)}>
                                <Delete />
                            </IconButton>
                        </OverviewItem>
                    );
                })
            )}

            <ConfirmationDialog
                open={confirmationOpen}
                title={t('deleteAppointmentTitle', 'Delete Appointment')}
                content={t('deleteAppointmentContent', 'Are you sure you want to delete this appointment?')}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </OverviewContainer>
    );
};

export default AppointmentOverview;