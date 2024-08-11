import React, { useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ServiceForm = ({ title, newService, setNewService, handleAction, handleCancelForm, buttonText, buttonColor }) => {
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
        transition: 'all 0.3s ease-in-out', // Smooth transition
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
        value={newService.name}
        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      <TextField
        margin="dense"
        label="Description"
        type="text"
        fullWidth
        value={newService.description}
        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      <TextField
        margin="dense"
        label="Duration"
        type="time"
        fullWidth
        value={newService.duration}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5 min steps
        onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
            },
          },
        }}
      />
      <TextField
        margin="dense"
        label="Price"
        type="number"
        fullWidth
        value={newService.price}
        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Removing the default border
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
          Cancel
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

export default ServiceForm;