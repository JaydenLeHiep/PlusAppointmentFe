import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ConfirmationDialog = ({ open, title, content, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-content"
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}
      >
        {title || 'Confirm'}
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', fontSize: '1.1rem', color: '#555' }}
        >
          {content || 'Are you sure you want to proceed?'}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '16px',
          gap: 2,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          color="secondary"
          sx={{
            textTransform: 'none',
            padding: '8px 24px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            borderColor: '#f44336',
            color: '#f44336',
            flexGrow: 1,
            maxWidth: '100px',
            '&:hover': {
              backgroundColor: '#ffe6e6',
              borderColor: '#f44336',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            padding: '8px 24px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            backgroundColor: '#4caf50',
            flexGrow: 1,
            maxWidth: '100px',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;