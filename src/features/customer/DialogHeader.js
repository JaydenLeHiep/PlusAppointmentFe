import React from 'react';
import { DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const DialogHeader = ({ title, onClose }) => {
  return (
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
      {title}
      <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default DialogHeader;