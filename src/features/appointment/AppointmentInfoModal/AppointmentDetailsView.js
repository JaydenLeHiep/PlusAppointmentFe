import React from 'react';
import { Typography, Divider, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AppointmentDetailsView = ({ appointment, formatAppointmentTime, handleToggleEditMode, handleDeleteAppointment }) => {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box
                sx={{
                    flexGrow: 1,
                    padding: '16px',
                    backgroundColor: '#e6f2ff',
                    borderRadius: '12px',
                    position: 'relative',
                    marginBottom: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#007bff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '8px',
                    }}
                >
                    Client: {appointment.customerName}
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: '#007bff', marginBottom: '16px' }} />
                <Typography
                    variant="body1"
                    sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        marginBottom: '12px',
                    }}
                >
                    <strong>Phone:</strong> {appointment.customerPhone}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        marginBottom: '12px',
                    }}
                >
                    <strong>Time:</strong> {formatAppointmentTime(appointment.appointmentTime, appointment.duration)}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        marginBottom: '12px',
                    }}
                >
                    <strong>Comment:</strong> {appointment.comment}
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        gap: '8px',
                    }}
                >
                    <IconButton aria-label="edit" onClick={handleToggleEditMode} sx={{ color: '#1976d2', '&:hover': { color: '#115293' } }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDeleteAppointment} sx={{ color: '#d32f2f', '&:hover': { color: '#9a0007' } }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box
                sx={{
                    padding: '16px',
                    backgroundColor: '#f0fff0',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#1a1a1a',
                        marginBottom: '12px',
                        fontSize: '1.2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                    }}
                >
                    Services & Staff
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: '#28a745', marginBottom: '16px' }} />
                {appointment.services.$values.map((service, index) => (
                    <Typography
                        key={index}
                        variant="body2"
                        gutterBottom
                        sx={{
                            color: '#555',
                            fontSize: '1.05rem',
                            marginLeft: '16px',
                            marginBottom: '6px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <strong style={{ marginRight: '6px', color: '#333' }}>{index + 1}.</strong>
                        {service.name} - <strong style={{ marginLeft: '6px', color: '#007bff' }}>{service.staffName}</strong>
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default AppointmentDetailsView;
