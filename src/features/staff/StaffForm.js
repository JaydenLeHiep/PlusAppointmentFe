import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const StaffForm = ({ title, newStaff, setNewStaff, handleCancelForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        name="name"
        value={newStaff.name}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        name="email"
        value={newStaff.email}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Phone"
        type="text"
        fullWidth
        name="phone"
        value={newStaff.phone}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        name="password"
        value={newStaff.password}
        onChange={handleChange}
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={handleCancelForm} color="primary">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default StaffForm;