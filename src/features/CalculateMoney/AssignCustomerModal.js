import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogTitleStyled,
  CloseIconButtonStyled,
  StyledTextField 
} from '../../styles/CalculateMoney/AssignmentCustomerModalStyles';
import { useWorkSessionsContext } from '../../context/WorkSessionsContext';

const AssignCustomerModal = ({ open, onClose, staff, businessId }) => {
  const [form, setForm] = useState({
    customerName: '',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { createWorkSessionAndUpdateList, fetchWorkSessionsByBusinessData } = useWorkSessionsContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const sessionData = {
      businessId: businessId,
      customerName: form.customerName,
      staffId: staff.staffId,
      note: form.note || "Create Session with 0 Services"
    };
    try {
      await createWorkSessionAndUpdateList(sessionData);
      await fetchWorkSessionsByBusinessData(businessId);
      setForm({ customerName: '', note: '' });
      onClose();
    } catch (err) {
      // Optionally show error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitleStyled>
        Add New Customer for {staff?.name}
        <CloseIconButtonStyled aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseIconButtonStyled>
      </DialogTitleStyled>
      <DialogContent dividers>
        <StyledTextField
          autoFocus
          margin="dense"
          name="customerName"
          label="Name"
          type="text"
          fullWidth
          value={form.customerName}
          onChange={handleChange}
        />
        <StyledTextField
          margin="dense"
          name="note"
          label="Note"
          type="text"
          fullWidth
          value={form.note}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={submitting || !form.customerName}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignCustomerModal;