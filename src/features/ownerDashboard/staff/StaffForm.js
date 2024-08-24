import React, { useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const StaffForm = ({ title, newStaff, setNewStaff, handleAction, handleCancelForm, buttonText, buttonColor }) => {
    const { t } = useTranslation('staffForm'); // Use the 'staffForm' namespace
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <Box
            ref={formRef}
            mt={2}
            p={2}
            mb={3}
            sx={{
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                transition: 'all 0.3s ease-in-out',
            }}
        >
            <IconButton
                onClick={handleCancelForm}
                sx={{ position: 'absolute', top: '8px', right: '8px', color: '#6c757d' }}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {title}
            </Typography>
            <TextField
                margin="dense"
                label={t('name')} // Translate label
                type="text"
                fullWidth
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <TextField
                margin="dense"
                label={t('email')} // Translate label
                type="email"
                fullWidth
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <TextField
                margin="dense"
                label={t('phone')} // Translate label
                type="text"
                fullWidth
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <TextField
                margin="dense"
                label={t('password')} // Translate label
                type="password"
                fullWidth
                value={newStaff.password}
                onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                    onClick={handleCancelForm}
                    sx={{
                        width: '120px',
                        height: '40px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#5a6268' },
                    }}
                >
                    {t('cancel')} {/* Translate button text */}
                </Button>
                <Button
                    onClick={handleAction}
                    sx={{
                        width: '150px',
                        height: '40px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        backgroundColor: buttonColor,
                        color: '#fff',
                        '&:hover': { backgroundColor: buttonColor === '#007bff' ? '#0056b3' : '#218838' },
                    }}
                >
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default StaffForm;