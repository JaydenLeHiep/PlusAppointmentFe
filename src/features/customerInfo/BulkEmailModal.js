import React, { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { fetchEmailContents } from '../../lib/apiClientEmailContent';

const BulkEmailModal = ({ open, onClose, customers, onSendEmail, businessName }) => {
  const { t } = useTranslation('bulkEmailModal');

  // Filter customers who have opted in for promotions and have an email
  const customersWithEmailAndPromotion = customers.filter((customer) => customer.email && customer.wantsPromotion);
  const [selectedCustomers, setSelectedCustomers] = useState(customersWithEmailAndPromotion);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([]); // State for email templates

  // Fetch email templates on component mount
  useEffect(() => {
    const loadEmailContents = async () => {
      try {
        const templates = await fetchEmailContents();
        setEmailTemplates(templates);
      } catch (error) {
        console.error('Failed to load email templates', error);
      }
    };

    loadEmailContents();
  }, []);

  // Function to replace the placeholder with the actual business name
  const insertBusinessName = (templateBody) => {
    return templateBody.replace('{{businessName}}', businessName);
  };

  // Handle subject selection
  const handleSubjectChange = (e) => {
    const selectedTemplate = emailTemplates.find(template => template.subject === e.target.value);
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      setBody(insertBusinessName(selectedTemplate.body)); // Replace placeholder
    } else {
      setSubject(e.target.value);
      setBody(''); // Clear the body if no template is selected
    }
  };

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
        {t('sendBulkEmail')}
        <IconButton
          aria-label={t('close')}
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
            select
            label={t('subject')}
            fullWidth
            margin="dense"
            value={subject}
            onChange={handleSubjectChange}
            helperText={t('selectOrWriteSubject')}
          >
            <MenuItem value="">
              {t('customSubject')}
            </MenuItem>
            {emailTemplates.map((template) => (
              <MenuItem key={template.emailContentId} value={template.subject}>
                {template.subject}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label={t('body')}
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          {t('selectCustomers')}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAllToggle}
              indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < customersWithEmailAndPromotion.length}
            />
          }
          label={t('selectAll')}
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
          {t('cancel')}
        </Button>
        <Button onClick={handleSend} color="primary" variant="contained">
          {t('sendEmail')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkEmailModal;
