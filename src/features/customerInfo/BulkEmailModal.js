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
  // Filter customers who have opted in for promotions and have an email
  const customersWithEmailAndPromotion = customers.filter((customer) => customer.email && customer.wantsPromotion);
  const [selectedCustomers, setSelectedCustomers] = useState(customersWithEmailAndPromotion);
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
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customersWithEmailAndPromotion);
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
    onClose();
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
              indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < customersWithEmailAndPromotion.length}
            />
          }
          label="Select All"
        />
        {customersWithEmailAndPromotion.map((customer) => (
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