import React, { useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import usePasswordValidation from '../../hooks/usePasswordValidation';

const StaffForm = ({ title, newStaff, setNewStaff, handleAction, handleCancelForm, buttonText, buttonColor }) => {
    const passwordValid = usePasswordValidation(newStaff.password);
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
                label="Name"
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
                label="Email"
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
                label="Phone"
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
                label="Password"
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
            {!passwordValid && (
                <Typography color="error" sx={{ mt: 1 }}>
                    Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
                </Typography>
            )}
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
                    Cancel
                </Button>
                <Button
                    onClick={() => passwordValid && handleAction()}
                    disabled={!passwordValid}
                    sx={{
                        width: '150px',
                        height: '40px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        backgroundColor: buttonColor,
                        color: '#fff',
                        '&:hover': { backgroundColor: buttonColor === '#007bff' ? '#0056b3' : '#218838' },
                        '&.Mui-disabled': { backgroundColor: '#ccc' },
                    }}
                >
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default StaffForm;