import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BulkEmailModal = ({ open, onClose, customers, onSendEmail }) => {
  // Only consider customers with an email address for the initial state and rendering
  const customersWithEmail = customers.filter((customer) => customer.email);
  const [selectedCustomers, setSelectedCustomers] = useState(customersWithEmail.filter(customer => customer.wantsPromotion));
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  // Toggle individual customer selection
  const handleCustomerToggle = (customer) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customer)
        ? prevSelected.filter((c) => c !== customer)
        : [...prevSelected, customer]
    );
  };

  // Handle "Select All" toggle
  const handleSelectAllToggle = () => {
    if (selectAll) {
      // Unselect all
      setSelectedCustomers([]);
    } else {
      // Select all customers with email addresses
      setSelectedCustomers(customersWithEmail);
    }
    setSelectAll(!selectAll);
  };

  const handleSend = () => {
    const emailData = {
      toEmails: selectedCustomers.map((customer) => customer.email),
      subject,
      body,
    };
    onSendEmail(emailData);
    onClose(); // Keep automatic closing after sending
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Send Bulk Email
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            label="Subject"
            fullWidth
            margin="dense"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            label="Body"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Select customers to send the email to:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAllToggle}
              indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < customersWithEmail.length}
            />
          }
          label="Select All"
        />
        {customersWithEmail.map((customer) => (
          <FormControlLabel
            key={customer.customerId}
            control={
              <Checkbox
                checked={selectedCustomers.includes(customer)}
                onChange={() => handleCustomerToggle(customer)}
              />
            }
            label={`${customer.name} (${customer.email})`}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary" variant="contained">
          Send Email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkEmailModal;
